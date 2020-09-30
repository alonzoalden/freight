using Freight.API.Common;
using Freight.API.Common.Configuration;
using Freight.API.DAL;

namespace Freight.API.BAL
{
    public class TestBAL
    {
        DAL.TestDAL _dal;

        public TestBAL(Connection connection, Setting setting)
        {
            _dal = new DAL.TestDAL(connection, setting);
        }

        public TestCommon getValue()
        {
            return _dal.GetData();
        }
    }
}
