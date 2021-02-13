using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.Business
{
    public class BusinessUser
    {
        public int BusinessUserID { get; set; }
        public int BusinessID { get; set; }

        public int UserID { get; set; }
        public string UserEmail { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        
        public bool IsAdmin{ get; set; }
        public bool IsOwner { get; set; }
        public bool IsActive { get; set; }
        public DateTime UpdatedOn { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
