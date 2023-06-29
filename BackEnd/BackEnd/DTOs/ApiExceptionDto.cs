namespace BackEnd.DTOs
{
    public class ApiExceptionDto
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
     
        public ApiExceptionDto(int statusCode, string message, string details)
        {
            StatusCode = statusCode;
            Message = message;
            Details = details;
        }

    }
}
