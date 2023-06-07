using BackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public DataContext _DbContext { get; }
        public UsersController(DataContext dataContext)
        {
            _DbContext = dataContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _DbContext.Users.ToListAsync();
            if (users != null && users.Count == 0)
                return NotFound();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _DbContext.Users.FindAsync(id);
            if (user == null)
                return NotFound();
            return Ok(user);
        }
    }
}
