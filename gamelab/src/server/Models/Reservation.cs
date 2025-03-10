using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gamelab.src.server.Models
{
    [Table("Reservation")]
    public class Reservation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required UserModel User { get; set; } // Navigointi ominaisuus, tämä ilmeisesti tarvitaan
       
        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }

        public Computer? Computer { get; set; } 

        public bool IsRoomReservation { get; set; } = false; // Voidaan määrittää huonevaraus, jolloin ykisttäistä tietokonetta ei voida varata

        [Required]
        public DateTimeOffset StartDate { get; set; }

        [Required]
        public DateTimeOffset EndDate { get; set; }


    }
}
