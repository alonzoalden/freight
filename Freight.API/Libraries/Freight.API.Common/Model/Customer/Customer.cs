using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Customer
{
    public class Customer
    {
        public int CustomerID { get; set; }
        public int BusinessID { get; set; }
        public int CompanyName { get; set; }
        public int Email { get; set; }
        public int APEmail { get; set; }
        public int UpdatedBy { get; set; }
        public int UpdatedOn { get; set; }
        public int CreatedBy { get; set; }
        public int CreatedOn { get; set; }
    }
}
