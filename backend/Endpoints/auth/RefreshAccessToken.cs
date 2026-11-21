using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Ordo.Api.Data;
using Ordo.Api.Entities;
using Ordo.Api.Services;

namespace Ordo.Api.Endpoints;

public static class RefreshAccessToken
{
    public record Response(string AccessToken);

    public static IEndpointRouteBuilder MapRefreshAccessToken(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/refresh", Refresh).WithTags("auth");

        return app;
    }

    private static async Task<IResult> Refresh(
        HttpContext http,
        AppDbContext db,
        UserManager<User> users,
        TokenService tokens,
        CancellationToken ct
    )
    {
        var refreshValue = http.Request.Cookies[TokenService.RefreshCookieName];
        if (string.IsNullOrWhiteSpace(refreshValue))
        {
            return Results.Unauthorized();
        }

        var hash = TokenService.HashToken(refreshValue);
        var storedRefresh = await db.RefreshTokens.FirstOrDefaultAsync(
            token => token.TokenHash == hash,
            ct
        );

        if (storedRefresh is null)
        {
            http.Response.Cookies.Delete(
                TokenService.RefreshCookieName,
                new CookieOptions { Path = "/auth" }
            );

            return Results.Unauthorized();
        }

        if (storedRefresh.RevokedAt is not null)
        {
            await db
                .RefreshTokens.Where(token =>
                    token.UserId == storedRefresh.UserId && token.RevokedAt == null
                )
                .ExecuteUpdateAsync(
                    set => set.SetProperty(token => token.RevokedAt, DateTime.UtcNow),
                    ct
                );

            http.Response.Cookies.Delete(
                TokenService.RefreshCookieName,
                new CookieOptions { Path = "/auth" }
            );

            return Results.Unauthorized();
        }

        if (storedRefresh.ExpiresAt <= DateTime.UtcNow)
        {
            return Results.Unauthorized();
        }

        var user = await users.FindByIdAsync(storedRefresh.UserId.ToString());
        if (user is null)
        {
            return Results.Unauthorized();
        }

        storedRefresh.RevokedAt = DateTime.UtcNow;

        var (newRefresh, expiresAt) = await tokens.CreateRefreshToken(user, ct);

        TokenService.SetRefreshCookie(http.Response, newRefresh, expiresAt);

        return Results.Ok(new Response(tokens.CreateAccessToken(user)));
    }
}
