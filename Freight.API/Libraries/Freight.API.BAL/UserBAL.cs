using Freight.API.Common;
using Freight.API.Common.Configuration;
using Freight.API.Common.Model.User;
using Freight.API.DAL;
using System.Collections.Generic;

namespace Freight.API.BAL
{
    public class UserBAL
    {
        private DAL.UserDAL UserDAL;

        public UserBAL(Connection connection, Setting setting)
        {
            UserDAL = new DAL.UserDAL(connection, setting);
        }

        public List<User> GetUsers()
        {
            return UserDAL.GetUsers();
        }

        public User GetUser(int id)
        {
            return UserDAL.GetUser(id);
        }
        public User UpdateUser(UserUpdate user)
        {
            return UserDAL.UpdateUser(user);
        }
        public User CreateUser(UserInsert user)
        {
            User User = UserDAL.CreateUser(user);

            //CreateIdentiyServerUSer()

            return User;
        }        

        public void DeleteUser(int id)
        {
            UserDAL.DeleteUser(id);
        }

        protected void CreateIdentityServerUser()
        {

        }
    }
}
