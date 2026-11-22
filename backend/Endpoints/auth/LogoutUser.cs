using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Ordo.Api.Data;
using Ordo.Api.Services;

namespace Ordo.Api.Endpoints;

public static class LogoutUser
{
    public static IEndpointRouteBuilder MapLogoutUser(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/logout", Logout).WithTags("Auth");

        return app;
    }

    private static async Task<IResult> Logout(
        HttpContext http,
        ClaimsPrincipal principal,
        AppDbContext db,
        CancellationToken ct
    )
    {
        var refreshValue = http.Request.Cookies[TokenService.RefreshCookieName];
        if (!string.IsNullOrWhiteSpace(refreshValue))
        {
            var hash = TokenService.HashToken(refreshValue);

            await db
                .RefreshTokens.Where(token => token.TokenHash == hash && token.RevokedAt == null)
                .ExecuteUpdateAsync(
                    set => set.SetProperty(token => token.RevokedAt, DateTime.UtcNow),
                    ct
                );
        }

        http.Response.Cookies.Delete(
            TokenService.RefreshCookieName,
            new CookieOptions { Path = "/auth" }
        );

        return Results.NoContent();
    }
}
