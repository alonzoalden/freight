using Dapper;
using Freight.API.Common;
using Freight.API.Common.Configuration;
using Freight.API.Common.Model.User;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Freight.API.DAL
{
    public class UserDAL
    {
        private string DefaultConnection = string.Empty;

        public UserDAL(Connection connection, Setting settings)
        {
            DefaultConnection = connection.Default;
        }
        public List<User> GetUsers()
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                List<User> results = connection.Query<User>("spGetUsers", commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }

        public User GetUser(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("userid", id);
                User result = connection.Query<User>("spGetUser", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }

        public User CreateUser(UserInsert user)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("email", user.Email);
                p.Add("firstname", user.FirstName);
                p.Add("lastname", user.LastName);
                p.Add("businessid", user.BusinessID);
                User result = connection.Query<User>("spCreateUser", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        
        public User UpdateUser(UserUpdate user)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("userid", user.UserID);
                p.Add("email", user.Email);
                p.Add("firstname", user.FirstName);
                p.Add("lastname", user.LastName);
                p.Add("businessid", user.BusinessID);
                User result = connection.Query<User>("spUpdateUser", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }

        public void DeleteUser(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("userid", id);
                connection.Query<User>("spDeleteUser", p, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
