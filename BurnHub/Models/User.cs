namespace BurnHub.Models;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsSeller { get; set; }
    public DateTime DateCreated { get; set; }
    public string Email { get; set; }
    public string FirebaseId { get; set; }
    public string? Image { get; set; }
    public Store? Store { get; set; }
    public string UserId { get; internal set; }
}