using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Fee
{
    public class Fee
    {
        public int FeeID { get; set; }
        public int BusinessID { get; set; }
        public string FeeType { get; set; }
        public string Description { get; set; }
        public decimal FeeAmount { get; set; }
        public DateTime UpdatedOn { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
