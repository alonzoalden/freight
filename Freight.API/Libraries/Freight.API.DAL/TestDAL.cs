using Freight.API.Common;
using System;

namespace Freight.API.DAL
{
    public class TestDAL
    {
        public TestCommon GetData()
        {
            TestCommon value = new TestCommon
            {
                valueOne = "one",
                valueTwo = "two"
            };
            return value;
        }
    }
}
