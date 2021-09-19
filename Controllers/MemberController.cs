using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using react_abundant_azure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static react_abundant_azure.Models.MemberFactory;

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


        // GET: api/<ValuesController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/Member/MemberLogIn
        [HttpPost("MemberLogIn")]
        public IActionResult MemberLogin([FromBody] Member value)
        {

            if (!string.IsNullOrEmpty(value.FacebookId))
            {
                var q = _context.Members.Where((i) => i.FacebookId == value.FacebookId).Select((i) => new { i.Id, i.Name, i.Email }).FirstOrDefault();

                if (q == null)
                {
                    return NotFound("first login");
                }
                else
                {
                    return Ok(q);
                }


            }

            if (!string.IsNullOrEmpty(value.LineId))
            {
                var q = _context.Members.Where((i) => i.LineId == value.LineId).Select((i) => new { i.Id, i.Name, i.Email }).FirstOrDefault();

                return Ok(q);
            }

            // string json = JsonConvert.SerializeObject(new State() { state = "first login" });



            return NotFound("first login");
        }

        // POST api/Member/MemberSignUp
        [HttpPost("MemberSignUp")]
        public IActionResult SignUp([FromBody] CsingUpData value)
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
                Enable = "Y",
                CreateDate = DateTime.Now,
                ModifyDate = DateTime.Now,
            };

            _context.Add(m);
            _context.SaveChanges();

            var q = _context.Members.Where((i) => i.Id == m.Id).Select((i) => new { i.Id, i.Name, i.Email }).FirstOrDefault();

            return Ok(q);
        }
    }

}
