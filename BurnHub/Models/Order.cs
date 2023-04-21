namespace BurnHub.Models;

public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime? DateComplete { get; set; }
    public User? User { get; set; }
    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}

public class OrderBasic
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime? DateComplete { get; set; }
}