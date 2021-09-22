using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using react_abundant_azure.Models;
using react_abundant_azure.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using static react_abundant_azure.Models.MemberFactory;
using static react_abundant_azure.ViewModels.ForSearchMemberOrderViewModel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace react_abundant_azure.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly abundantContext _context;

        public MemberController(abundantContext context)
        {
            _context = context;
        }
        // POST api/Member/emailCheck
        [HttpPost("emailCheck")]
        public IActionResult emailCheck([FromBody] string email)
        {
            var q = _context.Members.Where((i) => i.Email == email).FirstOrDefault();
            if (q != null)
            {
                return Ok(JsonConvert.SerializeObject(new State() { state = "emailUsed" }));
            }
            else
            {
                return Ok(JsonConvert.SerializeObject(new State() { state = "emailNotUsed" }));
            }
        }

        // POST api/Member/MemberLogIn
        [HttpPost("MemberLogIn")]
        public IActionResult MemberLogin([FromBody] SignUpData value)
        {
            string json = JsonConvert.SerializeObject(new State() { state = "first_login" });

            if (!string.IsNullOrEmpty(value.FacebookId))
            {
                var q = _context.Members.Where((i) => i.FacebookId == value.FacebookId).Select((i) => new { i.Id, i.Name, i.Email, i.Enable }).FirstOrDefault();

                if (q == null)
                {

                    return NotFound(json);
                }
                else
                {
                    return Ok(q);
                }


            }

            if (!string.IsNullOrEmpty(value.LineId))
            {
                var q = _context.Members.Where((i) => i.LineId == value.LineId).Select((i) => new { i.Id, i.Name, i.Email, i.Enable }).FirstOrDefault();

                if (q == null)
                {

                    return NotFound(json);
                }
                else
                {
                    return Ok(q);
                }
            }

            if (!string.IsNullOrEmpty(value.Email) && value.Password != null)
            {
                var q = _context.Members.FirstOrDefault((i) => i.Email == value.Email);


                if (q == null)
                {
                    string state = JsonConvert.SerializeObject(new State() { state = "not_member" });

                    return NotFound(state);
                }
                else
                {
                    string decode_password = Encoding.UTF8.GetString(Convert.FromBase64String(value.Password));

                    byte[] password = Encoding.UTF8.GetBytes(decode_password);

                    byte[] password_concat_salt_user = password.Concat(q.PasswordSalt).ToArray();

                    byte[] password_hashed_user = SHA512.Create().ComputeHash(password_concat_salt_user);

                    if (password_hashed_user.SequenceEqual(q.PasswordHashed))
                    {
                        var res = _context.Members.Where((i) => i.Email == value.Email).Select((i) => new { i.Email, i.Id, i.Name, i.Enable }).FirstOrDefault();

                        return Ok(res);
                    }
                    else
                    {
                        string state = JsonConvert.SerializeObject(new State() { state = "password_error" });

                        return NotFound(state);
                    }
                }
            }



            return NotFound(json);
        }

        // POST api/Member/MemberSignUp
        [HttpPost("MemberSignUp")]
        public IActionResult SignUp([FromBody] SignUpData value)
        {
            try
            {
                var m = new Member
                {
                    Email = value.Email,
                    Name = value.Username,
                    PasswordHashed = new MemberFactory().Password_Hashed(value.Password, out byte[] password_salt),
                    PasswordSalt = password_salt,
                    FacebookId = value.FacebookId ?? null,
                    LineId = value.LineId ?? null,
                    Phone = value.Phone ?? null,
                    Enable = "N",
                    CreateDate = DateTime.Now,
                    ModifyDate = DateTime.Now,
                };

                _context.Add(m);
                _context.SaveChanges();

                if (value.FacebookId == null && value.LineId == null)
                {
                    new SendVerifyEmail().Authorization(m.Id);
                }

                return Ok(m);
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"{ex}");
            }


        }

        [HttpPost("MemberOrder")]
        public IActionResult MemberOrder([FromBody] int memberID)
        {
            List<COrderId> COrder = new List<COrderId>();

            var q = from o in _context.MemberOrders join d in _context.MemberOrderDetails on o.OrderId equals d.OrderId join t in _context.RoomTypes on d.RoomType equals t.RoomId where o.MemberId == memberID orderby o.CheckInDate descending select new { o.OrderId, o.CheckInDate, o.CheckOutDate, d.RoomType, d.RoomOrderNumber, o.OrderCancel, t.RoomName,t.RoomPrice};

            foreach (var item in q)
            {
                if (COrder.Exists((i) => i.OrderString == item.OrderId))
                {
                    COrderId c = COrder.Where((i) => i.OrderString == item.OrderId).FirstOrDefault();
                    c.OrderPrice += (decimal)(item.RoomOrderNumber * item.RoomPrice);
                    c.OrderRoom.Add(new COrderRoom { roomType = item.RoomType, roomName = item.RoomName, roomNumber = item.RoomOrderNumber,roomPrice= (decimal)item.RoomPrice });
                }
                else
                {
                    COrderId c = new COrderId()
                    {
                        OrderString = item.OrderId,
                        CheckInDate = item.CheckInDate,
                        CheckOutDate = item.CheckOutDate,
                        OrderCancel = item.OrderCancel,
                        OrderRoom = new List<COrderRoom>()
                    };

                    c.OrderPrice = (decimal)(item.RoomOrderNumber * item.RoomPrice);

                    c.OrderRoom.Add(new COrderRoom { roomType = item.RoomType, roomName = item.RoomName, roomNumber = item.RoomOrderNumber , roomPrice = (decimal)item.RoomPrice });

                    COrder.Add(c);
                }
            }

            if (COrder == null || COrder.Count == 0)
            {
                return NotFound();
            }

            return Ok(COrder);
        }

        [HttpPost("VerifyAgain")]
        public IActionResult VerifyMailAgain([FromBody] int memberID)
        {
            new SendVerifyEmail().Authorization(memberID);

            return Ok();
        }
    }

}
