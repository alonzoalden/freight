using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Shipment
{
    public class ShipmentInsert
    {
        public int BusinessID { get; set; }
        public int ShipperID { get; set; }
        public int CustomerID { get; set; }
        public int OriginFFW { get; set; }
        public int Origin3PL { get; set; }
        public int DestinationFFW { get; set; }
        public int Destination3PL { get; set; }
        public string HBLNumber { get; set; }
        public string MBLNumber { get; set; }
        public string ContainerNumber { get; set; }
        public DateTime? ETD { get; set; }
        public DateTime? ETA { get; set; }
        public DateTime? TXL { get; set; }
        public bool ISFFiled { get; set; }
        public int DeliveryLocationID { get; set; }
        public string Status { get; set; }
        public string Memo { get; set; }
        public string ShipperReference { get; set; }
        public int CreatedBy { get; set; }
    }
}
