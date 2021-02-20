using Freight.API.BAL;
using Freight.API.Common.Model.Item;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Security.Claims;

namespace Freight.API.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("item")]
    public class ItemController : ControllerBase
    {
        private ItemBAL ItemBAL;

        public ItemController(IOptions<Common.Configuration.Connection> connection, IOptions<Common.Configuration.Setting> settings)
        {
            ItemBAL = new BAL.ItemBAL(connection.Value, settings.Value);
        }

        [HttpGet]
        public IActionResult GetItems()
        {
            try
            {
                //string test = GetClaimUserID();
                return new JsonResult(ItemBAL.GetItems());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                //return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Items");
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetItem(int id)
        {
            try
            {
                return new JsonResult(ItemBAL.GetItem(id));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Item");
            }
        }
        [HttpGet]
        [Route("business/{businessid}")]
        public IActionResult GetItemByBusinessID(int businessid)
        {
            try
            {
                return new JsonResult(ItemBAL.GetItemByBusinessID(businessid));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get Items");
            }
        }
        [HttpPut]
        public IActionResult UpdateItem(ItemUpdate item)
        {
            try
            {
                return new JsonResult(ItemBAL.UpdateItem(item));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update Item");
            }
        }

        [HttpPost]
        public IActionResult CreateItem(ItemInsert item)
        {
            try
            {
                return new JsonResult(ItemBAL.CreateItem(item));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create Item");
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteItem(int id)
        {
            try
            {
                ItemBAL.DeleteItem(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to delete Item");
            }
        }
        protected string GetClaimUserID()
        {
            return User.Claims.First(x => x.Type == "fbasimplifyuserid").Value;
        }
    }
}
