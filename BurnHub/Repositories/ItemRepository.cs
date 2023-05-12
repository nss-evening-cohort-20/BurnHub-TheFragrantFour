using BurnHub.Models;
using BurnHub.Utils;
using Microsoft.AspNetCore.Http.Features;

namespace BurnHub.Repositories;

public class ItemRepository : BaseRepository, IItemRepository
{
    public ItemRepository(IConfiguration configuration) : base(configuration) { }

    public enum SortOrder
    {
        PriceAscending,
        PriceDescending,
        Name,
        Quantity
    }

    public List<Item> Search(string criterion)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
                                        i.id,
                                        i.name,
                                        i.categoryId,
                                        i.storeId,
                                        i.quantity,
                                        i.description,
                                        i.price,
                                        i.image,
	                                    s.userId as storeUserId,
	                                    s.dateCreated as storeDateCreated,
	                                    s.name as storeName,
	                                    s.profileImage as storeProfileImage,
	                                    s.coverImage as storeCoverImage,
	                                    c.name as categoryName,
	                                    c.image as categoryImage
                                    FROM Item i
                                    JOIN Store s
	                                    ON i.storeId = s.id
                                    JOIN Category c
	                                    ON i.categoryId = c.id
                                    WHERE i.name LIKE @Criterion";

                DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");

                var reader = cmd.ExecuteReader();
                var items = new List<Item>();

