namespace BurnHub.Models;

public class Item
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int CategoryId { get; set; }
    public int StoreId { get; set; }
    public string? Description { get; set; }
    public int Price{ get; set; }
    public int Count { get; set; }
    //public Category? Category { get; set; }
    //public Store? Store { get; set; }
}