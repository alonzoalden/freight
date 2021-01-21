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
        private UserBAL userBAL;

        public UserController(IOptions<Common.Configuration.Connection> connection, IOptions<Common.Configuration.Setting> settings)
        {
            userBAL = new BAL.UserBAL(connection.Value, settings.Value);
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            try
            {
                return new JsonResult(userBAL.GetUsers());
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
                return new JsonResult(userBAL.GetUser(id));
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
                return new JsonResult(userBAL.UpdateUser(user));
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
                return new JsonResult(userBAL.CreateUser(user));
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
