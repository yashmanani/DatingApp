using BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController : ControllerBase
    {
        public DataContext _DbContext { get; }
        public BuggyController(DataContext dataContext)
        {
            _DbContext = dataContext;
        }

        [Authorize]
        [HttpGet("auth")]
        public IActionResult GetSecret()
        {
            return Ok("secret text");
        }

        [HttpGet("not-found")]
        public IActionResult GetNotFound()
        {
            var thing = _DbContext.Users.Find(-1);
            if (thing == null)
                return NotFound();
            return Ok(thing);
        }

        [HttpGet("server-error")]
        public IActionResult GetServerError()
        {
            var thing = _DbContext.Users.Find(-1);
            var thingToReturn = thing.ToString();
            return Ok(thingToReturn);
        }

        [HttpGet("bad-request")]
        public IActionResult GetBadRequest()
        {
            return BadRequest("not a good request");
        }
    }
}
