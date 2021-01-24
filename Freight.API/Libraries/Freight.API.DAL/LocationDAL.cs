using Dapper;
using Freight.API.Common;
using Freight.API.Common.Configuration;
using Freight.API.Common.Model.Location;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Freight.API.DAL
{
    public class LocationDAL
    {
        private string DefaultConnection;

        public LocationDAL(Connection connection, Setting settings)
        {
            DefaultConnection = connection.Default;
        }
        public List<Location> GetLocations()
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                List<Location> results = connection.Query<Location>("spGetLocations", commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }
        public Location GetLocation(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("locationid", id);
                Location result = connection.Query<Location>("spGetLocation", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public List<Location> GetLocationByBusinessID(int businessid)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("businessid", businessid);
                List<Location> results = connection.Query<Location>("spGetLocationByBusinessID", p, commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }
        public Location UpdateLocation(Location location)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("locationid", location.LocationID);
                p.Add("businessid", location.BusinessID);
                p.Add("locationname", location.LocationName);
                Location result = connection.Query<Location>("spUpdateLocation", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public Location CreateLocation(Location location)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("businessid", location.BusinessID);
                p.Add("locationname", location.LocationName);
                Location result = connection.Query<Location>("spCreateLocation", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public void DeleteLocation(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("locationid", id);
                connection.Query<Location>("spDeleteLocation", p, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
