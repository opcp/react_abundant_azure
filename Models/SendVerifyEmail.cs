using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading.Tasks;

namespace react_abundant_azure.Models
{
    public class SendVerifyEmail
    {
        private readonly AbundantContext _context = new AbundantContext();
        private readonly string auth = Guid.NewGuid().ToString();

        public void Authorization(int memberId)
        {
            DateTime LimitTime = DateTime.Now.AddMinutes(10);

            string EmailSendTo = _context.Members.Where((i) => i.Id == memberId).Select((i) => i.Email).FirstOrDefault().ToString();

            _context.VerifyMails.Add(new VerifyMail
            {
                VerifyString = auth,
                EnableTime = LimitTime,
                MemberId = memberId,
                CreateDate=DateTime.Now
            });

            _context.SaveChanges();

            SendEamil(EmailSendTo, LimitTime);
        }

        private void SendEamil(string EmailSendTo, DateTime LimitTime)
        {
            try
            {
                using (MailMessage mail = new MailMessage())
                {
                    string link = "https://localhost:44374/verify?AccessToken=" + auth;
                    mail.From = new MailAddress("abundantserviceiceland@gmail.com");
                    mail.To.Add(EmailSendTo);
                    mail.Subject = "Abundant Verify Mail";
                    mail.Body = "<div>" +
                        "<h3> Click link to verify </h3>" +
                             "<div style=\"width: fit-content; background-color: rgba(97, 97, 97, 0.3)\">" +
                             "<h3>" +
                             $"<a style=\"text-decoration: none\" href = \"{link}\">{link}</a>" +
                             "</h3></div>"
                       + $"<h3> The link will expire at {LimitTime} </h3>" + "</div>";

                    mail.IsBodyHtml = true;

                    using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                    {
                        smtp.Credentials = new NetworkCredential("abundantserviceiceland@gmail.com", "~Abundant2421");
                        smtp.EnableSsl = true;
                        smtp.Send(mail);
                    }
                }

            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
