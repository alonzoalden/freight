using Freight.API.Common;
using Freight.API.Common.Configuration;
using Freight.API.Common.Model.User;
using Freight.API.DAL;
using System.Collections.Generic;

namespace Freight.API.BAL
{
    public class UserBAL
    {
        DAL.UserDAL userDAL;

        public UserBAL(Connection connection, Setting setting)
        {
            userDAL = new DAL.UserDAL(connection, setting);
        }

        public List<User> GetUsers()
        {
            return userDAL.GetUsers();
        }

        public User GetUser(int id)
        {
            return userDAL.GetUser(id);
        }
        public User UpdateUser(User user)
        {
            return userDAL.UpdateUser(user);
        }
        public User CreateUser(User user)
        {
            return userDAL.CreateUser(user);
        }
        
    }
}
