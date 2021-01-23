using Dapper;
using Freight.API.Common;
using Freight.API.Common.Configuration;
using Freight.API.Common.Model.Shipment;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Freight.API.DAL
{
    public class ShipmentDAL
    {
        private string DefaultConnection = string.Empty;

        public ShipmentDAL(Connection connection, Setting settings)
        {
            DefaultConnection = connection.Default;
        }
        public List<Shipment> GetShipments()
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                List<Shipment> results = connection.Query<Shipment>("spGetShipments", commandType: CommandType.StoredProcedure).ToList();
                
                return results;
            }
        }
        public Shipment GetShipment(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentid", id);
                Shipment result = connection.Query<Shipment>("spGetShipment", p, commandType: CommandType.StoredProcedure).Single();

                result.ShipmentLines = GetShipmentLines(result.ShipmentID);
                result.ShipmentPackages = GetShipmentPackages(result.ShipmentID);
                result.ShipmentFees = GetShipmentFees(result.ShipmentID);
                result.ShipmentContacts = GetShipmentContacts(result.ShipmentID);
                return result;
            }
        }

        public List<ShipmentLine> GetShipmentLines(int shipmentid)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentid", shipmentid);
                List<ShipmentLine> results = connection.Query<ShipmentLine>("spGetShipmentLineByShipmentID", p, commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }

        public List<ShipmentPackage> GetShipmentPackages(int shipmentid)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentid", shipmentid);
                List<ShipmentPackage> results = connection.Query<ShipmentPackage>("spGetShipmentPackageByShipmentID", p, commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }

        public List<ShipmentFee> GetShipmentFees(int shipmentid)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentid", shipmentid);
                List<ShipmentFee> results = connection.Query<ShipmentFee>("spGetShipmentFeeByShipmentID", p, commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }

        public List<ShipmentContact> GetShipmentContacts(int shipmentid)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentid", shipmentid);
                List<ShipmentContact> results = connection.Query<ShipmentContact>("spGetShipmentContactByShipmentID", p, commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }

        public Shipment CreateShipment(Shipment shipment)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                connection.Open();
                SqlTransaction transaction = connection.BeginTransaction();

                DynamicParameters p = new DynamicParameters();
                p.Add("businessid", shipment.BusinessID);
                Shipment result = connection.Query<Shipment>("spCreateShipment", p, transaction, commandType: CommandType.StoredProcedure).Single();

                foreach(ShipmentLine _ShipmentLine in shipment.ShipmentLines)
                {
                    DynamicParameters p2 = new DynamicParameters();
                    p2.Add("shipmentid", result.ShipmentID);
                    ShipmentLine shipmentLine = connection.Query<ShipmentLine>("spCreateShipmentLine", p2, transaction, commandType: CommandType.StoredProcedure).Single();
                    result.ShipmentLines.Add(shipmentLine);
                }

                foreach (ShipmentPackage _ShipmentPackage in shipment.ShipmentPackages)
                {
                    DynamicParameters p2 = new DynamicParameters();
                    p2.Add("shipmentid", result.ShipmentID);
                    ShipmentPackage shipmentPackge = connection.Query<ShipmentPackage>("spCreateShipmentPackage", p2, transaction, commandType: CommandType.StoredProcedure).Single();
                    result.ShipmentPackages.Add(shipmentPackge);
                }

                foreach (ShipmentFee _ShipmentFee in shipment.ShipmentFees)
                {
                    DynamicParameters p2 = new DynamicParameters();
                    p2.Add("shipmentid", result.ShipmentID);
                    ShipmentFee shipmentFee = connection.Query<ShipmentFee>("spCreateShipmentFee", p2, transaction, commandType: CommandType.StoredProcedure).Single();
                    result.ShipmentFees.Add(shipmentFee);
                }

                foreach (ShipmentContact _ShipmentContact in shipment.ShipmentContacts)
                {
                    DynamicParameters p2 = new DynamicParameters();
                    p2.Add("shipmentid", result.ShipmentID);
                    ShipmentContact shipmentContact = connection.Query<ShipmentContact>("spCreateShipmentContact", p2, transaction, commandType: CommandType.StoredProcedure).Single();
                    result.ShipmentContacts.Add(shipmentContact);
                }
                transaction.Commit();
                return result;
            }
        }
    }
}
