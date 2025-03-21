using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using gamelab.src.server.Models;
using Microsoft.CodeAnalysis.Differencing;

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
        public async Task<IActionResult> GetReservationsByUserIdAsync(int id)
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

        /// <summary>
        /// HttpDelete metodi joka poistaa varauksen tietokannasta
        /// </summary>
        /// <param name="id">Varauksen id</param>
        /// <returns>Poistettu varaus</returns>
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteReservationByIdAsync(int id)
        {
            try
            {
                var reservationToDelete = await _context.Reservations.FindAsync(id);

                if (reservationToDelete != null)
                {
                    _context.Reservations.Remove(reservationToDelete);
                    await _context.SaveChangesAsync();
                    return Ok(reservationToDelete);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditReservationAsync(int id, EditReservation reservationDto)
        {
            try
            {
                var reservationToUpdate = await _context.Reservations.FindAsync(id);

                if (reservationToUpdate != null)
                {
                    
                    await _context.SaveChangesAsync();
                    return Ok(reservationToUpdate);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Dto luokka varauksen muokkaamiselle
        /// </summary>
        public class EditReservation
        {
            public int? ComputerId { get; set; }
            public ReservationType Type { get; set; } //Varauksen tyyppi
            public DateTimeOffset StartDate { get; set; }
            public DateTimeOffset EndDate { get; set; }
        }
    }
}