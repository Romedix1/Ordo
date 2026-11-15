using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;

namespace Ordo.Api.Services;

public class EmailForgotPasswordService(UserManager<User> users, EmailService email, IConfiguration config)
{
    public async Task Send(User user, CancellationToken ct = default)
    {
        var token = await users.GeneratePasswordResetTokenAsync(user);
        var encodedToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

        var frontendUrl = config["Frontend:Url"] ?? "http://localhost:3000";
        var link = $"{frontendUrl}/change-password?userId={user.Id}&token={encodedToken}";

        var html = EmailTemplates.ResetPassword(user.Name, link);
        await email.Send(user.Email!, "Reset your password", html, ct);
    }
}