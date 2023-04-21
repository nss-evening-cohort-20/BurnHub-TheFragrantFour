using Microsoft.Data.SqlClient;

namespace BurnHub.Utils;

public static class DbUtils
{
    public static string GetString(SqlDataReader reader, string column)
    {
        var ordinal = reader.GetOrdinal(column);
        if (reader.IsDBNull(ordinal))
        {
            return null;
        }

        return reader.GetString(ordinal);
    }

    public static int GetInt(SqlDataReader reader, string column)
    {
        return reader.GetInt32(reader.GetOrdinal(column));
    }

    public static bool GetBoolean(SqlDataReader reader, string column)
    {
        return reader.GetBoolean(reader.GetOrdinal(column));
    }

    public static DateTime GetDateTime(SqlDataReader reader, string column)
    {
        return reader.GetDateTime(reader.GetOrdinal(column));
    }

    public static int? GetNullableInt(SqlDataReader reader, string column)
    {
        var ordinal = reader.GetOrdinal(column);
        if (reader.IsDBNull(ordinal))
        {
            return null;
        }

        return reader.GetInt32(ordinal);
    }

    public static DateTime? GetNullableDateTime(SqlDataReader reader, string column)
    {
        var ordinal = reader.GetOrdinal(column);
        if (reader.IsDBNull(ordinal))
        {
            return null;
        }

        return reader.GetDateTime(ordinal);
    }

    public static bool IsDbNull(SqlDataReader reader, string column)
    {
        return reader.IsDBNull(reader.GetOrdinal(column));
    }

    public static bool IsNotDbNull(SqlDataReader reader, string column)
    {
        return !IsDbNull(reader, column);
    }

    public static void AddParameter(SqlCommand cmd, string name, object value)
    {
        if (value == null)
        {
            cmd.Parameters.AddWithValue(name, DBNull.Value);
        }
        else
        {
            cmd.Parameters.AddWithValue(name, value);
        }
    }
}
