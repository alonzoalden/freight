using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Shipment
{
    public class ShipmentCommentUpdate
    {
        public int ShipmentCommentID { get; set; }
        public string Comment { get; set; }
    }
}
