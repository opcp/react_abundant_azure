using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_abundant_azure.ViewModels
{
    public class ForSearchMemberOrderViewModel
    {

        public class COrderId
        {
            public string OrderString { get; set; }
            public DateTime CheckInDate { get; set; }
            public DateTime CheckOutDate { get; set; }
            public string OrderCancel { get; set; }
            public decimal OrderPrice { get; set; }
            public List<COrderRoom> OrderRoom { get; set; }
        }

        public class COrderRoom
        {
            public int roomType { get; set; }
            public string roomName { get; set; }
            public int roomNumber { get; set; }
            public decimal roomPrice { get; set; }
        }

    }
}
