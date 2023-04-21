using BurnHub.Models;
using BurnHub.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BurnHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IStoreRepository _storeRepo;

        public StoreController(IStoreRepository storeRepo)
        {
            _storeRepo = storeRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_storeRepo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var store = _storeRepo.GetById(id);
            if (store == null)
            {
                return NotFound();
            }
            return Ok(store);
        }

        [HttpPost]
        public IActionResult Post(Store store)
        {
            _storeRepo.Add(store);
            return CreatedAtAction("Get", new { id = store.Id }, store);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Store store)
        {
            if (id != store.Id)
            {
                return BadRequest();
            }

            _storeRepo.Update(store);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _storeRepo.Delete(id);
            return NoContent();
        }
    }
}
