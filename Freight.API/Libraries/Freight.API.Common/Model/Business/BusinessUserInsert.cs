using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Business
{
    public class BusinessUserInsert
    {
        public int BusinessID { get; set; }
        public int UserID { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsOwner { get; set; }
    }
}
