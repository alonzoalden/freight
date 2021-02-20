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
        [HttpGet]
        [Route("{shipmentid}/shipmentline")]
        public IActionResult GetShipmentLineByShipmentID(int shipmentid)
        {
            try
            {
                return new JsonResult(ShipmentBAL.GetShipmentLineByShipmentID(shipmentid));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Shipment Line");
            }
        }
        [HttpGet]
        [Route("{shipmentid}/shipmentpackage")]
        public IActionResult GetShipmentPackageByShipmentID(int shipmentid)
        {
            try
            {
                return new JsonResult(ShipmentBAL.GetShipmentPackageByShipmentID(shipmentid));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Shipment Package");
            }
        }
        [HttpGet]
        [Route("{shipmentid}/shipmentfee")]
        public IActionResult GetShipmentFeeByShipmentID(int shipmentid)
        {
            try
            {
                return new JsonResult(ShipmentBAL.GetShipmentFeeByShipmentID(shipmentid));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Shipment Fee");
            }
        }
        [HttpGet]
        [Route("{shipmentid}/shipmentcontact")]
        public IActionResult GetShipmentContactByShipmentID(int shipmentid)
        {
            try
            {
                return new JsonResult(ShipmentBAL.GetShipmentContactByShipmentID(shipmentid));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Shipment Fee");
            }
        }
        [HttpGet]
        [Route("{shipmentid}/shipmentcomment")]
        public IActionResult GetShipmentCommentByShipmentID(int shipmentid)
        {
            try
            {
                return new JsonResult(ShipmentBAL.GetShipmentCommentByShipmentID(shipmentid));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Shipment Fee");
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
        [Route("shipmentline")]
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
        [Route("shipmentpackage")]
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
        [Route("shipmentfee")]
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
        [Route("shipmentcontact")]
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
        [HttpPut]
        [Route("shipmentcomment")]
        public IActionResult UpdateShipmentComment(ShipmentCommentUpdate shipmentcomment)
        {
            try
            {
                return new JsonResult(ShipmentBAL.UpdateShipmentComment(shipmentcomment));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update Shipment Comment");
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
        [Route("shipmentline")]
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
        [Route("shipmentpackage")]
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
        [Route("shipmentfee")]
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
        [Route("shipmentcontact")]
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
        [Route("shipmentcomment")]
        public IActionResult CreateShipmentComment(ShipmentCommentInsert shipmentcomment)
        {
            try
            {
                return new JsonResult(ShipmentBAL.CreateShipmentComment(shipmentcomment));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create Shipment Comment");
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
        [Route("shipmentline/{id}")]
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
        [Route("shipmentpackage/{id}")]
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
        [Route("shipmentfee/{id}")]
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
        [Route("shipmentcontact/{id}")]
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
        [HttpDelete]
        [Route("shipmentcomment/{id}")]
        public IActionResult DeleteShipmentComment(int id)
        {
            try
            {
                ShipmentBAL.DeleteShipmentComment(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to delete Shipment Comment");
            }
        }
    }
}
