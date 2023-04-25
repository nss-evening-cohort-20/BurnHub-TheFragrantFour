using BurnHub.Models;
using BurnHub.Utils;

namespace BurnHub.Repositories;

public class OrderRepository : BaseRepository, IOrderRepository
{
    public OrderRepository(IConfiguration configuration) : base(configuration) { }

    public List<Order> GetAll()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
                                        o.id,
	                                    o.userId,
	                                    o.dateCreated,
	                                    o.dateComplete,
	                                    u.name as userName,
	                                    u.isSeller as userIsSeller,
	                                    u.dateCreated as userDateCreated,
	                                    u.email as userEmail,
	                                    u.firebaseId as userFirebaseId,
	                                    u.image as userImage,
                                        oi.id as orderItemId,
	                                    oi.itemQuantity as orderItemQuantity,
	                                    i.id as itemId,
	                                    i.name as itemName,
	                                    i.categoryId as itemCategoryId,
	                                    i.storeId as itemStoreId,
	                                    i.description as itemDescription,
	                                    i.price as itemPrice
                                    FROM [Order] o
                                    JOIN [User] u
	                                    ON o.userId = u.id
                                    LEFT JOIN OrderItem oi
	                                    ON o.id = oi.orderId
                                    LEFT JOIN Item i
	                                    ON oi.itemId = i.id";

                var reader = cmd.ExecuteReader();
                var orders = new List<Order>();

                while (reader.Read())
                {
                    var orderId = DbUtils.GetInt(reader, "id");
                    var existingOrder = orders.FirstOrDefault(o => o.Id == orderId);

                    if (existingOrder == null)
                    {
                        existingOrder = new Order()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            DateCreated = DbUtils.GetDateTime(reader, "dateCreated"),
                            DateComplete = DbUtils.GetNullableDateTime(reader, "dateComplete"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "userId"),
                                Name = DbUtils.GetString(reader, "userName"),
                                IsSeller = DbUtils.GetBoolean(reader, "userIsSeller"),
                                DateCreated = DbUtils.GetDateTime(reader, "userDateCreated"),
                                Email = DbUtils.GetString(reader, "userEmail"),
                                FirebaseId = DbUtils.GetString(reader, "userFirebaseId"),
                                Image = DbUtils.GetString(reader, "userImage")
                            },
                            OrderItems = new List<OrderItem>()
                        };

