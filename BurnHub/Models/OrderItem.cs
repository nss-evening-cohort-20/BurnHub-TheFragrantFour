namespace BurnHub.Models;

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int ItemId { get; set; }
    public int ItemQuantity { get; set; }
    public Item? Item { get; set; }
    public Store? Store { get; set; }
    public Order? Order { get; set; }
}