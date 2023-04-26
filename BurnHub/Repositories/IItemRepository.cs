using BurnHub.Models;

namespace BurnHub.Repositories
{
    public interface IItemRepository
    {
        List<Item> Search(string criterion);
        List<Item> GetAll();
        Item GetById(int id);
        List<Item> GetByCategoryId(int id);
        List<Item> GetByStoreId(int id);
        void Add(Item item);
        void Update(Item item);
        void Delete(int id);
    }
}