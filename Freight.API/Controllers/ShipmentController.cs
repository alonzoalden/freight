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

        [HttpPut]
        public IActionResult UpdateShipment(ShipmentUpdate shipment)
        {
            try
            {
                return new JsonResult(ShipmentBAL.UpdateShipment(shipment));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update Shipment");
            }
        }
        [HttpPut]
        [Route("line")]
        public IActionResult UpdateShipmentLine(ShipmentLineUpdate shipmentline)
        {
            try
            {
                return new JsonResult(ShipmentBAL.UpdateShipmentLine(shipmentline));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update Shipment Line");
            }
        }
        [HttpPut]
        [Route("package")]
        public IActionResult UpdateShipmentPackage(ShipmentPackageUpdate shipmentpackage)
        {
            try
            {
                return new JsonResult(ShipmentBAL.UpdateShipmentPackage(shipmentpackage));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update Shipment Package");
            }
        }
        [HttpPut]
        [Route("fee")]
        public IActionResult UpdateShipmentFee(ShipmentFeeUpdate shipmentfee)
        {
            try
            {
                return new JsonResult(ShipmentBAL.UpdateShipmentFee(shipmentfee));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update Shipment Fee");
            }
        }
        [HttpPut]
        [Route("contact")]
        public IActionResult UpdateShipmentContact(ShipmentContactUpdate shipmentcontact)
        {
            try
            {
                return new JsonResult(ShipmentBAL.UpdateShipmentContact(shipmentcontact));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update Shipment Contact");
            }
        }

        [HttpPost]
        public IActionResult CreateShipment(ShipmentInsert shipment)
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
        [HttpPost]
        [Route("line")]
        public IActionResult CreateShipmentLine(ShipmentLineInsert shipmentline)
        {
            try
            {
                return new JsonResult(ShipmentBAL.CreateShipmentLine(shipmentline));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create Shipment Line");
            }
        }
        [HttpPost]
        [Route("package")]
        public IActionResult CreateShipmentPackage(ShipmentPackageInsert shipmentpackage)
        {
            try
            {
                return new JsonResult(ShipmentBAL.CreateShipmentPackage(shipmentpackage));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create Shipment Package");
            }
        }
        [HttpPost]
        [Route("fee")]
        public IActionResult CreateShipmentFee(ShipmentFeeInsert shipmentfee)
        {
            try
            {
                return new JsonResult(ShipmentBAL.CreateShipmentFee(shipmentfee));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create Shipment Fee");
            }
        }
        [HttpPost]
        [Route("contact")]
        public IActionResult CreateShipmentContact(ShipmentContactInsert shipmentcontact)
        {
            try
            {
                return new JsonResult(ShipmentBAL.CreateShipmentContact(shipmentcontact));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create Shipment Contact");
            }
        }

        [HttpPost]
        [Route("shipmentdetail")]
        public IActionResult CreateShipmentDetail(ShipmentDetailInsert shipmentdetail)
        {
            try
            {
                return new JsonResult(ShipmentBAL.CreateShipmentDetail(shipmentdetail));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create Shipment Detail");
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteShipment(int id)
        {
            try
            {
                ShipmentBAL.DeleteShipment(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to delete Shipment");
            }
        }
        [HttpDelete]
        [Route("line/{id}")]
        public IActionResult DeleteShipmentLine(int id)
        {
            try
            {
                ShipmentBAL.DeleteShipmentLine(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to delete Shipment Line");
            }
        }
        [HttpDelete]
        [Route("package/{id}")]
        public IActionResult DeleteShipmentPackage(int id)
        {
            try
            {
                ShipmentBAL.DeleteShipmentPackage(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to delete Shipment Package");
            }
        }
        [HttpDelete]
        [Route("fee/{id}")]
        public IActionResult DeleteShipmentFee(int id)
        {
            try
            {
                ShipmentBAL.DeleteShipmentFee(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to delete Shipment Fee");
            }
        }
        [HttpDelete]
        [Route("contact/{id}")]
        public IActionResult DeleteShipmentContact(int id)
        {
            try
            {
                ShipmentBAL.DeleteShipmentContact(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to delete Shipment Contact");
            }
        }
    }
}
