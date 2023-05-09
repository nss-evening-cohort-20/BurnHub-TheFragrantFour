using BurnHub.Models;

namespace BurnHub.Repositories
{
    public interface IOrderRepository
    {
        List<Order> GetAll();
        Order GetById(int id);
        List<Order> GetAllByUserFirebaseId(string userFirebaseId, bool complete);
        void Add(Order order);
        void Update(Order order);
        void Delete(int id);

        
     
    }
}