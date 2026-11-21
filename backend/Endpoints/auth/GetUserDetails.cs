using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Ordo.Api.Entities;

namespace Ordo.Api.Endpoints;

public static class GetUserData
{
    public static IEndpointRouteBuilder MapGetUserDetails(this IEndpointRouteBuilder app)
    {
        app.MapGet("/auth/me", Me).WithTags("auth").RequireAuthorization();

        return app;
    }

    private static async Task<IResult> Me(ClaimsPrincipal principal, UserManager<User> users)
    {
        var userId = principal.FindFirstValue(JwtRegisteredClaimNames.Sub);
        if (userId is null)
        {
            return Results.Unauthorized();
        }

        var user = await users.FindByIdAsync(userId);
        if (user is null)
        {
            return Results.Unauthorized();
        }

        return Results.Ok(
            new
            {
                user.Id,
                user.Name,
                user.Email,
                user.AvatarColor,
            }
        );
    }
}
