using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Shipment
{
    public class ShipmentContactInsert
    {
        public int ShipmentID { get; set; }
        public int ContactID { get; set; }
        public int CreatedBy { get; set; }
    }
}
