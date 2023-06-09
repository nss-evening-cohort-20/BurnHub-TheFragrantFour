﻿using BurnHub.Models;
using BurnHub.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;

namespace BurnHub.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderItemsController : ControllerBase
	{
        private readonly IOrderItemRepository _orderItemRepo;

        public OrderItemsController(IOrderItemRepository orderItemRepo)
        {
            _orderItemRepo = orderItemRepo;
        }
        [HttpGet("store/{id}")]
        public IActionResult GetAllCompletedByStoreId(int id)
        {
            var orderItem = _orderItemRepo.GetAllCompletedByStoreId(id);
            if (orderItem == null)
            {
                return NotFound();
            }
            return Ok(orderItem);
        }
        [HttpPost("addOrderItem")]
        public IActionResult PostOrderItem(OrderItem orderItem)
        {
            _orderItemRepo.AddOrderItem(orderItem);
            return Created("/OrderItems/" + orderItem.Id, orderItem);
        }

        [HttpPut("orderItem/{id}")]
        public IActionResult PutOrderItem(int id, OrderItem orderItem)
        {
            if (id != orderItem.Id)
            {
                return BadRequest();
            }

            _orderItemRepo.UpdateOrderItem(orderItem);
            return NoContent();
        }

        [HttpDelete("orderItem/{id}")]
        public IActionResult DeleteOrderItem(int id)
        {
            _orderItemRepo.DeleteOrderItem(id);
            return NoContent();
        }
    }
}

