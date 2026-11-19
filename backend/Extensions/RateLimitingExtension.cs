using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;

namespace Ordo.Api.Extensions;

public static class RateLimitPolicies
{
    public const string EmailResend = "EmailResend";
    public const string Register = "Register";
    public const string Login = "Login";
    public const string PasswordReset = "PasswordReset";
}

public static class RateLimitingExtenstions
{
    public static IServiceCollection AddRateLimiting(this IServiceCollection services)
    {
        services.AddRateLimiter(options =>
        {
            options.AddPerIpPolicy(RateLimitPolicies.EmailResend, permitLimit: 2);
            options.AddPerIpPolicy(RateLimitPolicies.Register, permitLimit: 5);
            options.AddPerIpPolicy(RateLimitPolicies.Login, permitLimit: 5);
            options.AddPerIpPolicy(RateLimitPolicies.PasswordReset, permitLimit: 5);

            options.OnRejected = async (context, token) =>
            {
                await context.HttpContext.Response.WriteAsJsonAsync(new
                {
                    title = "Too many requests. Please wait a minute and try again."
                }, cancellationToken: token);
            };
        });

        return services;
    }

    private static void AddPerIpPolicy(this RateLimiterOptions options, string Name, int permitLimit)
    {
        options.AddPolicy(Name, httpContext => RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "anonymous",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = permitLimit,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0
            }));
    }
}