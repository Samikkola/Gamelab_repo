using gamelab.src.server.Models;

namespace gamelab.Services
{
    /// <summary>
    /// Interface for the ReservationService
    /// </summary>
    public interface IReservationService
    {
        Task<bool> CreateReservationAsync(Reservation reservation);
        Task<List<Reservation>> GetAllReservationsAsync();
    }
}