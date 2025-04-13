using gamelab.Services;
using gamelab.src.server.Models;
using Microsoft.AspNetCore.Mvc;


namespace gamelab.src.server.Controllers
{
    /// <summary>
    /// Api kontrolleri varauksille
    /// Määritellään reitti /api/reservation
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : ControllerBase
    {

        private readonly IReservationService _reservationService;

        public ReservationController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        //Hakee kaikki varaukset
        [HttpGet]
        public async Task<IActionResult> GetAllReservationsAsync()
        {
            var reservations = await _reservationService.GetAllReservationsAsync();
            return Ok(reservations);
        }


        //Luo varauksen 
        [HttpPost]
        public async Task<IActionResult> CreateReservationAsync([FromBody] Reservation reservation)
        {
            if (reservation == null)
            {
                return BadRequest("Invalid reservation data.");
            }

            bool result = await _reservationService.CreateReservationAsync(reservation);
            if (!result)
            {
                return BadRequest("The selected time slot is already booked.");
            }

            return Ok("Reservation created successfully.");
        }
    }
}
