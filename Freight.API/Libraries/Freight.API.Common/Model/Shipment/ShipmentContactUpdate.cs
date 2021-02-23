using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Shipment
{
    public class ShipmentContactUpdate
    {
        public int ShipmentContactID { get; set; }
        public int ShipmentID { get; set; }
        public int ContactID { get; set; }
        public int UpdatedBy { get; set; }
    }
}
