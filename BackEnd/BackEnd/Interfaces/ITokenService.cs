using BackEnd.Models;

namespace BackEnd.Interfaces
{
    public interface ITokenService
    {
        public string CreateToken(User user);
    }
}
