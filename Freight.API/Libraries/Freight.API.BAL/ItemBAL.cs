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

        public Item CreateItem(Item item)
        {
            return ItemDAL.CreateItem(item);
        }
        public Item UpdateItem(Item item)
        {
            return ItemDAL.UpdateItem(item);
        }
        public void DeleteItem(int id)
        {
            ItemDAL.DeleteItem(id);
        }

    }
}
