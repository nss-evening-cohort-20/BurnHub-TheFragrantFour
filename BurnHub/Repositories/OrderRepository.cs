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
                                        id,
	                                    userId,
	                                    dateCreated,
	                                    dateComplete
                                    FROM [Order]";

                var reader = cmd.ExecuteReader();
                var orders = new List<Order>();

                while (reader.Read())
                {
                    var order = new Order()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        UserId = DbUtils.GetInt(reader, "userId"),
                        DateCreated = DbUtils.GetDateTime(reader, "dateCreated"),
                        DateComplete = DbUtils.GetNullableDateTime(reader, "dateComplete")
                    };

                    orders.Add(order);
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
                                        id,
	                                    userId,
	                                    dateCreated,
	                                    dateComplete
                                    FROM [Order]
                                    WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);

                var reader = cmd.ExecuteReader();

                Order order = null;
                if (reader.Read())
                {
                    order = new Order()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        UserId = DbUtils.GetInt(reader, "userId"),
                        DateCreated = DbUtils.GetDateTime(reader, "dateCreated"),
                        DateComplete = DbUtils.GetNullableDateTime(reader, "dateComplete")
                    };
                }

                reader.Close();
                return order;
            }
        }
    }

    public void Add(Order order)
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

    public void Update(Order order)
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
}