                        orders.Add(existingOrder);
                    }

                    if (DbUtils.IsNotDbNull(reader, "itemId"))
                    {
                        existingOrder.OrderItems.Add(new OrderItem()
                        {
                            Id = DbUtils.GetInt(reader, "orderItemId"),
                            OrderId = DbUtils.GetInt(reader, "id"),
                            ItemId = DbUtils.GetInt(reader, "itemId"),
                            ItemQuantity = DbUtils.GetInt(reader, "orderItemQuantity"),
                            Item = new Item()
                            {
                                Id = DbUtils.GetInt(reader, "itemId"),
                                Name = DbUtils.GetString(reader, "itemName"),
                                CategoryId = DbUtils.GetInt(reader, "itemCategoryId"),
                                StoreId = DbUtils.GetInt(reader, "itemStoreId"),
                                Description = DbUtils.GetString(reader, "itemDescription"),
                                Price = DbUtils.GetInt(reader, "itemPrice")
                            }
                        });
                    }
                }

                reader.Close();
                return orders;
            }
        }
    }

    public Order GetById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
                                        o.id,
	                                    o.userId,
	                                    o.dateCreated,
	                                    o.dateComplete,
	                                    u.name as userName,
	                                    u.isSeller as userIsSeller,
	                                    u.dateCreated as userDateCreated,
	                                    u.email as userEmail,
	                                    u.firebaseId as userFirebaseId,
	                                    u.image as userImage,
                                        oi.id as orderItemId,
	                                    oi.itemQuantity as orderItemQuantity,
	                                    i.id as itemId,
	                                    i.name as itemName,
	                                    i.categoryId as itemCategoryId,
	                                    i.storeId as itemStoreId,
	                                    i.description as itemDescription,
	                                    i.price as itemPrice
                                    FROM [Order] o
                                    JOIN [User] u
	                                    ON o.userId = u.id
                                    LEFT JOIN OrderItem oi
	                                    ON o.id = oi.orderId
                                    LEFT JOIN Item i
	                                    ON oi.itemId = i.id
                                    WHERE o.id = @id";
                DbUtils.AddParameter(cmd, "@id", id);

                var reader = cmd.ExecuteReader();

                Order order = null;
                while (reader.Read())
                {
                    if (order == null)
                    {
                        order = new Order()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            DateCreated = DbUtils.GetDateTime(reader, "dateCreated"),
                            DateComplete = DbUtils.GetNullableDateTime(reader, "dateComplete"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "userId"),
                                Name = DbUtils.GetString(reader, "userName"),
                                IsSeller = DbUtils.GetBoolean(reader, "userIsSeller"),
                                DateCreated = DbUtils.GetDateTime(reader, "userDateCreated"),
                                Email = DbUtils.GetString(reader, "userEmail"),
                                FirebaseId = DbUtils.GetString(reader, "userFirebaseId"),
                                Image = DbUtils.GetString(reader, "userImage")
                            },
                            OrderItems = new List<OrderItem>()
                        };
                    }

                    if (DbUtils.IsNotDbNull(reader, "itemId"))
                    {
                        order.OrderItems.Add(new OrderItem()
                        {
                            Id = DbUtils.GetInt(reader, "orderItemId"),
                            OrderId = DbUtils.GetInt(reader, "id"),
                            ItemId = DbUtils.GetInt(reader, "itemId"),
                            ItemQuantity = DbUtils.GetInt(reader, "orderItemQuantity"),
                            Item = new Item()
                            {
                                Id = DbUtils.GetInt(reader, "itemId"),
                                Name = DbUtils.GetString(reader, "itemName"),
                                CategoryId = DbUtils.GetInt(reader, "itemCategoryId"),
                                StoreId = DbUtils.GetInt(reader, "itemStoreId"),
                                Description = DbUtils.GetString(reader, "itemDescription"),
                                Price = DbUtils.GetInt(reader, "itemPrice")
                            }
                        });
                    }
                }

                reader.Close();
                return order;
            }
        }
    }

    public Order GetByUserId(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
                                        o.id,
	                                    o.userId,
	                                    o.dateCreated,
	                                    o.dateComplete,
	                                    u.name as userName,
	                                    u.isSeller as userIsSeller,
	                                    u.dateCreated as userDateCreated,
	                                    u.email as userEmail,
	                                    u.firebaseId as userFirebaseId,
	                                    u.image as userImage,
                                        oi.id as orderItemId,
	                                    oi.itemQuantity as orderItemQuantity,
	                                    i.id as itemId,
	                                    i.name as itemName,
	                                    i.categoryId as itemCategoryId,
	                                    i.storeId as itemStoreId,
	                                    i.description as itemDescription,
	                                    i.price as itemPrice
                                    FROM [Order] o
                                    JOIN [User] u
	                                    ON o.userId = u.id
                                    LEFT JOIN OrderItem oi
	                                    ON o.id = oi.orderId
                                    LEFT JOIN Item i
	                                    ON oi.itemId = i.id
                                    WHERE o.userId = @userId";
                DbUtils.AddParameter(cmd, "@userId", id);

                var reader = cmd.ExecuteReader();

                Order order = null;
                while (reader.Read())
                {
                    if (order == null)
                    {
                        order = new Order()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            DateCreated = DbUtils.GetDateTime(reader, "dateCreated"),
                            DateComplete = DbUtils.GetNullableDateTime(reader, "dateComplete"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "userId"),
                                Name = DbUtils.GetString(reader, "userName"),
                                IsSeller = DbUtils.GetBoolean(reader, "userIsSeller"),
                                DateCreated = DbUtils.GetDateTime(reader, "userDateCreated"),
                                Email = DbUtils.GetString(reader, "userEmail"),
                                FirebaseId = DbUtils.GetString(reader, "userFirebaseId"),
                                Image = DbUtils.GetString(reader, "userImage")
                            },
                            OrderItems = new List<OrderItem>()
                        };
                    }

                    if (DbUtils.IsNotDbNull(reader, "itemId"))
                    {
                        order.OrderItems.Add(new OrderItem()
                        {
                            Id = DbUtils.GetInt(reader, "orderItemId"),
                            OrderId = DbUtils.GetInt(reader, "id"),
                            ItemId = DbUtils.GetInt(reader, "itemId"),
                            ItemQuantity = DbUtils.GetInt(reader, "orderItemQuantity"),
                            Item = new Item()
                            {
                                Id = DbUtils.GetInt(reader, "itemId"),
                                Name = DbUtils.GetString(reader, "itemName"),
                                CategoryId = DbUtils.GetInt(reader, "itemCategoryId"),
                                StoreId = DbUtils.GetInt(reader, "itemStoreId"),
                                Description = DbUtils.GetString(reader, "itemDescription"),
                                Price = DbUtils.GetInt(reader, "itemPrice")
                            }
                        });
                    }
                }

                reader.Close();
                return order;
            }
        }
    }

    public Order GetOpenOrderByUserId(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
                                        o.id,
	                                    o.userId,
	                                    o.dateCreated,
	                                    o.dateComplete,
	                                    u.name as userName,
	                                    u.isSeller as userIsSeller,
	                                    u.dateCreated as userDateCreated,
	                                    u.email as userEmail,
	                                    u.firebaseId as userFirebaseId,
	                                    u.image as userImage,
                                        oi.id as orderItemId,
	                                    oi.itemQuantity as orderItemQuantity,
	                                    i.id as itemId,
	                                    i.name as itemName,
	                                    i.categoryId as itemCategoryId,
	                                    i.storeId as itemStoreId,
	                                    i.description as itemDescription,
	                                    i.price as itemPrice
                                    FROM [Order] o
                                    JOIN [User] u
	                                    ON o.userId = u.id
                                    LEFT JOIN OrderItem oi
	                                    ON o.id = oi.orderId
                                    LEFT JOIN Item i
	                                    ON oi.itemId = i.id
                                    WHERE o.dateComplete IS NULL
	                                    AND o.userId = @userId";

                DbUtils.AddParameter(cmd, "@userId", id);

                var reader = cmd.ExecuteReader();

                Order order = null;
                while (reader.Read())
                {
                    if (order == null)
                    {
                        order = new Order()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            DateCreated = DbUtils.GetDateTime(reader, "dateCreated"),
                            DateComplete = DbUtils.GetNullableDateTime(reader, "dateComplete"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "userId"),
                                Name = DbUtils.GetString(reader, "userName"),
                                IsSeller = DbUtils.GetBoolean(reader, "userIsSeller"),
                                DateCreated = DbUtils.GetDateTime(reader, "userDateCreated"),
                                Email = DbUtils.GetString(reader, "userEmail"),
                                FirebaseId = DbUtils.GetString(reader, "userFirebaseId"),
                                Image = DbUtils.GetString(reader, "userImage")
                            },
                            OrderItems = new List<OrderItem>()
                        };
                    }

                    if (DbUtils.IsNotDbNull(reader, "itemId"))
                    {
                        order.OrderItems.Add(new OrderItem()
                        {
                            Id = DbUtils.GetInt(reader, "orderItemId"),
                            OrderId = DbUtils.GetInt(reader, "id"),
                            ItemId = DbUtils.GetInt(reader, "itemId"),
                            ItemQuantity = DbUtils.GetInt(reader, "orderItemQuantity"),
                            Item = new Item()
                            {
                                Id = DbUtils.GetInt(reader, "itemId"),
                                Name = DbUtils.GetString(reader, "itemName"),
                                CategoryId = DbUtils.GetInt(reader, "itemCategoryId"),
                                StoreId = DbUtils.GetInt(reader, "itemStoreId"),
                                Description = DbUtils.GetString(reader, "itemDescription"),
                                Price = DbUtils.GetInt(reader, "itemPrice")
                            }
                        });
                    }
                }

                reader.Close();
                return order;
            }
        }
    }

    public List<Order> GetClosedOrdersByUserId(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
                                        o.id,
	                                    o.userId,
	                                    o.dateCreated,
	                                    o.dateComplete,
	                                    u.name as userName,
	                                    u.isSeller as userIsSeller,
	                                    u.dateCreated as userDateCreated,
	                                    u.email as userEmail,
	                                    u.firebaseId as userFirebaseId,
	                                    u.image as userImage,
                                        oi.id as orderItemId,
	                                    oi.itemQuantity as orderItemQuantity,
	                                    i.id as itemId,
	                                    i.name as itemName,
	                                    i.categoryId as itemCategoryId,
	                                    i.storeId as itemStoreId,
	                                    i.description as itemDescription,
	                                    i.price as itemPrice
                                    FROM [Order] o
                                    JOIN [User] u
	                                    ON o.userId = u.id
                                    LEFT JOIN OrderItem oi
	                                    ON o.id = oi.orderId
                                    LEFT JOIN Item i
	                                    ON oi.itemId = i.id
                                    WHERE o.dateComplete IS NOT NULL
	                                    AND o.userId = @userId";

                DbUtils.AddParameter(cmd, "@userId", id);

                var reader = cmd.ExecuteReader();
                var orders = new List<Order>();

                while (reader.Read())
                {
                    var orderId = DbUtils.GetInt(reader, "id");
                    var existingOrder = orders.FirstOrDefault(o => o.Id == orderId);

                    if (existingOrder == null)
                    {
                        existingOrder = new Order()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            DateCreated = DbUtils.GetDateTime(reader, "dateCreated"),
                            DateComplete = DbUtils.GetNullableDateTime(reader, "dateComplete"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "userId"),
                                Name = DbUtils.GetString(reader, "userName"),
                                IsSeller = DbUtils.GetBoolean(reader, "userIsSeller"),
                                DateCreated = DbUtils.GetDateTime(reader, "userDateCreated"),
                                Email = DbUtils.GetString(reader, "userEmail"),
                                FirebaseId = DbUtils.GetString(reader, "userFirebaseId"),
                                Image = DbUtils.GetString(reader, "userImage")
                            },
                            OrderItems = new List<OrderItem>()
                        };

                        orders.Add(existingOrder);
                    }

                    if (DbUtils.IsNotDbNull(reader, "itemId"))
                    {
                        existingOrder.OrderItems.Add(new OrderItem()
                        {
                            Id = DbUtils.GetInt(reader, "orderItemId"),
                            OrderId = DbUtils.GetInt(reader, "id"),
                            ItemId = DbUtils.GetInt(reader, "itemId"),
                            ItemQuantity = DbUtils.GetInt(reader, "orderItemQuantity"),
                            Item = new Item()
                            {
                                Id = DbUtils.GetInt(reader, "itemId"),
                                Name = DbUtils.GetString(reader, "itemName"),
                                CategoryId = DbUtils.GetInt(reader, "itemCategoryId"),
                                StoreId = DbUtils.GetInt(reader, "itemStoreId"),
                                Description = DbUtils.GetString(reader, "itemDescription"),
                                Price = DbUtils.GetInt(reader, "itemPrice")
                            }
                        });
                    }
                }

                reader.Close();
                return orders;
            }
        }
    }

    public void Add(OrderBasic order)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [Order]
	                                    (userId,
	                                    dateCreated,
	                                    dateComplete)
                                    OUTPUT INSERTED.ID
                                    VALUES
	                                    (@userId,
	                                    @dateCreated,
	                                    @dateComplete)";

                DbUtils.AddParameter(cmd, "@userId", order.UserId);
                DbUtils.AddParameter(cmd, "@dateCreated", order.DateCreated);
                DbUtils.AddParameter(cmd, "@dateComplete", order.DateComplete);

                order.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void Update(OrderBasic order)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"UPDATE [Order]
                                        SET userId = @userId,
                                            dateCreated = @dateCreated,
                                            dateComplete = @dateComplete
                                    WHERE id = @id";

                DbUtils.AddParameter(cmd, "@id", order.Id);
                DbUtils.AddParameter(cmd, "@userId", order.UserId);
                DbUtils.AddParameter(cmd, "@dateCreated", order.DateCreated);
                DbUtils.AddParameter(cmd, "@dateComplete", order.DateComplete);

                cmd.ExecuteNonQuery();
            }
        }
    }

    public void Delete(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = "DELETE FROM [Order] WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }


    // ---- ORDER ITEM ----

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