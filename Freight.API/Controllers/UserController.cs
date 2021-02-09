using Freight.API.BAL;
using Freight.API.Common.Model.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Web;

namespace Freight.API.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private UserBAL UserBAL;

        public UserController(IOptions<Common.Configuration.Connection> connection, IOptions<Common.Configuration.Setting> settings)
        {
            UserBAL = new BAL.UserBAL(connection.Value, settings.Value);
        }        
        [HttpGet]
       public IActionResult GetUsers()
        {
            try
            {
                return new JsonResult(UserBAL.GetUsers());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Users");
            }
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetUser(int id)
        {
            try
            {
                return new JsonResult(UserBAL.GetUser(id));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get User");
            }
        }
        [HttpGet]
        [Route("email/{email}")]
        public IActionResult GetUserByEmail(string email)
        {
            try
            {
                email = Encoding.UTF8.GetString(Convert.FromBase64String(email));
                return new JsonResult(UserBAL.GetUserByEmail(email));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get User");
            }
        }
        [HttpGet]
        [Route("current")]
        public IActionResult GetCurrentUser()
        {
            try
            {
                return new JsonResult(UserBAL.GetUser(Convert.ToInt32(GetClaimUserID())));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Current User");
            }
        }
        [HttpPut]
        public IActionResult UpdateUser(UserUpdate user)
        {
            try
            {
                return new JsonResult(UserBAL.UpdateUser(user));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update User");
            }
        }

        [HttpPost]
        public IActionResult CreateUser(UserInsert user)
        {
            try
            {
                return new JsonResult(UserBAL.CreateUser(user));
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create User");
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteUser(int id)
        {
            try
            {
                UserBAL.DeleteUser(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to delete User");
            }
        }

        protected string GetClaimUserID()
        {
            return User.Claims.First(x => x.Type == "fbasimplifyuserid").Value;
        }
    }
}
