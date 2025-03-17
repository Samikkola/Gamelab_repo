using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace gamelab.src.server.Controllers
{

    /// <summary>
    /// Api kontrolleri käyttäjille
    /// Määritellään reitti /api/user
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        /// <summary>
        /// Konstruktori UserControllerille joka saa parametrina AppDbContextin 
        /// </summary>
        /// <param name="context"></param>
        public UserController(AppDbContext context)
        {
            _context = context;
        }


        /// <summary>
        /// HttpGet metodi joka hakee käyttäjän varaukset tietokannasta
        /// </summary>
        /// <param name="id">Käyttäjän id</param>
        /// <returns>Käyttäjän varaukset</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetReservationsByUserId(int id)
        {
            try
            {
                var reservations = await _context.Reservations
                .Where(r => r.UserId == id)
                .ToListAsync();

                if (reservations == null)
                {
                    return NotFound();
                }

                return Ok(reservations);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}