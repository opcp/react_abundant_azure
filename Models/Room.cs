using System;
using System.Collections.Generic;

#nullable disable

namespace react_abundant_azure.Models
{
    public partial class Room
    {
        public DateTime RoomDate { get; set; }
        public int RoomType { get; set; }
        public int RoomNumber { get; set; }
        public DateTime ModiftDate { get; set; }

        public virtual RoomType RoomTypeNavigation { get; set; }
    }
}
