using Microsoft.AspNetCore.Identity;
using Ordo.Api.Services;
using Org.BouncyCastle.Asn1.Ocsp;

public static class LoginUser
{
    public record Request(string Email, string Password);
    public record Response(string AccessToken);
    public static IEndpointRouteBuilder MapLoginUser(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/login", Login).WithTags("Auth").RequireRateLimiting("Login");

        return app;
    }

    private static async Task<IResult> Login(Request request, UserManager<User> users, TokenService tokens, CancellationToken ct, HttpContext http)
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

        if (user is null || !await users.CheckPasswordAsync(user, request.Password))
        {
            return Results.ValidationProblem(new Dictionary<string, string[]>
            {
                ["Credentials"] = ["Invalid email or password"]
            });
        }

        if (!user.EmailConfirmed)
        {
            return Results.ValidationProblem(new Dictionary<string, string[]>
            {
                ["email"] = ["Please confirm your email address before logging in."]
            });
        }

        var accessToken = tokens.CreateAccessToken(user);
        var (refreshToken, expiresAt) = await tokens.CreateRefreshToken(user, ct);

        http.Response.Cookies.Append("refresh_token", refreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = expiresAt,
            Path = "/auth",
        });

        return Results.Ok(new Response(accessToken));
    }
}