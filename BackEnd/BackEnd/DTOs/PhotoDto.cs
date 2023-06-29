using System.ComponentModel.DataAnnotations;

namespace BackEnd.DTOs
{
    public class PhotoDto
    {
        public int PhotoId { get; set; }
        [Required]
        public string Url { get; set; }
        public bool IsMain { get; set; }
    }
}