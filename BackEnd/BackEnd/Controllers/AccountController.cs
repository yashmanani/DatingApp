using BackEnd.DTOs;
using BackEnd.Interfaces;
using BackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        public DataContext _DbContext { get; }
        public ITokenService _TokenService { get; }
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _DbContext = context;
            _TokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username))
            {
                return BadRequest("Username already exist");
            }
            using var hmac = new HMACSHA512();

            var user = new User
            {
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _DbContext.Add(user);
            await _DbContext.SaveChangesAsync();

            var userDto = new UserDto
            {
                Username = user.UserName,
                Token = _TokenService.CreateToken(user)
            };

            return Ok(userDto);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _DbContext.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username);

            if (user == null)
                return Unauthorized();

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            if (!computedHash.SequenceEqual(user.PasswordHash))
                return Unauthorized();

            var userDto = new UserDto
            {
                Username = user.UserName,
                Token = _TokenService.CreateToken(user)
            };

            return Ok(userDto);
        }

        private async Task<bool> UserExists(string username)
        {
            return await _DbContext.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}
