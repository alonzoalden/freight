using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Shipment
{
    public class ShipmentComment
    {
        public int ShipmentCommentID { get; set; }
        public int ShipmentID { get; set; }
        public string Comment { get; set; }
        public int CreatedBy { get; set; }
        public string CreatedByName { get; set; }      
        public DateTime CreatedOn { get; set; }
    }
}
