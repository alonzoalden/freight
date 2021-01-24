using Dapper;
using Freight.API.Common.Configuration;
using Freight.API.Common.Model.Address;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace Freight.API.DAL
{
    public class AddressDAL
    {
        private string DefaultConnection = string.Empty;

        public AddressDAL(Connection connection, Setting settings)
        {
            DefaultConnection = connection.Default;
        }
        public Address GetAddress(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("addressid", id);
                Address result = connection.Query<Address>("spGetAddress", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }

        public Address CreateAddress(Address address)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("fullname", address.FullName);
                p.Add("attention", address.Attention);
                p.Add("companyname", address.CompanyName);
                p.Add("address1", address.Address1);
                p.Add("address2", address.Address2);
                p.Add("address3", address.Address3);
                p.Add("city", address.City);
                p.Add("state", address.State);
                p.Add("postalcode", address.PostalCode);
                p.Add("countryid", address.CountryID);
                p.Add("email", address.Email);
                p.Add("phone", address.Phone);

                Address result = connection.Query<Address>("spCreateAddress", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }

        public Address UpdateAddress(Address address)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("addressid", address.AddressID);
                p.Add("fullname", address.FullName);
                p.Add("attention", address.Attention);
                p.Add("companyname", address.CompanyName);
                p.Add("address1", address.Address1);
                p.Add("address2", address.Address2);
                p.Add("address3", address.Address3);
                p.Add("city", address.City);
                p.Add("state", address.State);
                p.Add("postalcode", address.PostalCode);
                p.Add("countryid", address.CountryID);
                p.Add("email", address.Email);
                p.Add("phone", address.Phone);

                Address result = connection.Query<Address>("spUpdateAddress", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }

        public void DeleteAddress(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("addressid", id);
                connection.Query<Address>("spDeleteAddress", p, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
