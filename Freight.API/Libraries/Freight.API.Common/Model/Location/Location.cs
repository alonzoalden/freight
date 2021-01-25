using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Location
{
    public class Location
    {
        public int LocationID { get; set; }
        public int BusinessID { get; set; }
        public string LocationName { get; set; }
        public DateTime UpdatedOn { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
