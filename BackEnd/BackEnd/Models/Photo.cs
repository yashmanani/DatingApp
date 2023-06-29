using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Models
{
    public class Photo
    {
        [Key]
        public int PhotoId { get; set; }
        [Required]
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string? PublicId { get; set; }
        [Required]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
