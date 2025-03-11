

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using gamelab.src.server.Models;

[Table("Computer")]
public class Computer
{
    [Key]
    public int Id { get; set; }

    //Tarvitaanko yhteys huoneeseen?
    [Required]
    [ForeignKey("RoomId")]
    public int RoomId { get; set; }
    
    public Room? Room { get; set; }

    [Required]
    [StringLength(20)]
    public string Identifier { get; set; } = ""; //Tietokoneen tunniste esim. PC-1, PC-2...

    [Required]
    public bool isAvailable { get; set; } = true;

}