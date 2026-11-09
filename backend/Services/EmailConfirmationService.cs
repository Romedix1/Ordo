using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;

namespace Ordo.Api.Services;

public class EmailConfirmationService(UserManager<User> users, EmailService email, IConfiguration config)
{
    public async Task Send(User user, CancellationToken ct = default)
    {
        var token = await users.GenerateEmailConfirmationTokenAsync(user);
        var encodedToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

        var frontendUrl = config["Frontend:Url"] ?? "http://localhost:3000";
        var link = $"{frontendUrl}/verify-email?userId={user.Id}&token={encodedToken}";

        var html = EmailTemplates.ConfirmEmail(user.Name, link);
        await email.Send(user.Email!, "Confirm your Ordo account", html, ct);
    }
}