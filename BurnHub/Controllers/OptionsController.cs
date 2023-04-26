using BurnHub.Repositories;
using BurnHub.Models;
using Microsoft.AspNetCore.Mvc;

namespace BurnHub.Controllers;

[Route("[controller]")]
[ApiController]
public class OptionsController : Controller
{
    private readonly IOptionRepository _optionRepository;

    public OptionsController(IOptionRepository optionRepository)
    {
        _optionRepository = optionRepository;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_optionRepository.GetAll());
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var option = _optionRepository.GetById(id);

        if (option == null)
        {
            return NotFound();
        }
        return Ok(option);
    }

    [HttpPost]
    public IActionResult Post(Option option)
    {
        _optionRepository.Add(option);
        return Created("/api/option/" + option.Id, option);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, Option option)
    {
        if (id != option.Id)
        {
            return BadRequest();
        }

        _optionRepository.Update(option);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _optionRepository.Delete(id);
        return NoContent();
    }
}