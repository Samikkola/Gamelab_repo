using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace gamelab.src.server.Models
{
    /// <summary>
    /// Malli User-Taululle
    /// </summary>
    [Table("Users")]
    public class UserModel
    {
        [Key]
        public int Id { get; set; }
        [Required] 
        public string? Username { get; set; }
        [Required]
        public string? Email { get; set; }
        public List<String>? Reservations { get; set; }
    }   
}