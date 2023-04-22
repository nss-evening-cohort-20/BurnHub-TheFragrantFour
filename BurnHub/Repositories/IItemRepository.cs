using BurnHub.Models;

namespace BurnHub.Repositories
{
    public interface IItemRepository
    {
        void Add(Item item);
        void Delete(int id);
        List<Item> GetAll();
        Item GetById(int id);
        void Update(Item item);
    }
}