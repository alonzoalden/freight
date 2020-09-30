using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Freight.API.BAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Freight.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly TestBAL _bal;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, 
            IOptions<Common.Configuration.Connection> connection, 
            IOptions<Common.Configuration.Setting> settings)
        {
            _logger = logger;
            _bal = new BAL.TestBAL(connection.Value, settings.Value);
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet, Route("2")]
        public IActionResult Get2()
        {
            return Ok(_bal.getValue());
        }
    }
}
