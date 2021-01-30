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
                p.Add("Businessid", id);
                Business result = connection.Query<Business>("spGetBusiness", p, commandType: CommandType.StoredProcedure).Single();

                return result;
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
    }
}
