using System;
using System.Collections.Generic;

#nullable disable

namespace react_abundant_azure.Models
{
    public partial class MemberOrderDetail
    {
        public int DetailId { get; set; }
        public string OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public int RoomType { get; set; }
        public int RoomOrderNumber { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime ModiftDate { get; set; }
    }
}
