
using Microsoft.AspNetCore.Identity;

public class User : IdentityUser<Guid>
{
    public string Name { get; set; } = string.Empty;
}