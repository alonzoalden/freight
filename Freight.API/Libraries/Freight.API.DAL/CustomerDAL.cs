using Dapper;
using Freight.API.Common;
using Freight.API.Common.Configuration;
using Freight.API.Common.Model.Customer;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Freight.API.DAL
{
    public class CustomerDAL
    {
        private string DefaultConnection;

        public CustomerDAL(Connection connection, Setting settings)
        {
            DefaultConnection = connection.Default;
        }

        public List<Customer> GetCustomers()
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                List<Customer> results = connection.Query<Customer>("spGetCustomers", commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }

        public Customer GetCustomer(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("customerid", id);
                Customer result = connection.Query<Customer>("spGetCustomer", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public List<Customer> GetCustomerByBusinessID(int businessid)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("businessid", businessid);
                List<Customer> results = connection.Query<Customer>("spGetCustomerByBusinessID", p, commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }
        public Customer UpdateCustomer(CustomerUpdate customer)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("customerid", customer.CustomerID);
                p.Add("businessid", customer.BusinessID);
                p.Add("companyname", customer.CompanyName);
                p.Add("email", customer.Email);
                p.Add("apemail", customer.APEmail);
                p.Add("updatedby", customer.UpdatedBy);
                Customer result = connection.Query<Customer>("spUpdateCustomer", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public Customer CreateCustomer(CustomerInsert customer)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("businessid", customer.BusinessID);
                p.Add("companyname", customer.CompanyName);
                p.Add("email", customer.Email);
                p.Add("apemail", customer.APEmail);
                p.Add("createdby", customer.CreatedBy);
                Customer result = connection.Query<Customer>("spCreateCustomer", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public void DeleteCustomer(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("customerid", id);
                connection.Query<Customer>("spDeleteCustomer", p, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
