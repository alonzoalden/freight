using Freight.API.Common;
using Freight.API.DAL;

namespace Freight.API.BAL
{
    public class TestBAL
    {
        public TestCommon getValue()
        {
            TestDAL dal = new TestDAL();
            return dal.GetData();
        }
    }
}
