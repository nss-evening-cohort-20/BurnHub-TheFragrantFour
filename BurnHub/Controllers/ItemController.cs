using BurnHub.Models;
using BurnHub.Repositories;
using Microsoft.AspNetCore.Mvc;
namespace BurnHub.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemRepository _itemRepo;

        public ItemController(IItemRepository itemRepo)
        {
            _itemRepo = itemRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_itemRepo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var item = _itemRepo.GetById(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpGet("store/{id}")]
        public IActionResult GetByStoreId(int id)
        {
            var item = _itemRepo.GetByStoreId(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpGet("category/{id}")]
        public IActionResult GetByCategoryId(int id)
        {
            var item = _itemRepo.GetByCategoryId(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        public IActionResult Post(Item item)
        {
            _itemRepo.Add(item);
            return CreatedAtAction("Get", new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Item item) 
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _itemRepo.Add(item);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete (int id)
        {
            _itemRepo.Delete(id);
            return NoContent();
        }

    }
}
