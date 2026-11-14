
public class RefreshToken
{
    public Guid Id { get; set; }
    public Guid UserID { get; set; }
    public string TokenHash { get; set; } = "";
    public DateTime ExpiresAt { get; set; }
    public DateTime? RevokedAt { get; set; }
}