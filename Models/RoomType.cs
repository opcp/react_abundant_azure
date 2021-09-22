using System;
using System.Collections.Generic;

#nullable disable

namespace react_abundant_azure.Models
{
    public partial class RoomType
    {
        public RoomType()
        {
            Rooms = new HashSet<Room>();
        }

        public int RoomId { get; set; }
        public string RoomName { get; set; }
        public int? RoomPeopleLimit { get; set; }
        public decimal? RoomPrice { get; set; }

        public virtual ICollection<Room> Rooms { get; set; }
    }
}
