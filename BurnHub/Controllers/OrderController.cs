﻿using BurnHub.Models;
using BurnHub.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BurnHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepo;

        public OrderController(IOrderRepository orderRepo)
        {
            _orderRepo = orderRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_orderRepo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var order = _orderRepo.GetById(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [HttpGet("user/{id}")]
        public IActionResult GetByUserId(int id)
        {
            var order = _orderRepo.GetByUserId(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [HttpPost]
        public IActionResult Post(OrderBasic order)
        {
            _orderRepo.Add(order);
            return CreatedAtAction("Get", new { id = order.Id }, order);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, OrderBasic order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _orderRepo.Update(order);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _orderRepo.Delete(id);
            return NoContent();
        }


        // ---- ORDER ITEM ----

        [HttpPost("addOrderItem")]
        public IActionResult PostOrderItem(OrderItem orderItem)
        {
            _orderRepo.AddOrderItem(orderItem);
            return CreatedAtAction("Get", new { id = orderItem.Id }, orderItem);
        }

        [HttpPut("orderItem/{id}")]
        public IActionResult PutOrderItem(int id, OrderItem orderItem)
        {
            if (id != orderItem.Id)
            {
                return BadRequest();
            }

            _orderRepo.UpdateOrderItem(orderItem);
            return NoContent();
        }

        [HttpDelete("orderItem/{id}")]
        public IActionResult DeleteOrderItem(int id)
        {
            _orderRepo.DeleteOrderItem(id);
            return NoContent();
        }
    }
}
