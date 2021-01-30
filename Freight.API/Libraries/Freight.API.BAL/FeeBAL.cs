using Freight.API.Common.Configuration;
using Freight.API.Common.Model.Fee;
using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.BAL
{
    public class FeeBAL
    {
        private DAL.FeeDAL FeeDAL;

        public FeeBAL(Connection connection, Setting setting)
        {
            FeeDAL = new DAL.FeeDAL(connection, setting);
        }
        public List<Fee> GetFees()
        {
            return FeeDAL.GetFees();
        }

        public Fee GetFee(int id)
        {
            return FeeDAL.GetFee(id);
        }
        public List<Fee> GetFeeByBusinessID(int businessid)
        {
            return FeeDAL.GetFeeByBusinessID(businessid);
        }
        public Fee CreateFee(FeeInsert fee)
        {
            return FeeDAL.CreateFee(fee);
        }
        public Fee UpdateFee(FeeUpdate fee)
        {
            return FeeDAL.UpdateFee(fee);
        }
        public void DeleteFee(int id)
        {
            FeeDAL.DeleteFee(id);
        }
    }
}
