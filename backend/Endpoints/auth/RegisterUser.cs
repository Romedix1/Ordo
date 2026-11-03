using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Ordo.Api.Endpoints;

public static class RegisterUser
{
    public record Request(string Name, string Email, string Password);
    public record Response(Guid Id, string Email);

    public static IEndpointRouteBuilder MapRegisterUser(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/register", Register).WithTags("Auth");

        return app;
    }

    private static async Task<IResult> Register(Request request, UserManager<User> userManager)
    {
        var errors = new Dictionary<string, string[]>();

        if (string.IsNullOrWhiteSpace(request.Name) || request.Name.Length < 2)
        {
            errors["name"] = ["Name is too short"];
        }

        foreach (var validator in userManager.PasswordValidators)
        {
            var passwordResult = await validator.ValidateAsync(userManager, null!, request.Password);

            if (!passwordResult.Succeeded)
            {
                errors["password"] = [.. passwordResult.Errors.Select((error) => error.Description)];
            }
        }

        if (string.IsNullOrWhiteSpace(request.Email) || !new EmailAddressAttribute().IsValid(request.Email))
        {
            errors["email"] = ["Invalid email"];
        }
        else if (await userManager.FindByEmailAsync(request.Email) is not null)
        {
            errors["email"] = ["Email is already taken"];
        }

        if (errors.Count > 0)
        {
            return Results.ValidationProblem(errors);
        }


        var user = new User
        {
            Name = request.Name,
            Email = request.Email,
            UserName = request.Email,
        };

        var result = await userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            return Results.BadRequest(result.Errors);
        }

        return Results.Created($"/users/{user.Id}", new Response(user.Id, user.Email));
    }
}