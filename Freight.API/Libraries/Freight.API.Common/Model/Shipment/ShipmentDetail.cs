using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Shipment
{
    public class ShipmentDetail
    {
        public Shipment Shipment { get; set; }
        public List<ShipmentLine> ShipmentLines { get; set; }
        public List<ShipmentPackage> ShipmentPackages { get; set; }
        public List<ShipmentFee> ShipmentFees { get; set; }
        public List<ShipmentContact> ShipmentContacts { get; set; }
    }
}
