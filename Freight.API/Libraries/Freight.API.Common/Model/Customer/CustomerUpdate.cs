using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Customer
{
    public class CustomerUpdate
    {
        public int CustomerID { get; set; }
        public int BusinessID { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string APEmail { get; set; }
        public int UpdatedBy { get; set; }
    }
}
