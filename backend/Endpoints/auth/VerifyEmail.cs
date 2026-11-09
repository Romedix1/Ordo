using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;

namespace Ordo.Api.Endpoints;

public static class VerifyEmail
{
    public record Request(string Token, string UserId);
    public static IEndpointRouteBuilder MapVerifyEmail(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/verify-email", Verify).WithTags("Auth");

        return app;
    }

    private static async Task<IResult> Verify(Request request, UserManager<User> users)
    {
        if (string.IsNullOrWhiteSpace(request.UserId) || string.IsNullOrWhiteSpace(request.Token))
        {
            return Results.ValidationProblem(new Dictionary<string, string[]>
            {
                ["general"] = ["User ID and Token are required."]
            });
        }

        var user = await users.FindByIdAsync(request.UserId);

        if (user is null)
        {
            return Results.ValidationProblem(new Dictionary<string, string[]>
            {
                ["general"] = ["User ID and Token are required."]
            });
        }

        if (user.EmailConfirmed)
        {
            return Results.Ok(new { message = "Email is already confirmed." });
        }


        try
        {

            var decodedBytes = WebEncoders.Base64UrlDecode(request.Token);
            var decodedToken = Encoding.UTF8.GetString(decodedBytes);

            var result = await users.ConfirmEmailAsync(user, decodedToken);

            if (!result.Succeeded)
            {
                return Results.ValidationProblem(new Dictionary<string, string[]>
                {
                    ["token"] = ["Invalid or expired confirmation token."]
                });
            }

            return Results.Ok(new { message = "Email confirmed successfully." });
        }
        catch (FormatException)
        {
            return Results.ValidationProblem(new Dictionary<string, string[]>
            {
                ["token"] = ["Invalid token format."]
            });
        }
    }
}