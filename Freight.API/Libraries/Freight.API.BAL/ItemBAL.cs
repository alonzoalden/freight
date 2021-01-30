using Freight.API.Common.Configuration;
using Freight.API.Common.Model.Item;
using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.BAL
{
    public class ItemBAL
    {
        private DAL.ItemDAL ItemDAL;

        public ItemBAL(Connection connection, Setting setting)
        {
            ItemDAL = new DAL.ItemDAL(connection, setting);
        }

        public List<Item> GetItems()
        {
            return ItemDAL.GetItems();
        }

        public Item GetItem(int id)
        {
            return ItemDAL.GetItem(id);
        }
        public List<Item> GetItemByBusinessID(int businessid)
        {
            return ItemDAL.GetItemByBusinessID(businessid);
        }
        public Item CreateItem(ItemInsert item)
        {
            return ItemDAL.CreateItem(item);
        }
        public Item UpdateItem(ItemUpdate item)
        {
            return ItemDAL.UpdateItem(item);
        }
        public void DeleteItem(int id)
        {
            ItemDAL.DeleteItem(id);
        }

    }
}
