using BackEnd.Extensions;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [StringLength(50)]
        public required string UserName { get; set; }
        [MaxLength(250)]
        public byte[] PasswordHash { get; set; }
        [MaxLength(350)]
        public byte[] PasswordSalt { get; set; }
        public DateOnly DateOfBirth { get; set; }
        [MaxLength(50)]
        public string? KnownAs { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        [MaxLength(10)]
        public string Gender { get; set; }
        [MaxLength(500)]
        public string? Introduction { get; set; }
        [MaxLength(500)]
        public string? LookingFor { get; set; }
        [MaxLength(500)]
        public string? Interests { get; set; }
        [MaxLength(100)]
        public string City { get; set; }
        [MaxLength(100)]
        public string Country { get; set; }
        public List<Photo> Photos { get; set; } = new();
        //public int GetAge()
        //{
        //    return DateOfBirth.CalculateAge();
        //}
    }
}
