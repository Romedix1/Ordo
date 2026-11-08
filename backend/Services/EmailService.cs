using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace Ordo.Api.Services;

public class EmailService(IConfiguration config)
{
    public async Task Send(string to, string subject, string htmlBody, CancellationToken ct = default)
    {
        var message = new MimeMessage();
        message.From.Add(MailboxAddress.Parse(config["Email:From"]!));
        message.To.Add(MailboxAddress.Parse(to));
        message.Subject = subject;
        message.Body = new BodyBuilder { HtmlBody = htmlBody }.ToMessageBody();

        using var client = new SmtpClient();
        await client.ConnectAsync(config["Email:Host"]!, int.Parse(config["Email:Port"]!), SecureSocketOptions.Auto, ct);

        var user = config["Email:User"];
        if (!string.IsNullOrEmpty(user))
            await client.AuthenticateAsync(user, config["Email:Password"]!, ct);

        await client.SendAsync(message, ct);
        await client.DisconnectAsync(true, ct);
    }
}