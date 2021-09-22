using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using react_abundant_azure.Models;
using react_abundant_azure.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Transactions;
using static react_abundant_azure.ViewModels.AddMemberOrderViewModel;

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
        [HttpGet("test")]
        public dynamic Test()
        {

            try
            {
                for (int i = 1; i < 10; i++)
                {
                    DateTime t = _context.Rooms.Max((i) => i.RoomDate).AddDays(i);

                    _context.Rooms.Add(new Room
                    {
                        RoomDate = t,
                        RoomType = 1,
                        RoomNumber = 5,
                        ModiftDate = DateTime.Now
                    });

                    _context.Rooms.Add(new Room
                    {
                        RoomDate = t,
                        RoomType = 2,
                        RoomNumber = 3,
                        ModiftDate = DateTime.Now
                    });

                    _context.Rooms.Add(new Room
                    {
                        RoomDate = t,
                        RoomType = 3,
                        RoomNumber = 1,
                        ModiftDate = DateTime.Now
                    });
                }
                _context.SaveChanges();

                return "ok";
            }
            catch (Exception ex)
            {

                throw new Exception(ex.ToString());
            }
        }

        // POST: api/Room/Check
        [HttpPost("Check")]
        public IActionResult Check([FromBody] RoomCheck value)
        {
            var q = _context.RoomCouldOrderDates.Where((i) => i.RoomDate >= value.startDate && i.RoomDate < value.endDate);
            // .Select((i) => new {i.StandradRoom, i.JuniorSuites, i.SuperiorRoom })

            return Ok(q);
        }

        // POST: api/Room/AddMemberOrder
        [HttpPost("AddMemberOrder")]
        public IActionResult AddMemberOrder(AddMemberOrderViewModel value)
        {
            try
            {
                int startDay = 0;
                int day = (value.CheckOutDate - value.CheckInDate).Days;

                string order_ID = Guid.NewGuid().ToString();

                MemberOrder s = new MemberOrder
                {
                    OrderId = order_ID,
                    MemberId = value.MemberId,
                    CheckInDate = value.CheckInDate,
                    CheckOutDate = value.CheckOutDate,
                    OrderCancel = "N",
                    CreateDate = DateTime.Now,
                    ModiftDate = DateTime.Now
                };

                _context.MemberOrders.Add(s);


                foreach (var item in value.Order)
                {
                    if (item.RoomOrderNumber > 0)
                    {
                        _context.MemberOrderDetails.Add(new MemberOrderDetail
                        {
                            OrderId = order_ID,
                            OrderDate = value.CheckInDate,
                            RoomType = item.RoomType,
                            RoomOrderNumber = item.RoomOrderNumber,
                            CreateDate = DateTime.Now,
                            ModiftDate = DateTime.Now
                        });
                    }
                }

                while (day > startDay)
                {
                    foreach (var item in value.Order)
                    {
                        if (item.RoomOrderNumber > 0)
                        {
                            var q = _context.Rooms.Where((i) => i.RoomDate == value.CheckInDate.AddDays(startDay) && i.RoomType == item.RoomType).FirstOrDefault();

                            if (q == null)
                            {
                                throw new Exception("can't_find_room_date");
                            }

                            if (item.RoomOrderNumber > q.RoomNumber)
                            {
                                throw new Exception("room_limit_error");
                            }

                            q.RoomNumber -= item.RoomOrderNumber;
                            q.ModiftDate = DateTime.Now;
                        }
                    }
                    startDay++;
                }

                _context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"{ex}");
            }


        }
    }
}
