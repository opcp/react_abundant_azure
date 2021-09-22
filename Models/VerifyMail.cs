using System;
using System.Collections.Generic;

#nullable disable

namespace react_abundant_azure.Models
{
    public partial class VerifyMail
    {
        public int ListNumber { get; set; }
        public string VerifyString { get; set; }
        public int MemberId { get; set; }
        public DateTime EnableTime { get; set; }
        public DateTime CreateDate { get; set; }

        public virtual Member Member { get; set; }
    }
}
