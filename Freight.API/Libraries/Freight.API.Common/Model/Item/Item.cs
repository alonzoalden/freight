using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Item
{
    public class Item
    {
        public int ItemID { get; set; }
        public int BusinessID { get; set; }
        public int ShipperID { get; set; }
        public string ItemNumber { get; set; }
        public string ItemName { get; set; }
        public string HTSCode { get; set; }
        public string FNSKU { get; set; }
        public string ASIN { get; set; }
        public decimal? Weight { get; set; }
        public string WeightUnit { get; set; }
        public decimal? UnitPrice { get; set; }
        public string Currency { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
