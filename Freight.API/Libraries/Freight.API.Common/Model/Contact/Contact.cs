using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Contact
{
    public class Contact
    {
        public int ContactID { get; set; }
        public int BusinessID { get; set; }
        public int CustomerID { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Title { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime? UpdatedOn{ get; set; }
        public DateTime CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
