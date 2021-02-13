using Freight.API.Common.Configuration;
using Freight.API.Common.Model.Contact;
using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.BAL
{
    public class ContactBAL
    {
        private DAL.ContactDAL ContactDAL;

        public ContactBAL(Connection connection, Setting setting)
        {
            ContactDAL = new DAL.ContactDAL(connection, setting);
        }
        public List<Contact> GetContacts()
        {
            return ContactDAL.GetContacts();
        }

        public Contact GetContact(int id)
        {
            return ContactDAL.GetContact(id);
        }
        public List<Contact> GetContactByCustomerID(int customerid)
        {
            return ContactDAL.GetContactByCustomerID(customerid);
        }
        public Contact CreateContact(ContactInsert contact)
        {
            return ContactDAL.CreateContact(contact);
        }
        public Contact UpdateContact(ContactUpdate contact)
        {
            return ContactDAL.UpdateContact(contact);
        }
        public void DeleteContact(int id)
        {
            ContactDAL.DeleteContact(id);
        }
    }
}
