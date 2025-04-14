namespace gamelab.src.server.Models
{
    public class ReservationDto
    {
        public int Id { get; set; }
        public string Description { get; set; } = "";
        public DateTimeOffset StartTime { get; set; }
        public DateTimeOffset EndTime { get; set; }
        public string Type { get; set; } = "";

        public string? Username { get; set; }
        public string? Email { get; set; }
    }
}
