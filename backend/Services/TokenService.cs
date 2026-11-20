using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Ordo.Api.Data;
using Ordo.Api.Entities;

namespace Ordo.Api.Services;

public class TokenService(IConfiguration config, AppDbContext db)

{
    public string CreateAccessToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
        var descriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity([
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email!),
            ]),
            Expires = DateTime.UtcNow.AddMinutes(15),
            Issuer = config["Jwt:Issuer"],
            Audience = config["Jwt:Audience"],
            SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256),
        };

        return new JsonWebTokenHandler().CreateToken(descriptor);
    }

    public async Task<(string Value, DateTime ExpiresAt)> CreateRefreshToken(User user, CancellationToken ct)
    {
        var value = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
        var hash = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(value)));

        var expires = DateTime.UtcNow.AddDays(7);

        db.RefreshTokens.Add(new RefreshToken { Id = Guid.NewGuid(), UserID = user.Id, TokenHash = hash, ExpiresAt = expires });

        await db.SaveChangesAsync(ct);

        return (value, expires);
    }
}