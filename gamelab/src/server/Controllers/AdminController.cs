using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using gamelab.src.server.Models;

namespace gamelab.src.server.Controllers
{
    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Hakee kaikki varaukset ja palauttaa adminille käyttäjätiedot
        /// </summary>
        [HttpGet("reservations")]
        public async Task<IActionResult> GetAllReservationsForAdmin()
        {
            var reservations = await _context.Reservations
                .Include(r => r.User)
                .ToListAsync();

            var dto = reservations.Select(r => new ReservationDto
            {
                Id = r.Id,
                Description = r.Description ?? "",
                StartTime = r.StartTime,
                EndTime = r.EndTime,
                Type = r.Type.ToString(),
                Username = r.User?.Username,
                Email = r.User?.Email
            });

            return Ok(dto);
        }
    }
}
