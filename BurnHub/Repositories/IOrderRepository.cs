using BurnHub.Models;

namespace BurnHub.Repositories
{
    public interface IOrderRepository
    {
        List<Order> GetAll();
        Order GetById(int id);
        List<Order> GetAllByUserId(int id, bool complete);
        void Add(OrderBasic order);
        void Update(OrderBasic order);
        void Delete(int id);

        
     
    }
}