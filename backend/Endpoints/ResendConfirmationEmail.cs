using Microsoft.AspNetCore.Identity;
using Ordo.Api.Services;

namespace Ordo.Api.Endpoints;

public static class ResendConfirmationEmail
{
    public record Request(string UserId);
    public static IEndpointRouteBuilder MapResendConfirmationEmail(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/resend-confirmation", Send).WithTags("Auth").RequireRateLimiting("EmailResend");

        return app;
    }

    private static async Task<IResult> Send(Request request, UserManager<User> users, EmailConfirmationService confirmation, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(request.UserId))
        {
            return Results.ValidationProblem(new Dictionary<string, string[]>
            {
                ["userId"] = ["User ID is required"]
            });
        }

        var user = await users.FindByIdAsync(request.UserId);

        if (user is not null && !user.EmailConfirmed)
        {
            await confirmation.Send(user, ct);
        }
        else if (user is null)
        {
            return Results.ValidationProblem(new Dictionary<string, string[]>
            {
                ["userId"] = ["User not found"]
            });
        }

        return Results.NoContent();
    }
}