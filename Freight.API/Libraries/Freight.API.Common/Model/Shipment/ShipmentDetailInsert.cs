using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Shipment
{
    public class ShipmentDetailInsert
    {
        public ShipmentInsert Shipment { get; set; }
        public List<ShipmentLineInsert> ShipmentLines { get; set; }
        public List<ShipmentPackageInsert> ShipmentPackages { get; set; }
        public List<ShipmentFeeInsert> ShipmentFees { get; set; }
        public List<ShipmentContactInsert> ShipmentContacts { get; set; }
    }
}
