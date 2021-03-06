using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Shipment
{
    public class ShipmentLineUpdate
    {
        public int ShipmentLineID { get; set; }
        public int ShipmentID { get; set; }
        public int ItemID { get; set; }
        public string Quantity { get; set; }
        public decimal? UnitPrice { get; set; }
    }
}
