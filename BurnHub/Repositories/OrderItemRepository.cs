using BurnHub.Models;
using BurnHub.Utils;

namespace BurnHub.Repositories;

public class OrderItemRepository : BaseRepository, IOrderItemRepository
{
    public OrderItemRepository(IConfiguration configuration) : base(configuration) { }

    public OrderItem GetAllCompletedByStoreId(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())

            {
                cmd.CommandText = @"SELECT
                                         oI.id as orderItemId,
                                        oI.orderId as orderItemOrderId,
                                        oI.itemId as orderItemItemId,
                                        oI.itemQuantity,
                                        o.id as orderId,
                                        o.userId as orderUserId,
                                        o.dateCreated,
                                        o.dateComplete,
                                        i.id as itemId,
	                                    i.name as itemName,
	                                    i.categoryId as itemCategoryId,
	                                    i.storeId as itemStoreId,
                                        i.description as itemDescription,
                                        i.price as itemPrice,
                                        i.quantity as itemQuantity,
                                        i.Image as itemImage,
                                        s.id as storeId,
	                                    s.userId as storeUserId,
                                        s.dateCreated as storeDateCreated,
                                        s.name as storeName,
                                        s.profileImage as storeProfileImage,
                                        s.image as storeImage
                                    FROM [OrderItem] oI
                                    JOIN [Order] o
                                    ON oI.orderId = o.id
                                    JOIN [Item] i
                                    ON oI.itemId = i.id
                                    JOIN [Store] s
                                    ON i.storeId = s.id
                                       
                                    WHERE o.dateComplete is NOT Null AND i.storeId = @storeId";

                DbUtils.AddParameter(cmd, "@storeId", id);

                var reader = cmd.ExecuteReader();

                OrderItem orderItem = null;
                while (reader.Read())
                {
                    if (orderItem == null)
                    {
                        orderItem = new OrderItem()
                        {
                            Id = DbUtils.GetInt(reader, "orderItemId"),
                            OrderId = DbUtils.GetInt(reader, "orderItemOrderId"),
                            ItemId = DbUtils.GetInt(reader, "orderItemItemId"),
                            ItemQuantity = DbUtils.GetInt(reader, "itemQuantity"),
                            Order = new Order
                            {
                                Id = DbUtils.GetInt(reader, "orderId"),
                                UserId = DbUtils.GetInt(reader, "orderUserId"),
                                DateCreated = DbUtils.GetDateTime(reader, "dateCreated"),
                                DateComplete = DbUtils.GetNullableDateTime(reader, "dateComplete"),
                            },
                            Item = new Item
                            {
                                Id = DbUtils.GetInt(reader, "itemId"),
                                Name = DbUtils.GetString(reader, "itemName"),
                                CategoryId = DbUtils.GetInt(reader, "itemCategoryId"),
                                StoreId = DbUtils.GetInt(reader, "itemStoreId"),
                                Description = DbUtils.GetString(reader, "itemDescription"),
                                Price = DbUtils.GetInt(reader, "itemPrice"),
                                Quantity = DbUtils.GetInt(reader, "itemQuantity"),
                                Image = DbUtils.GetString(reader, "itemImage"),
                            },
                            Store = new Store
                            {
                                Id = DbUtils.GetInt(reader, "storeId"),
                                UserId = DbUtils.GetInt(reader, "storeUserId"),
                                DateCreated = DbUtils.GetDateTime(reader, "storeDateCreated"),
                                Name = DbUtils.GetString(reader, "storeName"),
                                ProfileImage = DbUtils.GetString(reader, "storeProfileImage"),
                                CoverImage = DbUtils.GetString(reader, "storeImage")
                            },
                        };
                    }
                }

                reader.Close();
                return orderItem;

            }

        }
    }

    public void AddOrderItem(OrderItem orderItem)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [OrderItem]
	                                    (orderId,
	                                    itemId,
	                                    itemQuantity)
                                    OUTPUT INSERTED.ID
                                    VALUES
	                                    (@orderId,
	                                    @itemId,
	                                    @itemQuantity)";

                DbUtils.AddParameter(cmd, "@orderId", orderItem.OrderId);
                DbUtils.AddParameter(cmd, "@itemId", orderItem.ItemId);
                DbUtils.AddParameter(cmd, "@itemQuantity", orderItem.ItemQuantity);

                orderItem.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void UpdateOrderItem(OrderItem orderItem)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"UPDATE [OrderItem]
                                        SET orderId = @orderId,
                                            itemId = @itemId,
                                            itemQuantity = @itemQuantity
                                    WHERE id = @id";

                DbUtils.AddParameter(cmd, "@id", orderItem.Id);
                DbUtils.AddParameter(cmd, "@orderId", orderItem.OrderId);
                DbUtils.AddParameter(cmd, "@itemId", orderItem.ItemId);
                DbUtils.AddParameter(cmd, "@itemQuantity", orderItem.ItemQuantity);

                cmd.ExecuteNonQuery();
            }
        }
    }

    public void DeleteOrderItem(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = "DELETE FROM [OrderItem] WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }

    }

}


