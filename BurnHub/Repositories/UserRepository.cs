using BurnHub.Models;
using BurnHub.Utils;

namespace BurnHub.Repositories;

public class UserRepository : BaseRepository, IUserRepository
{
    public UserRepository(IConfiguration configuration) : base(configuration) { }

    public List<User> GetAll()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
                                        id,
	                                    name,
	                                    isSeller,
	                                    dateCreated,
	                                    email,
	                                    firebaseId,
	                                    image
                                    FROM [User]";

                var reader = cmd.ExecuteReader();
                var users = new List<User>();

                while (reader.Read())
                {
                    var user = new User()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "name"),
                        IsSeller = DbUtils.GetBoolean(reader, "isSeller"),
                        DateCreated = DbUtils.GetDateTime(reader, "dateCreated"),
                        Email = DbUtils.GetString(reader, "email"),
                        FirebaseId = DbUtils.GetString(reader, "firebaseId"),
                        Image = DbUtils.GetString(reader, "image")
                    };

                    users.Add(user);
                }

                reader.Close();
                return users;
            }
        }
    }

    public User GetById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
                                        id,
	                                    name,
	                                    isSeller,
	                                    dateCreated,
	                                    email,
	                                    firebaseId,
	                                    image
                                    FROM [User]
                                    WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);

                var reader = cmd.ExecuteReader();

                User user = null;
                if (reader.Read())
                {
                    user = new User()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "name"),
                        IsSeller = DbUtils.GetBoolean(reader, "isSeller"),
                        DateCreated = DbUtils.GetDateTime(reader, "dateCreated"),
                        Email = DbUtils.GetString(reader, "email"),
                        FirebaseId = DbUtils.GetString(reader, "firebaseId"),
                        Image = DbUtils.GetString(reader, "image")
                    };
                }

                reader.Close();
                return user;
            }
        }
    }

    public User GetByFirebaseId(string uid)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
                                        u.id,
	                                    u.name,
	                                    u.isSeller,
	                                    u.dateCreated,
	                                    u.email,
	                                    u.firebaseId,
	                                    u.image,
                                        s.id as storeId,
                                        s.userId as storeUserId,
                                        s.dateCreated as storeDateCreated,
                                        s.name as storeName,
                                        s.profileImage,
                                        s.coverImage
                                    FROM [User] u
                                    LEFT JOIN Store s ON u.id = s.userId
                                    WHERE firebaseId = @uid";
                DbUtils.AddParameter(cmd, "@uid", uid);

                var reader = cmd.ExecuteReader();

                User user = null;
                if (reader.Read())
                {
                    user = new User()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "name"),
                        IsSeller = DbUtils.GetBoolean(reader, "isSeller"),
                        DateCreated = DbUtils.GetDateTime(reader, "dateCreated"),
                        Email = DbUtils.GetString(reader, "email"),
                        FirebaseId = DbUtils.GetString(reader, "firebaseId"),
                        Image = DbUtils.GetString(reader, "image")                       
                    };

                    if (DbUtils.IsNotDbNull(reader, "storeId"))
                    {
                        user.Store = new Store() 
                        {
                            Id = DbUtils.GetInt(reader, "storeId"),
                            UserId = DbUtils.GetInt(reader, "storeUserId"),
                            DateCreated = DbUtils.GetDateTime(reader, "storeDateCreated"),
                            Name = DbUtils.GetString(reader, "storeName"),
                            ProfileImage = DbUtils.GetString(reader, "profileImage"),
                            CoverImage = DbUtils.GetString(reader, "coverImage")
                        };
                    }
                };

                reader.Close();
                return user;
            }
        }
    }

    public void Add(User user)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [User]
	                                    (name,
	                                    isSeller,
	                                    dateCreated,
	                                    email,
	                                    firebaseId,
	                                    image)
                                    OUTPUT INSERTED.ID
                                    VALUES
	                                    (@name,
                                        @isSeller,
                                        @dateCreated,
                                        @email,
                                        @firebaseId,
                                        @image)";

                DbUtils.AddParameter(cmd, "@name", user.Name);
                DbUtils.AddParameter(cmd, "@isSeller", user.IsSeller);
                DbUtils.AddParameter(cmd, "@dateCreated", user.DateCreated);
                DbUtils.AddParameter(cmd, "@email", user.Email);
                DbUtils.AddParameter(cmd, "@firebaseId", user.FirebaseId);
                DbUtils.AddParameter(cmd, "@image", user.Image);

                user.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void Update(User user)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"UPDATE [User]
	                                    SET name = @name,
	                                        isSeller = @isSeller,
	                                        dateCreated = @dateCreated,
	                                        email = @email,
	                                        firebaseId = @firebaseId,
	                                        image = @image
                                    WHERE id = @id";

                DbUtils.AddParameter(cmd, "@id", user.Id);
                DbUtils.AddParameter(cmd, "@name", user.Name);
                DbUtils.AddParameter(cmd, "@isSeller", user.IsSeller);
                DbUtils.AddParameter(cmd, "@dateCreated", user.DateCreated);
                DbUtils.AddParameter(cmd, "@email", user.Email);
                DbUtils.AddParameter(cmd, "@firebaseId", user.FirebaseId);
                DbUtils.AddParameter(cmd, "@image", user.Image);

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
                cmd.CommandText = "DELETE FROM [User] WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
}