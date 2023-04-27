using BurnHub.Models;

namespace BurnHub.Repositories
{
    public interface IFavoriteRepository
    {
        void Add(Favorite favorite);
        void Delete(int id);
        Item GetFavoritesByUserId(int id);
    }
}