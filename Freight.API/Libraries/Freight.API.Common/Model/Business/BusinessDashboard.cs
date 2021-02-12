using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Business
{
    public class BusinessDashboard
    {
        public int BusinessID { get; set; }
        public string CompanyName { get; set; }
        public int Customer { get; set; }
        public int Item { get; set; }
        public int BusinessUser { get; set; }
        public int ShipmentOpen { get; set; }
        public int ShipmentClosed { get; set; }
        public int ShipmentCancelled { get; set; }
        public int InvoiceOpen { get; set; }
        public int InvoiceClosed { get; set; }
        public int  InvoicePastDue { get; set; }
    }
}
