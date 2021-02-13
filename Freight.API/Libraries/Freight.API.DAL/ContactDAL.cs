using Dapper;
using Freight.API.Common;
using Freight.API.Common.Configuration;
using Freight.API.Common.Model.Contact;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Freight.API.DAL
{
    public class ContactDAL
    {
        private string DefaultConnection;

        public ContactDAL(Connection connection, Setting settings)
        {
            DefaultConnection = connection.Default;
        }

        public List<Contact> GetContacts()
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                List<Contact> results = connection.Query<Contact>("spGetContacts", commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }

        public Contact GetContact(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("contactid", id);
                Contact result = connection.Query<Contact>("spGetContact", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public List<Contact> GetContactByCustomerID(int businessid)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("businessid", businessid);
                List<Contact> results = connection.Query<Contact>("spGetContactByCustomerID", p, commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }
        public Contact UpdateContact(ContactUpdate contact)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("businessid", contact.BusinessID);
                p.Add("customerid", contact.CustomerID);
                p.Add("fullname", contact.FullName);
                p.Add("email", contact.Email);
                p.Add("title", contact.Title);
                p.Add("updatedby", contact.UpdatedBy);
                Contact result = connection.Query<Contact>("spUpdateContact", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public Contact CreateContact(ContactInsert contact)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("businessid", contact.BusinessID);
                p.Add("customerid", contact.CustomerID);
                p.Add("fullname", contact.FullName);
                p.Add("email", contact.Email);
                p.Add("title", contact.Title);
                p.Add("createdby", contact.CreatedBy);
                Contact result = connection.Query<Contact>("spCreateContact", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public void DeleteContact(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("Contactid", id);
                connection.Query<Contact>("spDeleteContact", p, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
