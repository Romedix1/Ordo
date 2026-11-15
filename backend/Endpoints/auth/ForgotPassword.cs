using Microsoft.AspNetCore.Identity;
using Ordo.Api.Services;

namespace Ordo.Api.Endpoints;

public static class ForgotPassword
{
    public record Request(string Email);

    public static IEndpointRouteBuilder MapForgotPassword(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/forgot-password", Send).WithTags("Auth");

        return app;
    }

    private static async Task<IResult> Send(Request request, UserManager<User> users, EmailForgotPasswordService forgotPassword, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(request.Email))
        {
            return Results.ValidationProblem(new Dictionary<string, string[]>
            {
                ["email"] = ["Email is required"]
            });
        }

        var user = await users.FindByEmailAsync(request.Email);

        if (user is not null && user.EmailConfirmed)
        {
            await forgotPassword.Send(user, ct);
        }

        return Results.NoContent();
    }
}
