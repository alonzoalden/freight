using Freight.API.Common.Configuration;
using Freight.API.Common.Model.Customer;
using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.BAL
{
    public class CustomerBAL
    {
        private DAL.CustomerDAL CustomerDAL;

        public CustomerBAL(Connection connection, Setting setting)
        {
            CustomerDAL = new DAL.CustomerDAL(connection, setting);
        }
        public List<Customer> GetCustomers()
        {
            return CustomerDAL.GetCustomers();
        }

        public Customer GetCustomer(int id)
        {
            return CustomerDAL.GetCustomer(id);
        }
        public List<Customer> GetCustomerByBusinessID(int businessid)
        {
            return CustomerDAL.GetCustomerByBusinessID(businessid);
        }
        public Customer CreateCustomer(CustomerInsert customer)
        {
            return CustomerDAL.CreateCustomer(customer);
        }
        public Customer UpdateCustomer(CustomerUpdate customer)
        {
            return CustomerDAL.UpdateCustomer(customer);
        }
        public void DeleteCustomer(int id)
        {
            CustomerDAL.DeleteCustomer(id);
        }
    }
}
