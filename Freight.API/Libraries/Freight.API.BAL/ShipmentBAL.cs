using Freight.API.Common;
using Freight.API.Common.Configuration;
using Freight.API.Common.Model.Shipment;
using Freight.API.DAL;
using System.Collections.Generic;
namespace Freight.API.BAL
{
    public class ShipmentBAL
    {
        private DAL.ShipmentDAL ShipmentDAL;

        public ShipmentBAL(Connection connection, Setting setting)
        {
            ShipmentDAL = new DAL.ShipmentDAL(connection, setting);
        }

        public List<Shipment> GetShipments()
        {
            return ShipmentDAL.GetShipments();
        }

        public Shipment GetShipment(int id)
        {
            return ShipmentDAL.GetShipment(id);
        }
        public Shipment CreateShipment(Shipment shipment)
        {
            return ShipmentDAL.CreateShipment(shipment);
        }
    }
}
