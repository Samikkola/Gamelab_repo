using gamelab.src.server.Models;

public interface IReservationRepository
{
    Task<List<Reservation>> GetAllAsync();
    Task<bool> AddAsync(Reservation reservation);
    Task<bool> IsTimeSlotAvailableAsync(Reservation reservation);
}