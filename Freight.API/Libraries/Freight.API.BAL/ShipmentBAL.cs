﻿using Freight.API.Common;
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

        public ShipmentDetail GetShipmentDetail(int shipmentid)
        {
            ShipmentDetail shipmentDetail = new ShipmentDetail();

            shipmentDetail.Shipment = GetShipment(shipmentid);
            shipmentDetail.ShipmentLines = ShipmentDAL.GetShipmentLines(shipmentid);
            shipmentDetail.ShipmentPackages = ShipmentDAL.GetShipmentPackages(shipmentid);
            shipmentDetail.ShipmentFees = ShipmentDAL.GetShipmentFees(shipmentid);
            shipmentDetail.ShipmentContacts = ShipmentDAL.GetShipmentContacts(shipmentid);

            return shipmentDetail;
        }

        public Shipment GetShipment(int id)
        {
            Shipment shipment = ShipmentDAL.GetShipment(id);
           
            return ShipmentDAL.GetShipment(id);
        }

        public Shipment UpdateShipment(ShipmentUpdate shipment)
        {
            return ShipmentDAL.UpdateShipment(shipment);
        }
        public ShipmentLine UpdateShipmentLine(ShipmentLineUpdate shipmentline)
        {
            return ShipmentDAL.UpdateShipmentLine(shipmentline);
        }
        public ShipmentPackage UpdateShipmentPackage(ShipmentPackageUpdate shipmentpackage)
        {
            return ShipmentDAL.UpdateShipmentPackage(shipmentpackage);
        }
        public ShipmentFee UpdateShipmentFee(ShipmentFeeUpdate shipmentfee)
        {
            return ShipmentDAL.UpdateShipmentFee(shipmentfee);
        }
        public ShipmentContact UpdateShipmentContact(ShipmentContactUpdate shipmentcontact)
        {
            return ShipmentDAL.UpdateShipmentContact(shipmentcontact);
        }

        public Shipment CreateShipment(ShipmentInsert shipment)
        {
            return ShipmentDAL.CreateShipment(shipment);
        }
        public ShipmentLine CreateShipmentLine(ShipmentLineInsert shipmentline)
        {
            return ShipmentDAL.CreateShipmentLine(shipmentline);
        }
        public ShipmentPackage CreateShipmentPackage(ShipmentPackageInsert shipmentpackage)
        {
            return ShipmentDAL.CreateShipmentPackage(shipmentpackage);
        }
        public ShipmentFee CreateShipmentFee(ShipmentFeeInsert shipmentfee)
        {
            return ShipmentDAL.CreateShipmentFee(shipmentfee);
        }
        public ShipmentContact CreateShipmentContact(ShipmentContactInsert shipmentcontact)
        {
            return ShipmentDAL.CreateShipmentContact(shipmentcontact);
        }

        public ShipmentDetail CreateShipmentDetail(ShipmentDetailInsert shipmentdetail)
        {
            return ShipmentDAL.CreateShipmentDetail(shipmentdetail);
        }

        public void DeleteShipment(int id)
        {
            ShipmentDAL.DeleteShipment(id);
        }
        public void DeleteShipmentLine(int id)
        {
            ShipmentDAL.DeleteShipmentLine(id);
        }
        public void DeleteShipmentPackage(int id)
        {
            ShipmentDAL.DeleteShipmentPackage(id);
        }
        public void DeleteShipmentFee(int id)
        {
            ShipmentDAL.DeleteShipmentFee(id);
        }
        public void DeleteShipmentContact(int id)
        {
            ShipmentDAL.DeleteShipmentContact(id);
        }
    }
}
