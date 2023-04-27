using BurnHub.Models;
using BurnHub.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BurnHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly IFavoriteRepository _favoriteRepo;

        public FavoritesController(IFavoriteRepository favoriteRepo)
        {
            _favoriteRepo = favoriteRepo;
        }

        [HttpGet("user/{id}")]
        public IActionResult GetByUserId(int id)
        {
            var fav = _favoriteRepo.GetFavoritesByUserId(id);
            if (fav == null)
            {
                return NotFound();
            }
            return Ok(fav);
        }

        [HttpPost]
        public IActionResult Post(Favorite favorite)
        {
            _favoriteRepo.Add(favorite);
            return CreatedAtAction("Get", new { id = favorite.Id }, favorite);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete (int id)
        {
            _favoriteRepo.Delete(id);
            return NoContent();
        }
    }
}
