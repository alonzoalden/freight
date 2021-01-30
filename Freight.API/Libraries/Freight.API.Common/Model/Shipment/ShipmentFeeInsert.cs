using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Shipment
{
    public class ShipmentFeeInsert
    {
        public int ShipmentID { get; set; }
        public int FeeID { get; set; }
        public decimal FeeAmount { get; set; }
    }
}
