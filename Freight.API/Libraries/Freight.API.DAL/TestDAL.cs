using Dapper;
using Freight.API.Common;
using Freight.API.Common.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Freight.API.DAL
{
    public class TestDAL
    {
        private string _defaultconnection;

        public TestDAL(Connection connection, Setting settings)
        {
            _defaultconnection = connection.Default;
        }

        public TestCommon GetData()
        {
            using (SqlConnection connection = new SqlConnection(_defaultconnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("param_name1", "param_value1");
                p.Add("param_name2", "param_value2");
                // List<TestCommon> results = connection.Query<TestCommon>("stored_procedure_name", p, commandType: CommandType.StoredProcedure).ToList();
            }

            TestCommon value = new TestCommon
            {
                valueOne = "one",
                valueTwo = "two"
            };
            return value;
        }
    }
}
