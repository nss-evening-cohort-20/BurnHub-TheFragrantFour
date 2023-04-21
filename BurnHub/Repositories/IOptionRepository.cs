using BurnHub.Models;

namespace BurnHub.Repositories
{
    public interface IOptionRepository
    {
        List<Option> GetOptions();
        Option GetOptionById(int id);
        void AddOption(Option option);
        void UpdateOption(Option option);
        void DeleteOption(int id);

    }
}