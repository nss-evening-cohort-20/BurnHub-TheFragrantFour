using BurnHub.Models;

namespace BurnHub.Repositories
{
    public interface IStoreRepository
    {
        List<Store> GetAll();
        Store GetById(int id);
        List<Store> Search(string criterion);
        void Add(Store store);
        void Update(Store store);
        void Delete(int id);
    }
}