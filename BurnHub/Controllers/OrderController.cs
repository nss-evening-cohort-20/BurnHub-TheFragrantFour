using BurnHub.Models;
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

        [HttpGet("open/user/{id}")]
        public IActionResult GetOpenOrderByUserId(int id)
        {
            var order = _orderRepo.GetOpenOrderByUserId(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [HttpGet("closed/user/{id}")]
        public IActionResult GetClosedOrdersByUserId(int id)
        {
            return Ok(_orderRepo.GetClosedOrdersByUserId(id));
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


        
    }
}
