using Microsoft.EntityFrameworkCore;
using Ordo.Api.Data;

namespace Ordo.Api.Services;

public class EmailOutboxProcessor(IServiceScopeFactory scopeFactory, EmailService email, ILogger<EmailOutboxProcessor> logger) : BackgroundService
{
    private const int MaxAttempts = 8;
    private const int BatchSize = 20;
    private static readonly TimeSpan PollInterval = TimeSpan.FromSeconds(5);

    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        while (!ct.IsCancellationRequested)
        {
            try
            {
                await ProcessBatch(ct);
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                logger.LogError(ex, "Email outbox batch failed");
            }


            await Task.Delay(PollInterval, ct);
        }
    }

    private async Task ProcessBatch(CancellationToken ct)
    {
        using var scope = scopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        var now = DateTime.UtcNow;
        var batch = await db.EmailOutbox.Where(message => message.SentAt == null && message.FailedAt == null && message.NextAttemptAt <= now).OrderBy(message => message.CreatedAt).Take(BatchSize).ToListAsync(ct);

        foreach (var message in batch)
        {
            try
            {
                await email.SendAsync(message.To, message.Subject, message.HtmlBody, ct);
                message.SentAt = DateTime.UtcNow;
                message.HtmlBody = "";
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                message.Attempts++;
                message.LastError = ex.Message.Length > 2000 ? ex.Message[..2000] : ex.Message;

                if (message.Attempts >= MaxAttempts)
                {
                    message.FailedAt = DateTime.UtcNow;
                    logger.LogError(ex, "Email {Id} to {To} permanently failed", message.Id, message.To);
                }
                else
                {
                    var delay = TimeSpan.FromSeconds(Math.Min(30 * Math.Pow(2, message.Attempts - 1), 3600));
                    message.NextAttemptAt = DateTime.UtcNow + delay;
                    logger.LogWarning(ex, "Email {Id} failed, retry in {Delay}", message.Id, delay);
                }
            }

            await db.SaveChangesAsync(ct);
        }
    }
}