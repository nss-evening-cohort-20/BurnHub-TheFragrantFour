using BurnHub.Models;
using BurnHub.Utils;
using Microsoft.AspNetCore.Http.Features;

namespace BurnHub.Repositories;

public class FavoriteRepository : BaseRepository, IFavoriteRepository
{
    public FavoriteRepository(IConfiguration configuration) : base(configuration) { }

    public Item GetFavoritesByUserId(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
                                        f.id,
	                                    f.itemId,
	                                    f.userId,
                                        i.name,
                                        i.categoryId,
	                                    i.storeId,
                                        i.description,
                                        i.price,
                                        i.quantity,
                                        i.Image
                                    FROM [Favorite] f
                                    JOIN [item] i
	                                    ON i.id = f.itemId
                                    WHERE i.id = @id";
                DbUtils.AddParameter(cmd, "@id", id);

                var reader = cmd.ExecuteReader();

                Item item = null;
                while (reader.Read())
                {
                    if (item == null)
                    {
                        item = new Item()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            CategoryId = DbUtils.GetInt(reader, "categoryId"),
                            StoreId = DbUtils.GetInt(reader, "storeId"),
                            Description = DbUtils.GetString(reader, "description"),
                            Price = DbUtils.GetInt(reader, "price"),
                            Quantity = DbUtils.GetInt(reader, "quantity"),
                            Image = DbUtils.GetString(reader, "image"),
                            Favorite = new Favorite
                            {
                                Id = DbUtils.GetInt(reader, "id"),
                                ItemId = DbUtils.GetInt(reader, "itemId"),
                                UserId = DbUtils.GetInt(reader, "userId")
                            },
                        };
                    }
                }

                reader.Close();
                return item;
            }
        }
    }

    public void Add(Favorite favorite)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [Favorite]
                                        (itemId,
                                        userId)
                                    OUTPUT INSERTED.ID
                                    VALUES
                                        (@itemId,
                                        @userId)";

                DbUtils.AddParameter(cmd, "@itemId", favorite.ItemId);
                DbUtils.AddParameter(cmd, "@userId", favorite.UserId);
                favorite.Id = (int)cmd.ExecuteScalar();
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
                cmd.CommandText = "DELETE FROM [Favorite] WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }

}
