using Freight.API.Common.Configuration;
using Freight.API.Common.Model.Business;
using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.BAL
{
    public class BusinessBAL
    {
        private DAL.BusinessDAL BusinessDAL;

        public BusinessBAL(Connection connection, Setting setting)
        {
            BusinessDAL = new DAL.BusinessDAL(connection, setting);
        }
        public List<Business> GetBusinesses()
        {
            return BusinessDAL.GetBusinesses();
        }
        public Business GetBusiness(int id)
        {
            return BusinessDAL.GetBusiness(id);
        }
        public List<Business> GetBusinessByUserID(int userid)
        {
            return BusinessDAL.GetBusinessByUserID(userid);
        }
        public Business CreateBusiness(BusinessInsert business)
        {
            return BusinessDAL.CreateBusiness(business);
        }
        public Business UpdateBusiness(BusinessUpdate business)
        {
            return BusinessDAL.UpdateBusiness(business);
        }
        public void DeleteBusiness(int id)
        {
            BusinessDAL.DeleteBusiness(id);
        }
    }
}
