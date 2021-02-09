using Freight.API.BAL;
using Freight.API.Common.Model.Business;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;

namespace Freight.API.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("business")]
    public class BusinessController : ControllerBase
    {
        private BusinessBAL BusinessBAL;

        public BusinessController(IOptions<Common.Configuration.Connection> connection, IOptions<Common.Configuration.Setting> settings)
        {
            BusinessBAL = new BAL.BusinessBAL(connection.Value, settings.Value);
        }

        [HttpGet]
        public IActionResult GetBusinesses()
        {
            try
            {
                return new JsonResult(BusinessBAL.GetBusinesses());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Businesss");
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetBusiness(int id)
        {
            try
            {
                return new JsonResult(BusinessBAL.GetBusiness(id));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Business");
            }
        }
        [HttpGet]
        [Route("user/{userid}")]
        public IActionResult GetBusinessByUserID(int userid)
        {
            try
            {
                return new JsonResult(BusinessBAL.GetBusinessByUserID(userid));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Business");
            }
        }
        [HttpPut]
        public IActionResult UpdateBusiness(BusinessUpdate business)
        {
            try
            {
                return new JsonResult(BusinessBAL.UpdateBusiness(business));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update Business");
            }
        }

        [HttpPost]
        public IActionResult CreateBusiness(BusinessInsert business)
        {
            try
            {
                return new JsonResult(BusinessBAL.CreateBusiness(business));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create Business");
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteBusiness(int id)
        {
            try
            {
                BusinessBAL.DeleteBusiness(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to delete Business");
            }
        }

        //Business User
        [HttpGet]
        [Route("businessuser/{businessuserid}")]
        public IActionResult GetBusinessUser(int businessuserid)
        {
            try
            {
                return new JsonResult(BusinessBAL.GetBusinessUser(businessuserid));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get BusinessUser");
            }
        }
        [HttpGet]
        [Route("businessuser/user/{userid}")]
        public IActionResult GetBusinessUserByUserID(int userid)
        {
            try
            {
                return new JsonResult(BusinessBAL.GetBusinessUserByUserID(userid));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get BusinessUser");
            }
        }
        [HttpGet]
        [Route("businessuser/business/{businessid}")]
        public IActionResult GetBusinessUserByBusinessID(int businessid)
        {
            try
            {
                return new JsonResult(BusinessBAL.GetBusinessUserByBusinessID(businessid));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get BusinessUser");
            }
        }
        [HttpPut]
        [Route("businessuser")]
        public IActionResult UpdateBusinessUser(BusinessUserUpdate businessuser)
        {
            try
            {
                return new JsonResult(BusinessBAL.UpdateBusinessUser(businessuser));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update BusinessUser");
            }
        }

        [HttpPost]
        [Route("businessuser")]
        public IActionResult CreateBusinessUser(BusinessUserInsert businessuser)
        {
            try
            {
                return new JsonResult(BusinessBAL.CreateBusinessUser(businessuser));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create BusinessUser");
            }
        }
    }
}
