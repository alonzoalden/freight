using Freight.API.BAL;
using Freight.API.Common.Model.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;

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

        [HttpPut]
        public IActionResult UpdateUser(User user)
        {
            try
            {
                return new JsonResult(UserBAL.UpdateUser(user));
                //userBAL.UpdateUser(user);
                //return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update User");
            }
        }

        [HttpPost]
        public IActionResult CreateUser(User user)
        {
            try
            {
                return new JsonResult(UserBAL.CreateUser(user));
                //userBAL.CreateUser(user);
                //return Ok();
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create User");
            }
        }
    }
}
