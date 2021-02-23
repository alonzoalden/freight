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
                return result;
            }
        }
        public List<Shipment> GetShipmentByBusinessID(int businessid)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("businessid", businessid);
                List<Shipment> results = connection.Query<Shipment>("spGetShipmentByBusinessID", p, commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }
        public List<ShipmentLine> GetShipmentLineByShipmentID(int shipmentid)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentid", shipmentid);
                List<ShipmentLine> results = connection.Query<ShipmentLine>("spGetShipmentLineByShipmentID", p, commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }

        public List<ShipmentPackage> GetShipmentPackageByShipmentID(int shipmentid)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentid", shipmentid);
                List<ShipmentPackage> results = connection.Query<ShipmentPackage>("spGetShipmentPackageByShipmentID", p, commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }

        public List<ShipmentFee> GetShipmentFeeByShipmentID(int shipmentid)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentid", shipmentid);
                List<ShipmentFee> results = connection.Query<ShipmentFee>("spGetShipmentFeeByShipmentID", p, commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }

        public List<ShipmentContact> GetShipmentContactByShipmentID(int shipmentid)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentid", shipmentid);
                List<ShipmentContact> results = connection.Query<ShipmentContact>("spGetShipmentContactByShipmentID", p, commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }
        public List<ShipmentComment> GetShipmentCommentByShipmentID(int shipmentid)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentid", shipmentid);
                List<ShipmentComment> results = connection.Query<ShipmentComment>("spGetShipmentCommentByShipmentID", p, commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }
        public Shipment UpdateShipment(ShipmentUpdate shipment)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentid", shipment.ShipmentID);
                p.Add("businessid", shipment.BusinessID);
                p.Add("shipperid", shipment.ShipperID);
                p.Add("customerid", shipment.CustomerID);
                p.Add("originffw", shipment.OriginFFW);
                p.Add("origin3pl", shipment.Origin3PL);
                p.Add("destinationffw", shipment.DestinationFFW);
                p.Add("destination3pl", shipment.Destination3PL);
                p.Add("hblnumber", shipment.HBLNumber);
                p.Add("mblnumber", shipment.MBLNumber);
                p.Add("containernumber", shipment.ContainerNumber);
                p.Add("etd", shipment.ETD);
                p.Add("eta", shipment.ETA);
                p.Add("txl", shipment.TXL);
                p.Add("isffiled", shipment.ISFFiled);
                p.Add("deliverylocationid", shipment.DeliveryLocationID);
                p.Add("status", shipment.Status);
                p.Add("memo", shipment.Memo);
                p.Add("shipperreference", shipment.ShipperReference);
                p.Add("updatedby", shipment.UpdatedBy);

                Shipment result = connection.Query<Shipment>("spUpdateShipment", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public ShipmentLine UpdateShipmentLine(ShipmentLineUpdate shipmentline)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentlineid", shipmentline.ShipmentLineID);
                p.Add("shipmentid", shipmentline.ShipmentID);
                p.Add("itemid", shipmentline.ItemID);
                p.Add("quantity", shipmentline.Quantity);
                p.Add("unitprice", shipmentline.UnitPrice);

                ShipmentLine result = connection.Query<ShipmentLine>("spUpdateShipmentLine", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public ShipmentPackage UpdateShipmentPackage(ShipmentPackageUpdate shipmentpackage)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentpackageid", shipmentpackage.ShipmentPackageID);
                p.Add("shipmentid", shipmentpackage.ShipmentID);
                p.Add("businessid", shipmentpackage.BusinessID);
                p.Add("status", shipmentpackage.Status);
                p.Add("packagenumber", shipmentpackage.PackageNumber);
                p.Add("dimension", shipmentpackage.Dimension);
                p.Add("weight", shipmentpackage.Weight);
                p.Add("weightunit", shipmentpackage.WeightUnit);
                p.Add("shipmentpackagerateid", shipmentpackage.ShipmentPackageRateID);
                p.Add("shippingcarrierid", shipmentpackage.ShippingCarrierID);
                p.Add("shippingserviceid", shipmentpackage.ShippingServiceID);
                p.Add("shippingpackageid", shipmentpackage.ShippingPackageID);
                p.Add("shippingrate", shipmentpackage.ShippingRate);
                p.Add("trackingnumber", shipmentpackage.TrackingNumber);
                p.Add("uspspicnumber", shipmentpackage.USPSPICNumber);
                p.Add("shippinglablepath", shipmentpackage.ShippingLabelPath);
                p.Add("shipdate", shipmentpackage.ShipDate);
                p.Add("israted", shipmentpackage.IsRated);
                p.Add("islabeled", shipmentpackage.IsLabeled);
                p.Add("ismanual", shipmentpackage.IsManual);

                ShipmentPackage result = connection.Query<ShipmentPackage>("spUpdateShipmentPackage", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public ShipmentFee UpdateShipmentFee(ShipmentFeeUpdate shipmentfee)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentfeeid", shipmentfee.ShipmentFeeID);
                p.Add("shipmentid", shipmentfee.ShipmentID);
                p.Add("feeid", shipmentfee.FeeID);
                p.Add("feeamount", shipmentfee.FeeAmount);

                ShipmentFee result = connection.Query<ShipmentFee>("spUpdateShipmentFee", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public ShipmentContact UpdateShipmentContact(ShipmentContactUpdate shipmentcontact)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentcontactid", shipmentcontact.ShipmentContactID);
                p.Add("shipmentid", shipmentcontact.ShipmentID);
                p.Add("contactid", shipmentcontact.ContactID);
                p.Add("updatedby", shipmentcontact.UpdatedBy);

                ShipmentContact result = connection.Query<ShipmentContact>("spUpdateShipmentContact", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public ShipmentComment UpdateShipmentComment(ShipmentCommentUpdate shipmentcomment)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentcommentid", shipmentcomment.ShipmentCommentID);
                p.Add("comment", shipmentcomment.Comment);

                ShipmentComment result = connection.Query<ShipmentComment>("spUpdateShipmentComment", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public Shipment CreateShipment(ShipmentInsert shipment)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("businessid", shipment.BusinessID);
                p.Add("shipperid", shipment.ShipperID);
                p.Add("customerid", shipment.CustomerID);
                p.Add("originffw", shipment.OriginFFW);
                p.Add("origin3pl", shipment.Origin3PL);
                p.Add("destinationffw", shipment.DestinationFFW);
                p.Add("destination3pl", shipment.Destination3PL);
                p.Add("hblnumber", shipment.HBLNumber);
                p.Add("mblnumber", shipment.MBLNumber);
                p.Add("containernumber", shipment.ContainerNumber);
                p.Add("etd", shipment.ETD);
                p.Add("eta", shipment.ETA);
                p.Add("txl", shipment.TXL);
                p.Add("isffiled", shipment.ISFFiled);
                p.Add("deliverylocationid", shipment.DeliveryLocationID);
                p.Add("status", shipment.Status);
                p.Add("memo", shipment.Memo);
                p.Add("shipperreference", shipment.ShipperReference);
                p.Add("createdby", shipment.CreatedBy);

                Shipment result = connection.Query<Shipment>("spCreateShipment", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }

        public ShipmentLine CreateShipmentLine(ShipmentLineInsert shipmentline)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentid", shipmentline.ShipmentID);
                p.Add("itemid", shipmentline.ItemID);
                p.Add("quantity", shipmentline.Quantity);
                p.Add("unitprice", shipmentline.UnitPrice);

                ShipmentLine result = connection.Query<ShipmentLine>("spCreateShipmentLine", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public ShipmentPackage CreateShipmentPackage(ShipmentPackageInsert shipmentpackage)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentid", shipmentpackage.ShipmentID);
                p.Add("businessid", shipmentpackage.BusinessID);
                p.Add("status", shipmentpackage.Status);
                p.Add("packagenumber", shipmentpackage.PackageNumber);
                p.Add("dimension", shipmentpackage.Dimension);
                p.Add("weight", shipmentpackage.Weight);
                p.Add("weightunit", shipmentpackage.WeightUnit);
                p.Add("shipmentpackagerateid", shipmentpackage.ShipmentPackageRateID);
                p.Add("shippingcarrierid", shipmentpackage.ShippingCarrierID);
                p.Add("shippingserviceid", shipmentpackage.ShippingServiceID);
                p.Add("shippingpackageid", shipmentpackage.ShippingPackageID);
                p.Add("shippingrate", shipmentpackage.ShippingRate);
                p.Add("trackingnumber", shipmentpackage.TrackingNumber);
                p.Add("uspspicnumber", shipmentpackage.USPSPICNumber);
                p.Add("shippinglablepath", shipmentpackage.ShippingLabelPath);
                p.Add("shipdate", shipmentpackage.ShipDate);
                p.Add("israted", shipmentpackage.IsRated);
                p.Add("islabeled", shipmentpackage.IsLabeled);
                p.Add("ismanual", shipmentpackage.IsManual);

                ShipmentPackage result = connection.Query<ShipmentPackage>("spCreateShipmentPackage", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public ShipmentFee CreateShipmentFee(ShipmentFeeInsert shipmentfee)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentid", shipmentfee.ShipmentID);
                p.Add("feeid", shipmentfee.FeeID);
                p.Add("feeamount", shipmentfee.FeeAmount);

                ShipmentFee result = connection.Query<ShipmentFee>("spCreateShipmentFee", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public ShipmentContact CreateShipmentContact(ShipmentContactInsert shipmentcontact)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentid", shipmentcontact.ShipmentID);
                p.Add("contactid", shipmentcontact.ContactID);
                p.Add("createdby", shipmentcontact.CreatedBy);

                ShipmentContact result = connection.Query<ShipmentContact>("spCreateShipmentContact", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public ShipmentComment CreateShipmentComment(ShipmentCommentInsert shipmentcomment)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentid", shipmentcomment.ShipmentID);
                p.Add("comment", shipmentcomment.Comment);
                p.Add("createdby", shipmentcomment.CreatedBy);

                ShipmentComment result = connection.Query<ShipmentComment>("spCreateShipmentComment", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public ShipmentDetail CreateShipmentDetail(ShipmentDetailInsert shipmentdetail)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                connection.Open();
                SqlTransaction transaction = connection.BeginTransaction();

                ShipmentDetail shipmentDetail = new ShipmentDetail();

                DynamicParameters p = new DynamicParameters();
                p.Add("businessid", shipmentdetail.Shipment.BusinessID);
                p.Add("shipperid", shipmentdetail.Shipment.ShipperID);
                p.Add("customerid", shipmentdetail.Shipment.CustomerID);
                p.Add("originffw", shipmentdetail.Shipment.OriginFFW);
                p.Add("origin3pl", shipmentdetail.Shipment.Origin3PL);
                p.Add("destinationffw", shipmentdetail.Shipment.DestinationFFW);
                p.Add("destination3pl", shipmentdetail.Shipment.Destination3PL);
                p.Add("hblnumber", shipmentdetail.Shipment.HBLNumber);
                p.Add("mblnumber", shipmentdetail.Shipment.MBLNumber);
                p.Add("containernumber", shipmentdetail.Shipment.ContainerNumber);
                p.Add("etd", shipmentdetail.Shipment.ETD);
                p.Add("eta", shipmentdetail.Shipment.ETA);
                p.Add("txl", shipmentdetail.Shipment.TXL);
                p.Add("isffiled", shipmentdetail.Shipment.ISFFiled);
                p.Add("deliverylocationid", shipmentdetail.Shipment.DeliveryLocationID);
                p.Add("status", shipmentdetail.Shipment.Status);
                p.Add("memo", shipmentdetail.Shipment.Memo);
                p.Add("shipperreference", shipmentdetail.Shipment.ShipperReference);
                p.Add("createdby", shipmentdetail.Shipment.CreatedBy);
                Shipment shipment = connection.Query<Shipment>("spCreateShipment", p, transaction, commandType: CommandType.StoredProcedure).Single();

                shipmentDetail.Shipment = shipment;

                foreach (ShipmentLineInsert _ShipmentLine in shipmentdetail.ShipmentLines)
                {
                    DynamicParameters p2 = new DynamicParameters();
                    p2.Add("shipmentid", shipment.ShipmentID);
                    ShipmentLine shipmentLine = connection.Query<ShipmentLine>("spCreateShipmentLine", p2, transaction, commandType: CommandType.StoredProcedure).Single();
                    shipmentDetail.ShipmentLines.Add(shipmentLine);
                }

                foreach (ShipmentPackageInsert _ShipmentPackage in shipmentdetail.ShipmentPackages)
                {
                    DynamicParameters p2 = new DynamicParameters();
                    p2.Add("shipmentid", shipment.ShipmentID);
                    ShipmentPackage shipmentPackge = connection.Query<ShipmentPackage>("spCreateShipmentPackage", p2, transaction, commandType: CommandType.StoredProcedure).Single();
                    shipmentDetail.ShipmentPackages.Add(shipmentPackge);
                }

                foreach (ShipmentFeeInsert _ShipmentFee in shipmentdetail.ShipmentFees)
                {
                    DynamicParameters p2 = new DynamicParameters();
                    p2.Add("shipmentid", shipment.ShipmentID);
                    ShipmentFee shipmentFee = connection.Query<ShipmentFee>("spCreateShipmentFee", p2, transaction, commandType: CommandType.StoredProcedure).Single();
                    shipmentDetail.ShipmentFees.Add(shipmentFee);
                }

                foreach (ShipmentContactInsert _ShipmentContact in shipmentdetail.ShipmentContacts)
                {
                    DynamicParameters p2 = new DynamicParameters();
                    p2.Add("shipmentid", shipment.ShipmentID);
                    ShipmentContact shipmentContact = connection.Query<ShipmentContact>("spCreateShipmentContact", p2, transaction, commandType: CommandType.StoredProcedure).Single();
                    shipmentDetail.ShipmentContacts.Add(shipmentContact);
                }
                transaction.Commit();
                return shipmentDetail;
            }
        }

        public void DeleteShipment(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentid", id);
                connection.Query<Shipment>("spDeleteShipment", p, commandType: CommandType.StoredProcedure);
            }
        }
        public void DeleteShipmentLine(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentlineid", id);
                connection.Query<Shipment>("spDeleteShipmentLine", p, commandType: CommandType.StoredProcedure);
            }
        }
        public void DeleteShipmentPackage(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentpackageid", id);
                connection.Query<Shipment>("spDeleteShipmentPackage", p, commandType: CommandType.StoredProcedure);
            }
        }
        public void DeleteShipmentFee(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentfeeid", id);
                connection.Query<Shipment>("spDeleteShipmentFee", p, commandType: CommandType.StoredProcedure);
            }
        }
        public void DeleteShipmentContact(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentcontactid", id);
                connection.Query<Shipment>("spDeleteShipmentContact", p, commandType: CommandType.StoredProcedure);
            }
        }
        public void DeleteShipmentComment(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("shipmentcommentid", id);
                connection.Query<Shipment>("spDeleteShipmentComment", p, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