                while (reader.Read())
                {
                    var item = new Item()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "name"),
                        CategoryId = DbUtils.GetInt(reader, "categoryId"),
                        StoreId = DbUtils.GetInt(reader, "storeId"),
                        Quantity = DbUtils.GetInt(reader, "quantity"),
                        Description = DbUtils.GetString(reader, "description"),
                        Price = DbUtils.GetInt(reader, "price"),
                        Image = DbUtils.GetString(reader, "image"),
                        Category = new Category()
                        {
                            Id = DbUtils.GetInt(reader, "categoryId"),
                            Name = DbUtils.GetString(reader, "categoryName"),
                            Image = DbUtils.GetString(reader, "categoryImage")
                        },
                        Store = new Store()
                        {
                            Id = DbUtils.GetInt(reader, "storeId"),
                            UserId = DbUtils.GetInt(reader, "storeUserId"),
                            DateCreated = DbUtils.GetDateTime(reader, "storeDateCreated"),
                            Name = DbUtils.GetString(reader, "storeName"),
                            ProfileImage = DbUtils.GetString(reader, "storeProfileImage"),
                            CoverImage = DbUtils.GetString(reader, "storeCoverImage")
                        }
                    };

                    items.Add(item);
                }

                reader.Close();
                return items;
            }
        }
    }

    public List<Item> GetPagedItems(int pageNumber, int pageSize, SortOrder sortOrder, string? categoryIds = null)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                var sql = @"SELECT
                                        i.id,
                                        i.name,
                                        i.categoryId,
                                        i.storeId,
                                        i.quantity,
                                        i.description,
                                        i.price,
                                        i.image,
	                                    s.userId as storeUserId,
	                                    s.dateCreated as storeDateCreated,
	                                    s.name as storeName,
	                                    s.profileImage as storeProfileImage,
	                                    s.coverImage as storeCoverImage,
	                                    c.name as categoryName,
	                                    c.image as categoryImage
                                    FROM Item i
                                    JOIN Store s
	                                    ON i.storeId = s.id
                                    JOIN Category c
	                                    ON i.categoryId = c.id";

                if (!string.IsNullOrEmpty(categoryIds))
                {
                    var ids = categoryIds.Split(",").Select(id => int.Parse(id)).ToList();
                    var where = "\nWHERE i.categoryId IN ({0})";
                    var formattedIds = string.Join(",", ids);
                    sql += string.Format(where, formattedIds);
                }

                switch (sortOrder)
                {
                    case SortOrder.PriceAscending:
                        sql += " Order by i.price ASC OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY ";
                        break;
                    case SortOrder.PriceDescending:
                        sql += " Order by i.price DESC OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY ";
                        break;
                    case SortOrder.Quantity:
                        sql += " Order by i.quantity DESC OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY";
                        break;
                    default: 
                        sql += " Order by i.name ASC OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY ";
                        break;
                }

                cmd.CommandText = sql;
                
                DbUtils.AddParameter(cmd, "@Offset", (pageNumber - 1) * pageSize);
                DbUtils.AddParameter(cmd, "@PageSize", pageSize);
                DbUtils.AddParameter(cmd, "@categoryId", categoryIds);

                var reader = cmd.ExecuteReader();
                var items = new List<Item>();

                while (reader.Read())
                {
                    var item = new Item()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "name"),
                        CategoryId = DbUtils.GetInt(reader, "categoryId"),
                        StoreId = DbUtils.GetInt(reader, "storeId"),
                        Quantity = DbUtils.GetInt(reader, "quantity"),
                        Description = DbUtils.GetString(reader, "description"),
                        Price = DbUtils.GetInt(reader, "price"),
                        Image = DbUtils.GetString(reader, "image"),
                        Category = new Category()
                        {
                            Id = DbUtils.GetInt(reader, "categoryId"),
                            Name = DbUtils.GetString(reader, "categoryName"),
                            Image = DbUtils.GetString(reader, "categoryImage")
                        },
                        Store = new Store()
                        {
                            Id = DbUtils.GetInt(reader, "storeId"),
                            UserId = DbUtils.GetInt(reader, "storeUserId"),
                            DateCreated = DbUtils.GetDateTime(reader, "storeDateCreated"),
                            Name = DbUtils.GetString(reader, "storeName"),
                            ProfileImage = DbUtils.GetString(reader, "storeProfileImage"),
                            CoverImage = DbUtils.GetString(reader, "storeCoverImage")
                        }
                    };

                    items.Add(item);
                }

                reader.Close();
                return items;
            }
        }
    }

    public List<Item> GetAll(string? categoryIds = null)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                var sql = @"SELECT
                                        i.id,
                                        i.name,
                                        i.categoryId,
                                        i.storeId,
                                        i.quantity,
                                        i.description,
                                        i.price,
                                        i.image,
	                                    s.userId as storeUserId,
	                                    s.dateCreated as storeDateCreated,
	                                    s.name as storeName,
	                                    s.profileImage as storeProfileImage,
	                                    s.coverImage as storeCoverImage,
	                                    c.name as categoryName,
	                                    c.image as categoryImage
                                    FROM Item i
                                    JOIN Store s
	                                    ON i.storeId = s.id
                                    JOIN Category c
	                                    ON i.categoryId = c.id";

                if (!string.IsNullOrEmpty(categoryIds))
                {
                    var ids = categoryIds.Split(",").Select(id => int.Parse(id)).ToList();
                    var where = "\nWHERE i.categoryId IN ({0})";
                    var formattedIds = string.Join(",", ids);
                    sql += string.Format(where, formattedIds);
                }

                cmd.CommandText = sql;

                DbUtils.AddParameter(cmd, "@categoryId", categoryIds);

                var reader = cmd.ExecuteReader();
                var items = new List<Item>();

                while (reader.Read())
                {
                    var item = new Item()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "name"),
                        CategoryId = DbUtils.GetInt(reader, "categoryId"),
                        StoreId = DbUtils.GetInt(reader, "storeId"),
                        Quantity = DbUtils.GetInt(reader, "quantity"),
                        Description = DbUtils.GetString(reader, "description"),
                        Price = DbUtils.GetInt(reader, "price"),
                        Image = DbUtils.GetString(reader, "image"),
                        Category = new Category()
                        {
                            Id = DbUtils.GetInt(reader, "categoryId"),
                            Name = DbUtils.GetString(reader, "categoryName"),
                            Image = DbUtils.GetString(reader, "categoryImage")
                        },
                        Store = new Store()
                        {
                            Id = DbUtils.GetInt(reader, "storeId"),
                            UserId = DbUtils.GetInt(reader, "storeUserId"),
                            DateCreated = DbUtils.GetDateTime(reader, "storeDateCreated"),
                            Name = DbUtils.GetString(reader, "storeName"),
                            ProfileImage = DbUtils.GetString(reader, "storeProfileImage"),
                            CoverImage = DbUtils.GetString(reader, "storeCoverImage")
                        }
                    };

                    items.Add(item);
                }

                reader.Close();
                return items;
            }
        }
    }

    public Item GetById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
                                        i.id,
                                        i.name,
                                        i.categoryId,
                                        i.storeId,
                                        i.quantity,
                                        i.description,
                                        i.price,
                                        i.image,
	                                    s.userId as storeUserId,
	                                    s.dateCreated as storeDateCreated,
	                                    s.name as storeName,
	                                    s.profileImage as storeProfileImage,
	                                    s.coverImage as storeCoverImage,
	                                    c.name as categoryName,
	                                    c.image as categoryImage
                                    FROM Item i
                                    JOIN Store s
	                                    ON i.storeId = s.id
                                    JOIN Category c
	                                    ON i.categoryId = c.id
                                    WHERE i.id = @id";

                DbUtils.AddParameter(cmd, "@id", id);

                var reader = cmd.ExecuteReader();

                Item item = null;
                if (reader.Read())
                {
                    item = new Item()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "name"),
                        CategoryId = DbUtils.GetInt(reader, "categoryId"),
                        StoreId = DbUtils.GetInt(reader, "storeId"),
                        Quantity = DbUtils.GetInt(reader, "quantity"),
                        Description = DbUtils.GetString(reader, "description"),
                        Price = DbUtils.GetInt(reader, "price"),
                        Image = DbUtils.GetString(reader, "image"),
                        Category = new Category()
                        {
                            Id = DbUtils.GetInt(reader, "categoryId"),
                            Name = DbUtils.GetString(reader, "categoryName"),
                            Image = DbUtils.GetString(reader, "categoryImage")
                        },
                        Store = new Store()
                        {
                            Id = DbUtils.GetInt(reader, "storeId"),
                            UserId = DbUtils.GetInt(reader, "storeUserId"),
                            DateCreated = DbUtils.GetDateTime(reader, "storeDateCreated"),
                            Name = DbUtils.GetString(reader, "storeName"),
                            ProfileImage = DbUtils.GetString(reader, "storeProfileImage"),
                            CoverImage = DbUtils.GetString(reader, "storeCoverImage")
                        }
                    };
                }

                reader.Close();
                return item;
            }
        }
    }

    public List<Item> GetByCategoryId(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
                                        i.id,
                                        i.name,
                                        i.categoryId,
                                        i.storeId,
                                        i.quantity,
                                        i.description,
                                        i.price,
                                        i.image,
	                                    s.userId as storeUserId,
	                                    s.dateCreated as storeDateCreated,
	                                    s.name as storeName,
	                                    s.profileImage as storeProfileImage,
	                                    s.coverImage as storeCoverImage,
	                                    c.name as categoryName,
	                                    c.image as categoryImage
                                    FROM Item i
                                    JOIN Store s
	                                    ON i.storeId = s.id
                                    JOIN Category c
	                                    ON i.categoryId = c.id
                                    WHERE i.categoryId = @categoryId";
                DbUtils.AddParameter(cmd, "@categoryId", id);

                var reader = cmd.ExecuteReader();
                var items = new List<Item>();

                while (reader.Read())
                {
                    var item = new Item()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "name"),
                        CategoryId = DbUtils.GetInt(reader, "categoryId"),
                        StoreId = DbUtils.GetInt(reader, "storeId"),
                        Quantity = DbUtils.GetInt(reader, "quantity"),
                        Description = DbUtils.GetString(reader, "description"),
                        Price = DbUtils.GetInt(reader, "price"),
                        Image = DbUtils.GetString(reader, "image"),
                        Category = new Category()
                        {
                            Id = DbUtils.GetInt(reader, "categoryId"),
                            Name = DbUtils.GetString(reader, "categoryName"),
                            Image = DbUtils.GetString(reader, "categoryImage")
                        },
                        Store = new Store()
                        {
                            Id = DbUtils.GetInt(reader, "storeId"),
                            UserId = DbUtils.GetInt(reader, "storeUserId"),
                            DateCreated = DbUtils.GetDateTime(reader, "storeDateCreated"),
                            Name = DbUtils.GetString(reader, "storeName"),
                            ProfileImage = DbUtils.GetString(reader, "storeProfileImage"),
                            CoverImage = DbUtils.GetString(reader, "storeCoverImage")
                        }
                    };

                    items.Add(item);
                }

                reader.Close();
                return items;
            }
        }
    }

    public List<Item> GetByStoreId(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
                                        i.id,
                                        i.name,
                                        i.categoryId,
                                        i.storeId,
                                        i.quantity,
                                        i.description,
                                        i.price,
                                        i.image,
	                                    s.userId as storeUserId,
	                                    s.dateCreated as storeDateCreated,
	                                    s.name as storeName,
	                                    s.profileImage as storeProfileImage,
	                                    s.coverImage as storeCoverImage,
	                                    c.name as categoryName,
	                                    c.image as categoryImage
                                    FROM Item i
                                    JOIN Store s
	                                    ON i.storeId = s.id
                                    JOIN Category c
	                                    ON i.categoryId = c.id
                                    WHERE i.storeId = @storeId";
                DbUtils.AddParameter(cmd, "@storeId", id);

                var reader = cmd.ExecuteReader();
                var items = new List<Item>();

                while (reader.Read())
                {
                    var item = new Item()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "name"),
                        CategoryId = DbUtils.GetInt(reader, "categoryId"),
                        StoreId = DbUtils.GetInt(reader, "storeId"),
                        Quantity = DbUtils.GetInt(reader, "quantity"),
                        Description = DbUtils.GetString(reader, "description"),
                        Price = DbUtils.GetInt(reader, "price"),
                        Image = DbUtils.GetString(reader, "image"),
                        Category = new Category()
                        {
                            Id = DbUtils.GetInt(reader, "categoryId"),
                            Name = DbUtils.GetString(reader, "categoryName"),
                            Image = DbUtils.GetString(reader, "categoryImage")
                        },
                        Store = new Store()
                        {
                            Id = DbUtils.GetInt(reader, "storeId"),
                            UserId = DbUtils.GetInt(reader, "storeUserId"),
                            DateCreated = DbUtils.GetDateTime(reader, "storeDateCreated"),
                            Name = DbUtils.GetString(reader, "storeName"),
                            ProfileImage = DbUtils.GetString(reader, "storeProfileImage"),
                            CoverImage = DbUtils.GetString(reader, "storeCoverImage")
                        }
                    };

                    items.Add(item);
                }

                reader.Close();
                return items;
            }
        }
    }

    public void Add(Item item)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [Item]
                                        (name,
                                        categoryId,
                                        storeId,
                                        quantity,
                                        description,
                                        price,
                                        image)
                                    OUTPUT INSERTED.ID
                                    VALUES
                                        (@name,
                                        @categoryID,
                                        @storeId,
                                        @quantity,
                                        @description,
                                        @price,
                                        @image)";

                DbUtils.AddParameter(cmd, "@name", item.Name);
                DbUtils.AddParameter(cmd, "@categoryId", item.CategoryId);
                DbUtils.AddParameter(cmd, "@storeId", item.StoreId);
                DbUtils.AddParameter(cmd, "@quantity", item.Quantity);
                DbUtils.AddParameter(cmd, "@description", item.Description);
                DbUtils.AddParameter(cmd, "@price", item.Price);
                DbUtils.AddParameter(cmd, "@image", item.Image);
                item.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void Update(Item item)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"UPDATE [Item]
                                        SET name = @name,
                                            categoryId = @categoryId,
                                            storeId = @storeId,
                                            quantity = @quantity,
                                            description = @description,
                                            price = @price,
                                            image = @image
                                    WHERE id = @id";

                DbUtils.AddParameter(cmd, "@id", item.Id);
                DbUtils.AddParameter(cmd, "@name", item.Name);
                DbUtils.AddParameter(cmd, "@categoryId", item.CategoryId);
                DbUtils.AddParameter(cmd, "@storeId", item.StoreId);
                DbUtils.AddParameter(cmd, "@quantity", item.Quantity);
                DbUtils.AddParameter(cmd, "@description", item.Description);
                DbUtils.AddParameter(cmd, "@price", item.Price);
                DbUtils.AddParameter(cmd, "@image", item.Image);
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
                cmd.CommandText = "DELETE FROM [Item] WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
}

