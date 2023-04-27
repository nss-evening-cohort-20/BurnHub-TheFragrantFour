using BurnHub.Models;

namespace BurnHub.Repositories
{
    public interface IOrderItemRepository
    {
        void AddOrderItem(OrderItem orderItem);
        void DeleteOrderItem(int id);
        OrderItem GetAllCompletedByStoreId(int id);
        void UpdateOrderItem(OrderItem orderItem);
    }
}