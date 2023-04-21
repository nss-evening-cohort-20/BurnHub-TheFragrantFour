using BurnHub.Models;

namespace BurnHub.Repositories
{
    public interface IOrderRepository
    {
        List<Order> GetAll();
        Order GetById(int id);
        Order GetByUserId(int id);
        void Add(OrderBasic order);
        void Update(OrderBasic order);
        void Delete(int id);

        // ---- ORDER ITEM ----
        void AddOrderItem(OrderItem orderItem);
        void UpdateOrderItem(OrderItem orderItem);
        void DeleteOrderItem(int id);
    }
}