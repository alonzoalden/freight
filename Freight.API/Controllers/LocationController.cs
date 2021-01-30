using Freight.API.BAL;
using Freight.API.Common.Model.Location;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;

namespace Freight.API.Controllers
{
    [ApiController]
    [Route("location")]
    public class LocationController : ControllerBase
    {
        private LocationBAL LocationBAL;

        public LocationController(IOptions<Common.Configuration.Connection> connection, IOptions<Common.Configuration.Setting> settings)
        {
            LocationBAL = new BAL.LocationBAL(connection.Value, settings.Value);
        }
        [HttpGet]
        public IActionResult GetLocations()
        {
            try
            {
                return new JsonResult(LocationBAL.GetLocations());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Locations");
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetLocation(int id)
        {
            try
            {
                return new JsonResult(LocationBAL.GetLocation(id));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Location");
            }
        }
        [HttpGet]
        [Route("business/{businessid}")]
        public IActionResult GetLocationByBusinessID(int businessid)
        {
            try
            {
                return new JsonResult(LocationBAL.GetLocationByBusinessID(businessid));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Locations");
            }
        }
        [HttpPut]
        public IActionResult UpdateLocation(LocationUpdate Location)
        {
            try
            {
                return new JsonResult(LocationBAL.UpdateLocation(Location));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update Location");
            }
        }

        [HttpPost]
        public IActionResult CreateLocation(LocationInsert Location)
        {
            try
            {
                return new JsonResult(LocationBAL.CreateLocation(Location));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create Location");
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteLocation(int id)
        {
            try
            {
                LocationBAL.DeleteLocation(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to delete Location");
            }
        }
    }
}
