using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Shipment
{
    public class ShipmentContact
    {
        public int ShipmentContactID { get; set; }
        public int BusinessID { get; set; }
        public int ShipmentID { get; set; }
        public int ContactID { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }

    }
}
