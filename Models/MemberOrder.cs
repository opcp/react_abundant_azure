using System;
using System.Collections.Generic;

#nullable disable

namespace react_abundant_azure.Models
{
    public partial class MemberOrder
    {
        public string OrderId { get; set; }
        public int MemberId { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public string OrderCancel { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime ModiftDate { get; set; }

        public virtual Member Member { get; set; }
    }
}
