using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace gamelab.src.server.Models
{

    public enum ReservationType
    {
        Computer, //Varaus yksittäiselle tietokoneelle
        Room //Varaus huoneelle
    }

    [Table("Reservation")]
    public class Reservation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }
        public UserModel? User { get; set; } // Navigointi ominaisuus, tämä ilmeisesti on hyvä olla


        public int? ComputerId { get; set; }
        [ForeignKey("Computer")]
        public Computer? Computer { get; set; }//Navigointi ominaisuus, tämä ilmeisesti on hyvä olla
        public int? RoomId { get; set; }
        [ForeignKey("Room")]
        public Room? Room { get; set; }//Navigointi ominaisuus, tämä ilmeisesti on hyvä olla


        [Required]
        public ReservationType Type { get; set; } //Varauksen tyyppi


        [Required]
        public DateTimeOffset StartDate { get; set; }
        [Required]
        public DateTimeOffset EndDate { get; set; }

    }
}
