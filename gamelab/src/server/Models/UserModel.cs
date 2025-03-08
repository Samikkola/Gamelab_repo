using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace gamelab.src.server.Models
{
    [Table("Users")]
    public class UserModel
    {
        [Key]
        public int Id { get; set; }
        [Required] 
        public string? Username { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public ICollection<Reservations>? Reservations { get; set; }
        [Required]
        public bool IsAdmin { get; set; }
    }   
}