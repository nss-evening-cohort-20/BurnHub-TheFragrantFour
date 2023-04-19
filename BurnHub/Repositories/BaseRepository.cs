using Microsoft.Data.SqlClient;

namespace BurnHub.Repositories;

public abstract class BaseRepository
{
    private readonly string _connectionString;

    public BaseRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    protected SqlConnection Connection
    {
        get
        {
            return new SqlConnection(_connectionString);
        }
    }
}