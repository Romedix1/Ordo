using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Ordo.Api.Data;
using Ordo.Api.Endpoints;
using Ordo.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services
    .AddIdentityCore<User>(options =>
    {
        options.Password.RequiredLength = 8;
        options.Password.RequireLowercase = true;
        options.Password.RequireUppercase = true;
        options.Password.RequireDigit = true;
        options.Password.RequireNonAlphanumeric = true;

        options.User.RequireUniqueEmail = true;
    })
    .AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

var origins = builder.Configuration.GetSection("Cors:Origins").Get<string[]>() ?? [];

builder.Services.AddCors(option => option.AddPolicy("Frontend", policy => policy
    .WithOrigins(origins)
    .WithHeaders("Content-Type", "Authorization")
    .WithMethods("GET", "POST", "PUT", "PATCH", "DELETE")
    .AllowCredentials()));

builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    options.AddPolicy("EmailResend", httpContext =>
          RateLimitPartition.GetFixedWindowLimiter(
              partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "anonymous",
              factory: _ => new FixedWindowRateLimiterOptions
              {
                  PermitLimit = 2,
                  Window = TimeSpan.FromMinutes(1),
                  QueueLimit = 0
              }));

    options.OnRejected = async (context, token) =>
    {
        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
        await context.HttpContext.Response.WriteAsJsonAsync(new
        {
            title = "Too many requests. Please wait a minute before requesting another email."
        }, cancellationToken: token);
    };
});

builder.Services.Configure<DataProtectionTokenProviderOptions>(option => option.TokenLifespan = TimeSpan.FromHours(24));
builder.Services.AddTransient<EmailService>();
builder.Services.AddScoped<EmailConfirmationService>();
builder.Services.AddDataProtection();

var app = builder.Build();

app.UseCors("Frontend");
app.UseRateLimiter();

app.MapRegisterUser();
app.MapResendConfirmationEmail();
app.MapVerifyEmail();

app.Run();