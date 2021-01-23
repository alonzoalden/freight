using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Shipment
{
    public class ShipmentPackage
    {
        public int ShipmentPackageID { get; set; }
        public int BusinessID { get; set; }
        public int ShipmentID { get; set; }
        public string Status { get; set; }
        public string PackageNumber { get; set; }
        public string Dimension { get; set; }
        public decimal? Weight { get; set; }
        public string WeightUnit { get; set; }
        public int ShipmentPackageRateID { get; set; }
        public int ShippingCarrierID { get; set; }
        public int ShippingServiceID { get; set; }
        public int ShippingPackageID { get; set; }
        public decimal? ShippingRate { get; set; }
        public string TrackingNumber { get; set; }
        public string USPSPICNumber { get; set; }
        public string ShippingLabelPath { get; set; }
        public DateTime? ShipDate { get; set; }
        public bool IsRated { get; set; }
        public bool IsLabeled { get; set; }
        public bool IsManual { get; set; }
        public DateTime UpdatedOn { get; set; }
        public DateTime CreatedOn { get; set; }

    }
}
