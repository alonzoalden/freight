using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Contact
{
    public class ContactInsert
    {
        public int BusinessID { get; set; }
        public int CustomerID { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Title { get; set; }
        public int CreatedBy { get; set; }
    }
}
