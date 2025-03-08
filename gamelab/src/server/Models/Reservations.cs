using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gamelab.src.server.Models
{
    [Table("Reservations")]
    public class Reservations
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required UserModel User { get; set; } // Navigointi ominaisuus, tämä ilmeisesti tarvitaan
       
        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }

        [Required]
        public DateTimeOffset StartDate { get; set; }

        [Required]
        public DateTimeOffset EndDate { get; set; }

        // Miten tallennetaan tila tai laite joka on varattu?
        // public int DeviceId { get; set; } ?

    }
}
