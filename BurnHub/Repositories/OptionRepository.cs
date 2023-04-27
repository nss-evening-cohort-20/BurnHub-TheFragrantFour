using BurnHub.Models;
using BurnHub.Utils;

namespace BurnHub.Repositories;

public class OptionRepository : BaseRepository, IOptionRepository
{
    public OptionRepository(IConfiguration configuration) : base(configuration) { }

    public List<Option> GetAll()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                select id,
	                   attribute
                from [Option]";

                var reader = cmd.ExecuteReader();

                List<Option> options = new List<Option>();

                while (reader.Read())
                {
                    Option option = new Option
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Attribute = DbUtils.GetString(reader, "attribute")
                    };
                    options.Add(option);
                }

                reader.Close();

                return options;
            }
        }
    }

    public Option GetById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                select id,
	                   attribute
                from [Option]
                where id = @id";

                DbUtils.AddParameter(cmd, "@id", id);

                var reader = cmd.ExecuteReader();

                Option option = null;

                if (reader.Read())
                {
                    option = new Option()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Attribute = DbUtils.GetString(reader, "attribute")
                    };
                }

                reader.Close();

                return option;

            }
        }
    }

    public void Add(Option option)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                INSERT INTO [Option]
		            (attribute)
	            OUTPUT INSERTED.ID
	            VALUES
		            (@attribute)";

                DbUtils.AddParameter(cmd, "@attribute", option.Attribute);

                option.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void Update(Option option)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                UPDATE [Option]
	            SET attribute = @attribute
	            WHERE id = @id";

                DbUtils.AddParameter(cmd, "@id", option.Id);
                DbUtils.AddParameter(cmd, "@attribute", option.Attribute);

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
                cmd.CommandText = "DELETE FROM [Option] WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
}
