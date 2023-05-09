using BurnHub.Models;
using BurnHub.Utils;

namespace BurnHub.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        public List<Category> GetAll()
        {
            using (var connection = Connection)
            {
                connection.Open();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = @"SELECT
                                                id,
                                                name,
                                                image
                                            FROM [Category]";

                    var categories = new List<Category>();
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        var category = new Category()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            Image = DbUtils.GetString(reader, "image")
                        };

                        categories.Add(category);
                    }

                    reader.Close();
                    return categories;
                }
            }
        }

        public Category GetById(int id)
        {
            using (var connection = Connection)
            {
                connection.Open();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = @"SELECT
                                                id,
                                                name,
                                                image
                                            FROM [Category]
                                            WHERE id = @id";

                    DbUtils.AddParameter(command, "@id", id);

                    var reader = command.ExecuteReader();

                    Category category = null;
                    if (reader.Read())
                    {
                        category = new Category()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            Image = DbUtils.GetString(reader, "image")
                        };
                    }

                    reader.Close();
                    return category;
                }
            }
        }

        public void Add(Category category)
        {
            using (var connection = Connection)
            {
                connection.Open();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = @"INSERT INTO [Category]
                                                (name,
                                                image)
                                            OUTPUT INSERTED.ID
                                            VALUES
                                                (@name,
                                                 @image)";

                    DbUtils.AddParameter(command, "@name", category.Name);
                    DbUtils.AddParameter(command, "@image", category.Image);

                    category.Id = (int)command.ExecuteScalar();
                }
            }
        }

        public void Update(Category category)
        {
            using (var connection = Connection)
            {
                connection.Open();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = @"UPDATE [Category]
                                                SET name = @name,
                                                    image = @image
                                            WHERE id = @id";

                    DbUtils.AddParameter(command, "@id", category.Id);
                    DbUtils.AddParameter(command, "@name", category.Name);
                    DbUtils.AddParameter(command, "@image", category.Image);

                    command.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var connection = Connection)
            {
                connection.Open();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "DELETE FROM [Category] WHERE id = @id";
                    DbUtils.AddParameter(command, "@id", id);
                    command.ExecuteNonQuery();
                }
            }
        }
    }
}
