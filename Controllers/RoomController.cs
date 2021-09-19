using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using react_abundant_azure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_abundant_azure.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly abundantContext _context;

        public RoomController(abundantContext context)
        {
            _context = context;
        }

        // POST: api/Room/Check
        [HttpPost("Check")]
        public IActionResult Check([FromBody] RoomCheck value)
        {
            var q = _context.RoomCouldOrderDates.Where((i) => i.RoomDate >= value.startDate && i.RoomDate < value.endDate);
            // .Select((i) => new {i.StandradRoom, i.JuniorSuites, i.SuperiorRoom })
           
            return Ok(q);
        }

        [HttpPost("AddOrder")]
        public IActionResult AddOrder([FromBody] RoomCheck value)
        {
            var q = _context.RoomCouldOrderDates.Where((i) => i.RoomDate >= value.startDate && i.RoomDate < value.endDate);
            try
            {

            }
            catch (Exception ex)
            {
                throw;
            }

            return Ok(q);
        }
    }
}
