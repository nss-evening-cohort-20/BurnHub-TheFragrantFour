﻿using BurnHub.Models;
using BurnHub.Repositories;
using Microsoft.AspNetCore.Mvc;
namespace BurnHub.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemRepository _itemRepo;

        public ItemsController(IItemRepository itemRepo)
        {
            _itemRepo = itemRepo;
        }

        [HttpGet("search")]
        public IActionResult Search(string q)
        {
            return Ok(_itemRepo.Search(q));
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_itemRepo.GetAll());
        }

        [HttpGet("paged")]
        public IActionResult GetPagedItems(int pageNumber, int pageSize)
        {
            return Ok(_itemRepo.GetPagedItems(pageNumber, pageSize));
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
            return Ok(_itemRepo.GetByStoreId(id));
        }

        [HttpGet("category/{id}")]
        public IActionResult GetByCategoryId(int id)
        {
            return Ok(_itemRepo.GetByCategoryId(id));
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