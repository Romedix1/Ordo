using Ordo.Api.Data;
using Ordo.Api.Entities;

namespace Ordo.Api.Services;

public class EmailOutbox(AppDbContext db)
{
    public async Task EnqueueAsync(string to, string subject, string htmlBody, CancellationToken ct = default)
    {
        var now = DateTime.UtcNow;

        db.EmailOutbox.Add(new EmailOutboxMessage
        {
            Id = Guid.NewGuid(),
            To = to,
            Subject = subject,
            HtmlBody = htmlBody,
            CreatedAt = now,
            NextAttemptAt = now,
        });

        await db.SaveChangesAsync(ct);
    }
}