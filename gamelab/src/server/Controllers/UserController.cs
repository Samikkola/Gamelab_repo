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
                //Etsitään muokattava varaus tietokannasta
                Reservation? reservationToUpdate = await _context.Reservations.FindAsync(id);
                //Tarkistetaan löytyykö varaus
                if (reservationToUpdate != null)
                {
                    //Päivitetään varauksen tiedo
                    //TODO tarvitaanko tähän tarkistus että käyttäjä on muokannut kyseistä kohtaa?
                    reservationToUpdate.ComputerId = reservationDto.ComputerId;
                    reservationToUpdate.StartTime = reservationDto.StartDate;
                    reservationToUpdate.EndTime = reservationDto.EndDate;

                    await _context.SaveChangesAsync();
                    return Ok(reservationToUpdate);
                }
                else
                {
                    return NotFound(new { message = "Reservation not found" });
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// HTTP POST -metodi uuden käyttäjän luonnille
        /// Vastaanottaa käyttäjänimen ja sähköpostin, generoi kertakäyttökoodin ja tallentaa tiedot tietokantaan
        /// <param name="dto">Uuden käyttäjän tiedot</param>
        [HttpPost]
        public async Task<IActionResult> CreateUserAsync([FromBody] CreateUserDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Generoidaan 8-merkkinen kertakäyttökoodi
            var oneTimeCode = Guid.NewGuid().ToString("N").Substring(0, 8);

            var user = new UserModel
            {
                Username = dto.Username,
                Email = dto.Email,
                OneTimeCode = oneTimeCode,
                Role = UserRole.Student
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { user.Id, user.Username, user.Email, user.OneTimeCode });
        }

        /// <summary>
        /// HttpPost metodi joka lähettää jo rekisteröityneelle käyttäjälle kertakäyttökoodin 
        /// Käyttäjä voi käyttää koodia kirjautuakseen sisään
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpPost("request-code")]
        public async Task<IActionResult> RequestCodeAsync([FromBody] string email)
        {
            if (string.IsNullOrEmpty(email))
                return BadRequest("Sähköposti puuttuu.");

            // Haetaan käyttäjä
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null) return NotFound("Käyttäjää ei löytynyt.");

            // Generoidaan uusi kertakäyttökoodi
            var oneTimeCode = Guid.NewGuid().ToString("N").Substring(0, 8);

            // Päivitetään käyttäjän kertakäyttökoodi
            user.OneTimeCode = oneTimeCode;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok(new { user.Id, user.Username, user.Email, user.OneTimeCode });

        }


        /// <summary>
        /// DTO luokka uuden käyttäjän luonnille
        /// </summary>
        public class CreateUserDto
        {
            public required string Username { get; set; }
            public required string Email { get; set; }
        }


        /// <summary>
        /// Dto luokka varauksen muokkaamiselle
        /// </summary>
        public class EditReservation
        {
            public int ComputerId { get; set; }
            public DateTimeOffset StartDate { get; set; }
            public DateTimeOffset EndDate { get; set; }
        }

      
    }
}