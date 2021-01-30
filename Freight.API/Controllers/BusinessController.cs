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

        [HttpPut]
        public IActionResult UpdateBusiness(BusinessUpdate Business)
        {
            try
            {
                return new JsonResult(BusinessBAL.UpdateBusiness(Business));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update Business");
            }
        }

        [HttpPost]
        public IActionResult CreateBusiness(BusinessInsert Business)
        {
            try
            {
                return new JsonResult(BusinessBAL.CreateBusiness(Business));
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
    }
}
