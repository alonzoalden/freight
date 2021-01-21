using Freight.API.BAL;
using Freight.API.Common.Model.Item;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;

namespace Freight.API.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("item")]
    public class ItemController : ControllerBase
    {
        private ItemBAL itemBAL;

        public ItemController(IOptions<Common.Configuration.Connection> connection, IOptions<Common.Configuration.Setting> settings)
        {
            itemBAL = new BAL.ItemBAL(connection.Value, settings.Value);
        }

        [HttpGet]
        public IActionResult GetItems()
        {
            try
            {
                return new JsonResult(itemBAL.GetItems());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Items");
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetItem(int id)
        {
            try
            {
                return new JsonResult(itemBAL.GetItem(id));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Item");
            }
        }

        [HttpPut]
        public IActionResult UpdateItem(Item item)
        {
            try
            {
                itemBAL.UpdateItem(item);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update Item");
            }
        }

        [HttpPost]
        public IActionResult CreateUser(Item item)
        {
            try
            {
                itemBAL.CreateItem(item);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create Item");
            }
        }
    }
}
