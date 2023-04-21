using BurnHub.Models;

namespace BurnHub.Repositories
{
    public interface IStoreRepository
    {
        void Add(Store store);
        void Delete(int id);
        List<Store> GetAll();
        Store GetById(int id);
        void Update(Store store);
    }
}