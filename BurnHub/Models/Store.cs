using System;
namespace BurnHub.Models;

public class Store
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateTime DateCreated { get; set; }
    public string Name { get; set; }
    public string ProfileImage { get; set; }
    public string CoverImage { get; set; }
}

