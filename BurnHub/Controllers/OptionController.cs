using BurnHub.Repositories;
using BurnHub.Models;
using Microsoft.AspNetCore.Mvc;

namespace BurnHub.Controllers;

[Route("api/controller")]
[ApiController]
public class OptionController : Controller
{
    private readonly IOptionRepository _optionRepository;

    public OptionController(IOptionRepository optionRepository)
    {
        _optionRepository = optionRepository;
    }

    [HttpGet]
    public IActionResult GetOptions()
    {
        return Ok(_optionRepository.GetOptions());
    }

    [HttpGet("{id}")]
    public IActionResult GetOptionById(int id)
    {
        var option = _optionRepository.GetOptionById(id);

        if (option == null)
        {
            return NotFound();
        }
        return Ok(option);
    }

    [HttpPost]
    public IActionResult AddOption(Option option)
    {
        _optionRepository.AddOption(option);
        return CreatedAtAction("/api/option" + option.Id, option);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateOption(int id, Option option)
    {
        if (id != option.Id)
        {
            return BadRequest();
        }

        _optionRepository.UpdateOption(option);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteOption(int id)
    {
        _optionRepository.DeleteOption(id);
        return NoContent();
    }
}