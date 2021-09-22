using System;
using System.Collections.Generic;

#nullable disable

namespace react_abundant_azure.Models
{
    public partial class Member
    {
        public Member()
        {
            MemberOrders = new HashSet<MemberOrder>();
            VerifyMails = new HashSet<VerifyMail>();
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHashed { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Name { get; set; }
        public string FacebookId { get; set; }
        public string LineId { get; set; }
        public byte[] Photo { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Enable { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? ModifyDate { get; set; }

        public virtual ICollection<MemberOrder> MemberOrders { get; set; }
        public virtual ICollection<VerifyMail> VerifyMails { get; set; }
    }
}
