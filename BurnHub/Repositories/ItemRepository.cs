﻿using BurnHub.Models;
using BurnHub.Utils;
using Microsoft.AspNetCore.Http.Features;

namespace BurnHub.Repositories;

public class ItemRepository : BaseRepository, IItemRepository
{
    public ItemRepository(IConfiguration configuration) : base(configuration) { }

    public List<Item> GetAll()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
                                        id,
                                        name,
                                        categoryId,
                                        storeId,
                                        quantity,
                                        description,
                                        price,
                                        image
                                    FROM [Item]";

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
                                        id,
                                        name,
                                        categoryId,
                                        storeId,
                                        quantity,
                                        description,
                                        price,
                                        image
                                    FROM [Item]
                                    WHERE id = @id";

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
                    };
                }

                reader.Close();
                return item;
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
                                            image = @image,
                                    WHERE id = @id";

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

