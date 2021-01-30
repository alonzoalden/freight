using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Fee
{
    public class FeeUpdate
    {
        public int FeeID { get; set; }
        public int BusinessID { get; set; }
        public string FeeType { get; set; }
        public string Description { get; set; }
        public decimal FeeAmount { get; set; }
    }
}
