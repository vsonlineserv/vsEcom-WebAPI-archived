////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using VSOnline.VSECommerce.Persistence;
using VSOnline.VSECommerce.Persistence.Entity;
using VSOnline.VSECommerce.Utilities;

namespace VSOnline.VSECommerce.Persistence.Migration
{
    public class DataLoadRoles
    {
        public void AddRoles()
        {
            IList<Role> defaultRoles = new List<Role>();

            defaultRoles.Add(new Role()
            {
                RoleId = (int)Enums.Role.Administrators,
                Name = Enums.Role.Administrators.ToString(),
                FreeShipping = false,
                Active = true,
                IsSystemRole = true,
                SystemName = Enums.Role.Administrators.ToString()
                ,
                TaxDisplayType = null,
                TaxExempt = false
            });

            defaultRoles.Add(new Role()
            {
                RoleId = (int)Enums.Role.ForumModerators,
                Name = Enums.Role.ForumModerators.ToString(),
                FreeShipping = false,
                Active = true,
                IsSystemRole = true,
                SystemName = Enums.Role.ForumModerators.ToString()
                ,
                TaxDisplayType = null,
                TaxExempt = false
            });

            defaultRoles.Add(new Role()
            {
                RoleId = (int)Enums.Role.Guests,
                Name = Enums.Role.Guests.ToString(),
                FreeShipping = false,
                Active = true,
                IsSystemRole = true,
                SystemName = Enums.Role.Guests.ToString()
                ,
                TaxDisplayType = null,
                TaxExempt = false
            });

            defaultRoles.Add(new Role()
            {
                RoleId = (int)Enums.Role.Registered,
                Name = Enums.Role.Registered.ToString(),
                FreeShipping = false,
                Active = true,
                IsSystemRole = true,
                SystemName = Enums.Role.Registered.ToString()
                ,
                TaxDisplayType = null,
                TaxExempt = false
            });

            defaultRoles.Add(new Role()
            {
                RoleId = (int)Enums.Role.StoreAdmin,
                Name = Enums.Role.StoreAdmin.ToString(),
                FreeShipping = false,
                Active = true,
                IsSystemRole = true,
                SystemName = Enums.Role.StoreAdmin.ToString()
                ,
                TaxDisplayType = null,
                TaxExempt = false
            });

            defaultRoles.Add(new Role()
            {
                RoleId = (int)Enums.Role.StoreModerator,
                Name = Enums.Role.StoreModerator.ToString(),
                FreeShipping = false,
                Active = true,
                IsSystemRole = true,
                SystemName = Enums.Role.StoreModerator.ToString()
                ,
                TaxDisplayType = null,
                TaxExempt = false
            });

            using (DataContext dbCxt = new DataContext())
            {
                foreach(Role role in defaultRoles)
                {
                    var roleInDb = dbCxt.Roles
                .Where(c => c.RoleId == role.RoleId)
                .SingleOrDefault();
                    if (roleInDb == null)
                    {
                        dbCxt.Roles.Add(role);
                    }
                }
                
                dbCxt.SaveChanges();
            }
        }
    }
}
