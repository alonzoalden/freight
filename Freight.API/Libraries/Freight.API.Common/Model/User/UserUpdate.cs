﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.Common.Model.User
{
    public class UserUpdate
    {
        public int UserID { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? BusinessID { get; set; }
    }
}
