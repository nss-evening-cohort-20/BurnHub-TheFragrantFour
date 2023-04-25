using BurnHub.Models;

namespace BurnHub.Repositories
{
    public interface IItemRepository
    {
        void Add(Item item);
        void Delete(int id);
        List<Item> GetAll();
        Item GetByCategoryId(int id);
        Item GetById(int id);
        Item GetByStoreId(int id);
        void Update(Item item);
    }
}