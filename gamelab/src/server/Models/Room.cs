
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gamelab.src.server.Models
{

    [Table("Room")]
    public class Room
    {
        [Key]
        public int Id { get; set; }

        public bool isAvailable { get; set; } = true; //Onko huone varattavissa

        public ICollection<Computer>? Computers { get; set; }  //Huoneessa olevat tietokoneet

    }
}
