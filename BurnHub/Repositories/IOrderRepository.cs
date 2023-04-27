using BurnHub.Models;

namespace BurnHub.Repositories
{
    public interface IOrderRepository
    {
        List<Order> GetAll();
        Order GetById(int id);
        Order GetByUserId(int id);
        Order GetOpenOrderByUserId(int id);
        List<Order> GetClosedOrdersByUserId(int id);
        void Add(OrderBasic order);
        void Update(OrderBasic order);
        void Delete(int id);

        
     
    }
}