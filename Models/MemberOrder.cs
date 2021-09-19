using System;
using System.Collections.Generic;

#nullable disable

namespace react_abundant_azure.Models
{
    public partial class MemberOrder
    {
        public int OrderId { get; set; }
        public int MemberId { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public string OrderRoomTotal { get; set; }
        public string OrderCancel { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime ModiftDate { get; set; }

        public virtual Member Member { get; set; }
    }
}
