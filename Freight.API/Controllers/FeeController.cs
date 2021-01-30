using Freight.API.BAL;
using Freight.API.Common.Model.Fee;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;

namespace Freight.API.Controllers
{
    [ApiController]
    [Route("fee")]
    public class FeeController : ControllerBase
    {
        private FeeBAL FeeBAL;

        public FeeController(IOptions<Common.Configuration.Connection> connection, IOptions<Common.Configuration.Setting> settings)
        {
            FeeBAL = new BAL.FeeBAL(connection.Value, settings.Value);
        }
        [HttpGet]
        public IActionResult GetFees()
        {
            try
            {
                return new JsonResult(FeeBAL.GetFees());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Fees");
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetFee(int id)
        {
            try
            {
                return new JsonResult(FeeBAL.GetFee(id));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Fee");
            }
        }
        [HttpGet]
        [Route("business/{businessid}")]
        public IActionResult GetFeeByBusinessID(int businessid)
        {
            try
            {
                return new JsonResult(FeeBAL.GetFeeByBusinessID(businessid));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Fees");
            }
        }
        [HttpPut]
        public IActionResult UpdateFee(FeeUpdate Fee)
        {
            try
            {
                return new JsonResult(FeeBAL.UpdateFee(Fee));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update Fee");
            }
        }

        [HttpPost]
        public IActionResult CreateFee(FeeInsert Fee)
        {
            try
            {
                return new JsonResult(FeeBAL.CreateFee(Fee));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create Fee");
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteFee(int id)
        {
            try
            {
                FeeBAL.DeleteFee(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to delete Fee");
            }
        }
    }
}
