using gamelab.src.server;
using gamelab.src.server.Models;
using Microsoft.EntityFrameworkCore;


/// <summary>
/// Luokka joka vastaa varauksien hallinnasta tietokannassa.
/// Toteuttaa IReservationRepository rajapinnan
/// </summary>
public class ReservationRepository : IReservationRepository
{
    private readonly AppDbContext _context;

    public ReservationRepository(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Hakee kaikki varaukset tietokannasta.
    /// </summary>
    /// <returns>List of Reservations</returns>
    public async Task<List<Reservation>> GetAllAsync()
    {
        return await _context.Reservations.ToListAsync();
    }


    /// <summary>
    /// Luo uuden varauksen tietokantaan
    /// </summary>
    public async Task<bool> AddAsync(Reservation reservation)
    {
        _context.Reservations.Add(reservation);
        return await _context.SaveChangesAsync() > 0;
    }

    /// <summary>
    /// Tarkistaa onko varausaika vapaa
    /// </summary>
    /// <param name="reservation"></param>
    /// <returns>True jos varaus onnistui, muuten false</returns>
    public async Task<bool> IsTimeSlotAvailableAsync(Reservation reservation)
    {
        return !await _context.Reservations.AnyAsync(r =>
            r.RoomId == reservation.RoomId &&
            r.StartTime < reservation.EndTime &&
            r.EndTime > reservation.StartTime);
    }
}
