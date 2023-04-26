using BurnHub.Models;

namespace BurnHub.Repositories
{
    public interface IOptionRepository
    {
        List<Option> GetAll();
        Option GetById(int id);
        void Add(Option option);
        void Update(Option option);
        void Delete(int id);

    }
}