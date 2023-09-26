// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace VSOnline.VSECommerce.Persistence
{
    public class ACL
    {
        public enum PageType
        {
            Admin,            
            AddProducts, 
            AddStores,
            AddPricing,
            AddPartners,
            ViewPartners,
            ViewStores,
            ViewPricing
        }
        public bool HasAccess(PageType permissionRecord, string username)
        {
            HasPermissionRecordAccess(permissionRecord.ToString(), username);
            return true;
        }

        private void HasPermissionRecordAccess(string permissionRecordName, string username)
        {
         //  using (var dbContext = new DataContext())
        }

    }
}
