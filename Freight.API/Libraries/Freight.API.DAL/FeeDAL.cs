using Dapper;
using Freight.API.Common;
using Freight.API.Common.Configuration;
using Freight.API.Common.Model.Fee;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Freight.API.DAL
{
    public class FeeDAL
    {
        private string DefaultConnection;

        public FeeDAL(Connection connection, Setting settings)
        {
            DefaultConnection = connection.Default;
        }
        public List<Fee> GetFees()
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                List<Fee> results = connection.Query<Fee>("spGetFees", commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }
        public Fee GetFee(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("feeid", id);
                Fee result = connection.Query<Fee>("spGetFee", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public List<Fee> GetFeeByBusinessID(int businessid)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("businessid", businessid);
                List<Fee> results = connection.Query<Fee>("spGetFeeByBusinessID", p, commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }
        public Fee UpdateFee(FeeUpdate fee)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("feeid", fee.FeeID);
                p.Add("businessid", fee.BusinessID);
                p.Add("feetype", fee.FeeType);
                p.Add("description", fee.Description);
                p.Add("feeamount", fee.FeeAmount);

                Fee result = connection.Query<Fee>("spUpdateFee", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public Fee CreateFee(FeeInsert fee)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("businessid", fee.BusinessID);
                p.Add("feetype", fee.FeeType);
                p.Add("description", fee.Description);
                p.Add("feeamount", fee.FeeAmount);
                Fee result = connection.Query<Fee>("spCreateFee", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public void DeleteFee(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("feeid", id);
                connection.Query<Fee>("spDeleteFee", p, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
