using System.ComponentModel.DataAnnotations;

namespace BackEnd.Models
{
    public class AppUser
    {
        [Key]
        public int UserId { get; set; }
        [StringLength(50)]
        public required string UserName { get; set; }
    }
}
