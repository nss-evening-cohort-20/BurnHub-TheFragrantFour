using BurnHub.Models;

namespace BurnHub.Repositories
{
    public interface IUserRepository
    {
        List<User> GetAll();
        User GetById(int id);
        User GetByFirebaseId(string uid);
        void Add(User user);
        void Update(User user);
        void Delete(int id);
    }
}