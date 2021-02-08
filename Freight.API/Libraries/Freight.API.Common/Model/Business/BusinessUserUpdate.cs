using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Business
{
    public class BusinessUserUpdate
    {
        public int BusinessUserID { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsOwner { get; set; }
        public bool IsActive { get; set; }
    }
}
