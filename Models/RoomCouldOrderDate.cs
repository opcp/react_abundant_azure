using System;
using System.Collections.Generic;

#nullable disable

namespace react_abundant_azure.Models
{
    public partial class RoomCouldOrderDate
    {
        public DateTime RoomDate { get; set; }
        public int? StandradRoom { get; set; }
        public int? JuniorSuites { get; set; }
        public int? SuperiorRoom { get; set; }
        public DateTime? LastestModify { get; set; }
    }
}
