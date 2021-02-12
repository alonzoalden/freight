using Dapper;
using Freight.API.Common;
using Freight.API.Common.Configuration;
using Freight.API.Common.Model.Business;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Freight.API.DAL
{
    public class BusinessDAL
    {
        private string DefaultConnection;

        public BusinessDAL(Connection connection, Setting settings)
        {
            DefaultConnection = connection.Default;
        }

        public List<Business> GetBusinesses()
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                List<Business> results = connection.Query<Business>("spGetBusinesses", commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }

        public Business GetBusiness(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("businessid", id);
                Business result = connection.Query<Business>("spGetBusiness", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public List<Business> GetBusinessByUserID(int userid)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("userid", userid);
                List<Business> results = connection.Query<Business>("spGetBusinessByUserID", p, commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }        
        public Business UpdateBusiness(BusinessUpdate Business)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("businessid", Business.BusinessID);
                p.Add("userid", Business.UserID);
                p.Add("companyname", Business.CompanyName);
                p.Add("isshipper", Business.IsShipper);
                p.Add("is3pl", Business.Is3PL);
                p.Add("isffw", Business.IsFFW);
                Business result = connection.Query<Business>("spUpdateBusiness", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public Business CreateBusiness(BusinessInsert Business)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("userid", Business.UserID);
                p.Add("companyname", Business.CompanyName);
                p.Add("isshipper", Business.IsShipper);
                p.Add("is3pl", Business.Is3PL);
                p.Add("isffw", Business.IsFFW);
                Business result = connection.Query<Business>("spCreateBusiness", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public void DeleteBusiness(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("businessid", id);
                connection.Query<Business>("spDeleteBusiness", p, commandType: CommandType.StoredProcedure);
            }
        }

        //Business Dashboard
        public BusinessDashboard GetBusinessDashboard(int businessid)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("businessid", businessid);
                BusinessDashboard result = connection.Query<BusinessDashboard>("spGetBusinessDashboard", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }

        //Business User
        public BusinessUser GetBusinessUser(int businessuserid)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("businessuserid", businessuserid);
                BusinessUser result = connection.Query<BusinessUser>("spGetBusinessUser", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public List<BusinessUser> GetBusinessUserByUserID(int userid)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("userid", userid);
                List<BusinessUser> results = connection.Query<BusinessUser>("spGetBusinessUserByUserID", p, commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }
        public List<BusinessUser> GetBusinessUserByBusinessID(int businessid)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("businessid", businessid);
                List<BusinessUser> results = connection.Query<BusinessUser>("spGetBusinessUserByBusinessID", p, commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }
        public BusinessUser UpdateBusinessUser(BusinessUserUpdate BusinessUser)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("businessuserid", BusinessUser.BusinessUserID);
                p.Add("isadmin", BusinessUser.IsAdmin);
                p.Add("isowner", BusinessUser.IsOwner);
                p.Add("isactive", BusinessUser.IsActive);
                BusinessUser result = connection.Query<BusinessUser>("spUpdateBusinessUser", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public BusinessUser CreateBusinessUser(BusinessUserInsert BusinessUser)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("@businessid", BusinessUser.BusinessID);
                p.Add("@userid", BusinessUser.UserID);
                p.Add("@isadmin", BusinessUser.IsAdmin);
                p.Add("@isowner", BusinessUser.IsOwner);
                BusinessUser result = connection.Query<BusinessUser>("spCreateBusinessUser", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
    }
}
