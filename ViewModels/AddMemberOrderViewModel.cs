using react_abundant_azure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_abundant_azure.ViewModels
{
    public class AddMemberOrderViewModel
    {

        public int MemberId { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public RoomOrder[] Order { get; set; }


        public class RoomOrder
        {
            public int RoomType { get; set; }
            public int RoomOrderNumber { get; set; }
        }
    }
}
