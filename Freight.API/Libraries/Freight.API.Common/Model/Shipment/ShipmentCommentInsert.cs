using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Shipment
{
    public class ShipmentCommentInsert
    {
        public int ShipmentID { get; set; }
        public string Comment { get; set; }
        public int CreatedBy { get; set; }
    }
}
