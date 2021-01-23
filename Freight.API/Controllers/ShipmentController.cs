using Freight.API.BAL;
using Freight.API.Common.Model.Shipment;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;


namespace Freight.API.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("shipment")]
    public class ShipmentController : ControllerBase
    {
        private ShipmentBAL ShipmentBAL;

        public ShipmentController(IOptions<Common.Configuration.Connection> connection, IOptions<Common.Configuration.Setting> settings)
        {
            ShipmentBAL = new BAL.ShipmentBAL(connection.Value, settings.Value);
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetShipments()
        {
            try
            {
                return new JsonResult(ShipmentBAL.GetShipments());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Shipments");
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetShipment(int id)
        {
            try
            {
                return new JsonResult(ShipmentBAL.GetShipment(id));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Shipment");
            }
        }

        [HttpPost]
        public IActionResult CreateShipment(Shipment shipment)
        {
            try
            {
                return new JsonResult(ShipmentBAL.CreateShipment(shipment));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create Shipment");
            }
        }
    }
}
