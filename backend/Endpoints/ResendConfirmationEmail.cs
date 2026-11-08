using Microsoft.AspNetCore.Identity;
using Ordo.Api.Services;

namespace Ordo.Api.Endpoints;

public static class ResendConfirmationEmail
{
    public record Request(string? UserId, string? Email);
    public static IEndpointRouteBuilder MapResendConfirmationEmail(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/resend-confirmation", Send).WithTags("Auth").RequireRateLimiting("EmailResend");

        return app;
    }

    private static async Task<IResult> Send(Request request, UserManager<User> users, EmailConfirmationService confirmation, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(request.UserId) && string.IsNullOrWhiteSpace(request.Email))
        {
            return Results.ValidationProblem(new Dictionary<string, string[]>
            {
                ["identifier"] = ["Email or User ID is required"]
            });
        }

        User? user = null;

        if (!string.IsNullOrWhiteSpace(request.Email))
        {
            user = await users.FindByEmailAsync(request.Email);
        }
        else if (!string.IsNullOrWhiteSpace(request.UserId))
        {
            user = await users.FindByIdAsync(request.UserId);
        }

        if (user is not null && !user.EmailConfirmed)
        {
            await confirmation.Send(user, ct);
        }

        return Results.NoContent();
    }
}