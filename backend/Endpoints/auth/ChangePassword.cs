
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Ordo.Api.Entities;

namespace Ordo.Api.Endpoints;

public static class ChangePassword
{
    public record Request(string UserId, string Token, string NewPassword);

    public static IEndpointRouteBuilder MapChangePassword(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/change-password", Change).WithTags("Auth").RequireRateLimiting("PasswordReset");

        return app;
    }

    private static async Task<IResult> Change(Request request, UserManager<User> users)
    {
        if (string.IsNullOrWhiteSpace(request.NewPassword))
        {
            return Results.ValidationProblem(new Dictionary<string, string[]>
            {
                ["password"] = ["Password is required."]
            });
        }

        var invalidLink = Results.ValidationProblem(new Dictionary<string, string[]>
        {
            ["token"] = ["This reset link is invalid or has expired."]
        });

        if (string.IsNullOrWhiteSpace(request.UserId) || string.IsNullOrWhiteSpace(request.Token))
        { return invalidLink; }


        var user = await users.FindByIdAsync(request.UserId);

        if (user is null)
        {
            return invalidLink;
        }

        string token;

        try
        {
            token = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(request.Token));
        }
        catch (FormatException)
        {
            return invalidLink;
        }

        var result = await users.ResetPasswordAsync(user, token, request.NewPassword);

        if (!result.Succeeded)
        {
            if (result.Errors.Any(errors => errors.Code == "InvalidToken"))
                return invalidLink;

            return Results.ValidationProblem(new Dictionary<string, string[]>
            {
                ["password"] = [.. result.Errors.Select(error => error.Description)]
            });
        }


        return Results.NoContent();
    }
}