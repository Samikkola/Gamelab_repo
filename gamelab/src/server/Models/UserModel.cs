using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace gamelab.src.server.Models
{

    public enum UserRole
    {
        Admin,
        Student
    }

    [Table("User")]
    public class UserModel
    {
        [Key]
        public int Id { get; set; }

        [Required] 
        public string? Username { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        public ICollection<Reservation>? Reservation { get; set; } = new List<Reservation>();
        
        [Required]
        public UserRole Role { get; set; } = UserRole.Student; //Oletuksena oppilas
    }   
}