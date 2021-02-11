using Freight.API.Auth;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Freight.API.Controllers
{
    /// <summary>
    /// Identity Controller
    /// </summary>
    [Route("identity")]
    public class IdentityController : AuthorizationControllerBase
    {
        /// <summary>
        /// Get all Claims for that User
        /// </summary>
        /// <returns>Json Value of the user claims</returns>
        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(from c in User.Claims select new { c.Type, c.Value });
        }
    }
}
