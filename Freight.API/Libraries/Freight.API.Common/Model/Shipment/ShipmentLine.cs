using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Shipment
{
    public class ShipmentLine
    {
        public int ShipmentLineID { get; set; }
        public int ShipmentID { get; set; }
        public int ItemID { get; set; }
        public string ItemItemNumber { get; set; }
        public string ItemItemName { get; set; }
        public string ItemHTSCode { get; set; }
        public string ItemFNSKU { get; set; }
        public string ItemASIN { get; set; }
        public string Quantity { get; set; }
        public decimal? UnitPrice { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
