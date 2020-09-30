using Freight.API.BAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Freight.API.Controllers
{
    [Route("identity")]
    [Authorize]
    public class IdentityController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(from c in User.Claims select new { c.Type, c.Value });
        }

        [HttpGet, Route("test")]
        public IActionResult Test()
        {
            TestBAL test = new TestBAL();
            return Ok(test.getValue());
        }
    }
}
