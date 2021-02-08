using Freight.API.BAL;
using Freight.API.Common.Model.Customer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;

namespace Freight.API.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("customer")]
    public class CustomerController : ControllerBase
    {
        private CustomerBAL CustomerBAL;

        public CustomerController(IOptions<Common.Configuration.Connection> connection, IOptions<Common.Configuration.Setting> settings)
        {
            CustomerBAL = new BAL.CustomerBAL(connection.Value, settings.Value);
        }

        [HttpGet]
        public IActionResult GetCustomers()
        {
            try
            {
                return new JsonResult(CustomerBAL.GetCustomers());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Customers");
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetCustomer(int id)
        {
            try
            {
                return new JsonResult(CustomerBAL.GetCustomer(id));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Customer");
            }
        }
        [HttpGet]
        [Route("business/{businessid}")]
        public IActionResult GetCustomerByBusiness(int businessid)
        {
            try
            {
                return new JsonResult(CustomerBAL.GetCustomer(businessid));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Customer");
            }
        }
        [HttpPut]
        public IActionResult UpdateCustomer(CustomerUpdate Customer)
        {
            try
            {
                return new JsonResult(CustomerBAL.UpdateCustomer(Customer));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update Customer");
            }
        }

        [HttpPost]
        public IActionResult CreateCustomer(CustomerInsert Customer)
        {
            try
            {
                return new JsonResult(CustomerBAL.CreateCustomer(Customer));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create Customer");
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteCustomer(int id)
        {
            try
            {
                CustomerBAL.DeleteCustomer(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to delete Customer");
            }
        }
    }
}
