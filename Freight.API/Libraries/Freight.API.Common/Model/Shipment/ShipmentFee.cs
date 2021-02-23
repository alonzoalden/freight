using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Shipment
{
    public class ShipmentFee
    {
        public int ShipmentFeeID { get; set; }
        public int ShipmentID { get; set; }
        public int FeeID { get; set; }
        public string FeeFeeType { get; set; }
        public decimal FeeAmount { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
