using Freight.API.BAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Linq;

namespace Freight.API.Controllers
{
    [Route("identity")]
    [Authorize]
    public class IdentityController : ControllerBase
    {
        private TestBAL _bal;

        public IdentityController(IOptions<Common.Configuration.Connection> connection, IOptions<Common.Configuration.Setting> settings)
        {
            _bal = new BAL.TestBAL(connection.Value, settings.Value);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(from c in User.Claims select new { c.Type, c.Value });
        }

        [HttpGet, Route("test")]
        public IActionResult Test()
        {
            return Ok(_bal.getValue());
        }
    }
}
