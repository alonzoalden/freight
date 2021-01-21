using Freight.API.Common.Configuration;
using Freight.API.Common.Model.Item;
using System;
using System.Collections.Generic;
using System.Text;

namespace Freight.API.BAL
{
    public class ItemBAL
    {
        DAL.ItemDAL itemDAL;

        public ItemBAL(Connection connection, Setting setting)
        {
            itemDAL = new DAL.ItemDAL(connection, setting);
        }

        public List<Item> GetItems()
        {
            return itemDAL.GetItems();
        }

        public Item GetItem(int id)
        {
            return itemDAL.GetItem(id);
        }

        public void CreateItem(Item item)
        {
            itemDAL.CreateItem(item);
        }
        public void UpdateItem(Item item)
        {
            itemDAL.UpdateItem(item);
        }
    }
}
