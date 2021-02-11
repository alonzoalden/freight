using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Freight.API.Auth
{
    /// <summary> 
    /// Authorization Controller Base 
    /// </summary> 
    [Authorize]
    public class AuthorizationControllerBase : ControllerBase
    {
        /// <summary> 
        /// Int Example 
        /// </summary> 
        protected int Int_Example
        {
            get
            {
                int.TryParse(ClaimValueOrEmpty("fbasimplifyuserid"), out int id);
                return id;
            }
        }

        /// <summary> 
        /// String Example 
        /// </summary> 
        protected string String_Example
        {
            get
            {
                return ClaimValueOrEmpty("client_id");
            }
        }

        /// <summary> 
        /// Returns claim's value or an empty string 
        /// </summary> 
        /// <param name="name"></param> 
        /// <returns></returns> 
        private string ClaimValueOrEmpty(string name)
        {
            Claim claim = User.Claims.FirstOrDefault(x => x.Type.ToLower() == name.ToLower());
            return (claim != null) ? claim.Value : string.Empty;
        }
    }
}