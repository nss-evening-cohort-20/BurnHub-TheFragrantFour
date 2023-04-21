using BurnHub.Models;
using BurnHub.Utils;

namespace BurnHub.Repositories;

public class StoreRepository : BaseRepository, IStoreRepository
{
    public StoreRepository(IConfiguration configuration) : base(configuration) { }

    public List<Store> GetAll()
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
	                                    name
                                    FROM [Store]";

                var reader = cmd.ExecuteReader();
                var stores = new List<Store>();

                while (reader.Read())
                {
                    var store = new Store()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        UserId = DbUtils.GetInt(reader, "userId"),
                        DateCreated = DbUtils.GetDateTime(reader, "dateCreated"),
                        Name = DbUtils.GetString(reader, "name")

                    };

                    stores.Add(store);
                }

                reader.Close();
                return stores;
            }
        }
    }

    public Store GetById(int id)
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
	                                    name
                                    FROM [Store]
                                    WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);

                var reader = cmd.ExecuteReader();

                Store store = null;
                if (reader.Read())
                {
                    store = new Store()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        UserId = DbUtils.GetInt(reader, "userId"),
                        DateCreated = DbUtils.GetDateTime(reader, "dateCreated"),
                        Name = DbUtils.GetString(reader, "name")

                    };
                }

                reader.Close();
                return store;
            }
        }
    }

    public void Add(Store store)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [Store]
	                                    (userId,
	                                    dateCreated,
	                                    name)
                                    OUTPUT INSERTED.ID
                                    VALUES
	                                    (@userId,
                                        @dateCreated,
                                        @name)";

                DbUtils.AddParameter(cmd, "@userId", store.UserId);
                DbUtils.AddParameter(cmd, "@dateCreated", store.DateCreated);
                DbUtils.AddParameter(cmd, "@name", store.Name);


                store.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void Update(Store store)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"UPDATE [Store]
	                                    SET userId = @userId,
	                                        dateCreated = @dateCreated,
	                                        name = @name
                                    WHERE id = @id";

                DbUtils.AddParameter(cmd, "@userId", store.UserId);
                DbUtils.AddParameter(cmd, "@dateCreated", store.DateCreated);
                DbUtils.AddParameter(cmd, "@name", store.Name);


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
                cmd.CommandText = "DELETE FROM [Store] WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
}
