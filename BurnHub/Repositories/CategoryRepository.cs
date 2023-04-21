using BurnHub.Models;

namespace BurnHub.Repositories
{
    public class CategoryRepository : BaseRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        public List<Category> GetAll()
        {
            using (var connection = Connection)
            {
                connection.Open();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "";

                    var categories = new List<Category>();
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        var category = new Category()
                        {

                        };

                        categories.Add(category);
                    }

                    reader.Close();

                    return categories;
                }
            }
        }

        public List<Category> GetByCategoryId(int id) 
        {
            using (var connection = Connection) 
            {
                connection.Open();
                using (var command = connection.CreateCommand()) 
                {
                    command.CommandText = "";

                    command.Parameters.AddWithValue
                }
            }
        }
    }
}
