using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Business
{
    public class BusinessUpdate
    {
        public int BusinessID { get; set; }
        public int UserID { get; set; }
        public string CompanyName { get; set; }
        public bool IsShipper { get; set; }
        public bool Is3PL { get; set; }
        public bool IsFFW { get; set; }
    }
}
