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
                                                name
                                            FROM [Category]";

                    var categories = new List<Category>();
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        var category = new Category()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name")
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
                                                name
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
                                                (name)
                                            OUTPUT INSERTED.ID
                                            VALUES
                                                (@name)";

                    DbUtils.AddParameter(command, "@name", category.Name);

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
                                                SET name = @name
                                            WHERE id = @id";

                    DbUtils.AddParameter(command, "@id", category.Id);
                    DbUtils.AddParameter(command, "@name", category.Name);

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
