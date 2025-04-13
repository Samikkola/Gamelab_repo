using gamelab.Services;
using gamelab.src.server.Models;


namespace gamelab.src.server.Services
{
    /// <summary>
    /// Logiikka varauksien hallintaan
    /// Toteuttaa IReservationService rajapinnan
    /// </summary>
    public class ReservationService : IReservationService
    {
        
        private readonly IReservationRepository _reservationRepository;

        //Konsruktori
        public ReservationService(IReservationRepository reservationRepository)
        {
            _reservationRepository = reservationRepository;
        }

        /// <summary>
        /// Hakee kaikki varaukset tietokannasta.
        /// </summary>
        /// <returns>List<Reservation> joka sis lt kaikki varaukset</returns>
        public async Task<List<Reservation>> GetAllReservationsAsync()
        {
            return await _reservationRepository.GetAllAsync();
        }

        /// <summary>
        /// Luo uuden varauksen tietokantaan, jos ajankohta on vapaana.
        /// </summary>
        /// <param name="reservation">Varauksen tiedot </param>
        /// <returns>True jos varaus onnistui, muuten false</returns>
        public async Task<bool> CreateReservationAsync(Reservation reservation)
        {
            // Tarkistetaan onko ajankohta jo varattu
            bool isAvailable = await _reservationRepository.IsTimeSlotAvailableAsync(reservation);
            if (!isAvailable)
            {
                return false; // Palautetaan false, jos ajankohta on jo varattu
            }

            return await _reservationRepository.AddAsync(reservation);
        }
    }


}