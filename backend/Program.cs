using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Ordo.Api.Data;
using Ordo.Api.Endpoints;

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
    .AddEntityFrameworkStores<AppDbContext>();

var origins = builder.Configuration.GetSection("Cors:Origins").Get<string[]>() ?? [];

builder.Services.AddCors(option => option.AddPolicy("Frontend", policy => policy
    .WithOrigins(origins)
    .WithHeaders("Content-Type", "Authorization")
    .WithMethods("GET", "POST", "PUT", "PATCH", "DELETE")
    .AllowCredentials()));

var app = builder.Build();

app.UseCors("Frontend");

app.MapRegisterUser();

app.Run();