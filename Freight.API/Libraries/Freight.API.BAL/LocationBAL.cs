using Freight.API.Common.Configuration;
using Freight.API.Common.Model.Location;
using System;
using System.Collections.Generic;
using System.Text;


namespace Freight.API.BAL
{
    public class LocationBAL
    {
        private DAL.LocationDAL LocationDAL;

        public LocationBAL(Connection connection, Setting setting)
        {
            LocationDAL = new DAL.LocationDAL(connection, setting);
        }
        public List<Location> GetLocations()
        {
            return LocationDAL.GetLocations();
        }

        public Location GetLocation(int id)
        {
            return LocationDAL.GetLocation(id);
        }
        public List<Location> GetLocationByBusinessID(int businessid)
        {
            return LocationDAL.GetLocationByBusinessID(businessid);
        }
        public Location CreateLocation(LocationInsert Location)
        {
            return LocationDAL.CreateLocation(Location);
        }
        public Location UpdateLocation(LocationUpdate Location)
        {
            return LocationDAL.UpdateLocation(Location);
        }
        public void DeleteLocation(int id)
        {
            LocationDAL.DeleteLocation(id);
        }
    }
}
