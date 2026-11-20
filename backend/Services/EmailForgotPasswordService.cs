using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Ordo.Api.Entities;

namespace Ordo.Api.Services;

public class EmailForgotPasswordService(UserManager<User> users, EmailOutbox outbox, IConfiguration config)
{
    public async Task SendAsync(User user, CancellationToken ct = default)
    {
        var token = await users.GeneratePasswordResetTokenAsync(user);
        var encodedToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

        var frontendUrl = config["Frontend:Url"] ?? "http://localhost:3000";
        var link = $"{frontendUrl}/change-password?userId={user.Id}&token={encodedToken}";

        var html = EmailTemplates.ResetPassword(user.Name, link);
        await outbox.EnqueueAsync(user.Email!, "Reset your password", html, ct);
    }
}