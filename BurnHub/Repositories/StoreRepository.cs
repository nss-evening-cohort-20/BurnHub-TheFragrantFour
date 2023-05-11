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
	                                    name,
                                        profileImage,
                                        coverImage
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
                        Name = DbUtils.GetString(reader, "name"),
                        ProfileImage = DbUtils.GetString(reader, "profileImage"),
                        CoverImage = DbUtils.GetString(reader, "coverImage")
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
	                                    name,
                                        profileImage,
                                        coverImage
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
                        Name = DbUtils.GetString(reader, "name"),
                        ProfileImage = DbUtils.GetString(reader, "profileImage"),
                        CoverImage = DbUtils.GetString(reader, "coverImage")
                    };
                }

                reader.Close();
                return store;
            }
        }
    }

    public List<Store> Search(string criterion)
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
	                                    name,
                                        profileImage,
                                        coverImage
                                    FROM [Store]
                                    WHERE name LIKE @Criterion";

                DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");

                var reader = cmd.ExecuteReader();
                var stores = new List<Store>();

                while (reader.Read())
                {
                    var store = new Store()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        UserId = DbUtils.GetInt(reader, "userId"),
                        DateCreated = DbUtils.GetDateTime(reader, "dateCreated"),
                        Name = DbUtils.GetString(reader, "name"),
                        ProfileImage = DbUtils.GetString(reader, "profileImage"),
                        CoverImage = DbUtils.GetString(reader, "coverImage")
                    };

                    stores.Add(store);
                }

                reader.Close();
                return stores;
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
	                                    name,
                                        profileImage,
                                        coverImage)
                                    OUTPUT INSERTED.ID
                                    VALUES
	                                    (@userId,
                                        @dateCreated,
                                        @name,
                                        @profileImage,
                                        @coverImage)";

                DbUtils.AddParameter(cmd, "@userId", store.UserId);
                DbUtils.AddParameter(cmd, "@dateCreated", store.DateCreated);
                DbUtils.AddParameter(cmd, "@name", store.Name);
                DbUtils.AddParameter(cmd, "@profileImage", store.ProfileImage);
                DbUtils.AddParameter(cmd, "@coverImage", store.CoverImage);

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
	                                        name = @name,
                                            profileImage = @profileImage,
                                            coverImage = @coverImage
                                    WHERE id = @id";

                DbUtils.AddParameter(cmd, "@userId", store.UserId);
                DbUtils.AddParameter(cmd, "@dateCreated", store.DateCreated);
                DbUtils.AddParameter(cmd, "@name", store.Name);
                DbUtils.AddParameter(cmd, "@profileImage", store.ProfileImage);
                DbUtils.AddParameter(cmd, "@coverImage", store.CoverImage);

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
