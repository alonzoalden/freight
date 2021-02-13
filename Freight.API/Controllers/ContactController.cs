using Freight.API.BAL;
using Freight.API.Common.Model.Contact;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;


namespace Freight.API.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("contact")]
    public class ContactController : ControllerBase
    {

        private ContactBAL ContactBAL;

        public ContactController(IOptions<Common.Configuration.Connection> connection, IOptions<Common.Configuration.Setting> settings)
        {
            ContactBAL = new BAL.ContactBAL(connection.Value, settings.Value);
        }

        [HttpGet]
        public IActionResult GetContacts()
        {
            try
            {
                return new JsonResult(ContactBAL.GetContacts());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Contacts");
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetContact(int id)
        {
            try
            {
                return new JsonResult(ContactBAL.GetContact(id));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Contact");
            }
        }
        [HttpGet]
        [Route("customer/{customerid}")]
        public IActionResult GetContactByCustomerID(int customerid)
        {
            try
            {
                return new JsonResult(ContactBAL.GetContactByCustomerID(customerid));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Contact");
            }
        }
        [HttpPut]
        public IActionResult UpdateContact(ContactUpdate Contact)
        {
            try
            {
                return new JsonResult(ContactBAL.UpdateContact(Contact));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update Contact");
            }
        }

        [HttpPost]
        public IActionResult CreateContact(ContactInsert Contact)
        {
            try
            {
                return new JsonResult(ContactBAL.CreateContact(Contact));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create Contact");
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteContact(int id)
        {
            try
            {
                ContactBAL.DeleteContact(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to delete Contact");
            }
        }
    }
}
