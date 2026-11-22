using Microsoft.AspNetCore.Identity;
using Ordo.Api.Entities;
using Ordo.Api.Services;

namespace Ordo.Api.Endpoints;

public static class LoginUser
{
    private static readonly Lazy<string> DummyHash = new(() =>
        new PasswordHasher<User>().HashPassword(new User(), Guid.NewGuid().ToString())
    );

    public record Request(string Email, string Password);

    public record Response(string AccessToken);

    public static IEndpointRouteBuilder MapLoginUser(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/login", Login).WithTags("Auth").RequireRateLimiting("Login");

        return app;
    }

    private static async Task<IResult> Login(
        Request request,
        UserManager<User> users,
        TokenService tokens,
        CancellationToken ct,
        HttpContext http
    )
    {
        var errors = new Dictionary<string, string[]>();

        if (string.IsNullOrWhiteSpace(request.Email))
        {
            errors["email"] = ["Invalid email"];
        }

        if (string.IsNullOrWhiteSpace(request.Password))
        {
            errors["password"] = ["Password is required"];
        }

        if (errors.Count > 0)
        {
            return Results.ValidationProblem(errors);
        }

        var user = await users.FindByEmailAsync(request.Email);

        bool passwordValid;

        if (user is null)
        {
            users.PasswordHasher.VerifyHashedPassword(
                new User(),
                DummyHash.Value,
                request.Password
            );
            passwordValid = false;
        }
        else
        {
            passwordValid = await users.CheckPasswordAsync(user, request.Password);
        }

        if (user is null || !passwordValid)
        {
            return Results.ValidationProblem(
                new Dictionary<string, string[]> { ["credentials"] = ["Invalid email or password"] }
            );
        }

        if (!user.EmailConfirmed)
        {
            return Results.ValidationProblem(
                new Dictionary<string, string[]>
                {
                    ["email"] = ["Please confirm your email address before logging in."],
                }
            );
        }

        var accessToken = tokens.CreateAccessToken(user);
        var (refreshToken, expiresAt) = await tokens.CreateRefreshToken(user, ct);

        TokenService.SetRefreshCookie(http.Response, refreshToken, expiresAt);

        return Results.Ok(new Response(accessToken));
    }
}
