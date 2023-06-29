using BackEnd.Models;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.DTOs
{
    public class MemberDto
    {
        public int UserId { get; set; }
        [StringLength(50)]
        public required string UserName { get; set; }
        public string PhotoUrl { get; set; }
        public int Age { get; set; }
        [MaxLength(50)]
        public string? KnownAs { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime LastActive { get; set; }
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
        public List<PhotoDto> Photos { get; set; }
    }
}
