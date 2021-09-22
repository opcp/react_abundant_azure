using Microsoft.AspNetCore.Mvc;
using react_abundant_azure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace react_abundant_azure.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class VerifyController : ControllerBase
    {
        private readonly abundantContext _context;

        public VerifyController(abundantContext context)
        {
            _context = context;
        }
        //https://localhost:44340/verify?AccessToken=GUID

        // GET /<VerifyController>/5
        [HttpGet]
        public IActionResult Get(string AccessToken)
        {
            var q = _context.VerifyMails.Where((i) => i.VerifyString == AccessToken && i.EnableTime > DateTime.Now).FirstOrDefault();

            if (q == null)
            {
                return BadRequest("Verify Fail");
            }
            else if (q.EnableTime < DateTime.Now)
            {
                return BadRequest("Time limit exceeded");
            }

            var m = _context.Members.FirstOrDefault((i) => i.Id == q.MemberId);

            m.Enable = "Y";

            _context.SaveChanges();

            return Ok("Verify Success");
        }


    }
}
