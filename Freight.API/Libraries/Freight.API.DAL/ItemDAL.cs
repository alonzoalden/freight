using Dapper;
using Freight.API.Common;
using Freight.API.Common.Configuration;
using Freight.API.Common.Model.Item;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Freight.API.DAL
{
    public class ItemDAL
    {
        private string DefaultConnection;

        public ItemDAL(Connection connection, Setting settings)
        {
            DefaultConnection = connection.Default;
        }

        public List<Item> GetItems()
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                List<Item> results = connection.Query<Item>("spGetItems", commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }

        public Item GetItem(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("itemid", id);
                Item result = connection.Query<Item>("spGetItem", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public List<Item> GetItemByBusinessID(int businessid)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("businessid", businessid);
                List<Item> results = connection.Query<Item>("spGetItemByBusinessID", p, commandType: CommandType.StoredProcedure).ToList();

                return results;
            }
        }
        public Item UpdateItem(ItemUpdate item)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("itemid", item.ItemID);
                p.Add("businessid", item.BusinessID);
                p.Add("shipperid", item.ShipperID);
                p.Add("itemnumber", item.ItemNumber);
                p.Add("itemname", item.ItemName);
                p.Add("htscode", item.HTSCode);
                p.Add("fnsku", item.FNSKU);
                p.Add("asin", item.ASIN);
                p.Add("weight", item.Weight);
                p.Add("weightunit", item.WeightUnit);
                p.Add("unitprice", item.UnitPrice);
                p.Add("currency", item.Currency);
                Item result = connection.Query<Item>("spUpdateItem", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }
        public Item CreateItem(ItemInsert item)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("businessid", item.BusinessID);
                p.Add("shipperid", item.ShipperID);
                p.Add("itemnumber", item.ItemNumber);
                p.Add("itemname", item.ItemName);
                p.Add("htscode", item.HTSCode);
                p.Add("fnsku", item.FNSKU);
                p.Add("asin", item.ASIN);
                p.Add("weight", item.Weight);
                p.Add("weightunit", item.WeightUnit);
                p.Add("unitprice", item.UnitPrice);
                p.Add("currency", item.Currency);
                Item result = connection.Query<Item>("spCreateItem", p, commandType: CommandType.StoredProcedure).Single();

                return result;
            }
        }       
        public void DeleteItem(int id)
        {
            using (SqlConnection connection = new SqlConnection(DefaultConnection))
            {
                DynamicParameters p = new DynamicParameters();
                p.Add("itemid", id);
                connection.Query<Item>("spDeleteItem", p, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
