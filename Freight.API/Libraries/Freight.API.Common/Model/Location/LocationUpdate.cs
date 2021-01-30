using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Location
{
    public class LocationUpdate
    {
        public int LocationID { get; set; }
        public int BusinessID { get; set; }
        public string LocationName { get; set; }
    }
}
