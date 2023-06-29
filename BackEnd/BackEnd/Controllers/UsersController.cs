using AutoMapper;
using BackEnd.DTOs;
using BackEnd.Interfaces;
using BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public IUserRepository _UserRepository { get; }
        public IMapper _Mapper { get; }

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _UserRepository = userRepository;
            _Mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _UserRepository.GetMembersAsync();
            if (users != null && users.Count() == 0)
                return NotFound();
            return Ok(users);
        }

        //[HttpGet("{id}")]
        //public async Task<ActionResult<User>> GetUserById(int id)
        //{
        //    var user = await _DbContext.Users.FindAsync(id);
        //    if (user == null)
        //        return NotFound();
        //    return Ok(user);
        //}

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUserByUsername(string username)
        {
            var user = await _UserRepository.GetMemberByUsernameAsync(username);
            if (user == null)
                return NotFound();
            return Ok(user);
        }
    }
}
