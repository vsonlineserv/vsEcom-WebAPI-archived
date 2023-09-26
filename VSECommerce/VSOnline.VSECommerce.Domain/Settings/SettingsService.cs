////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce.Domain ResultSet
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VSOnline.VSECommerce.Utilities;
using VSOnline.VSECommerce.Core.Caching;
using VSOnline.VSECommerce.Domain;
using VSOnline.VSECommerce.Persistence.Entity;

namespace VSOnline.VSECommerce.Domain.Settings
{
    public static class SiteSettingsService
    {

        public static List<SiteSettings> GetSiteSettings(ICacheManager _cacheManager)
        {             
           var siteSettings = _cacheManager.Get(Enums.SiteSettings_CACHE_KEY,() =>
               {
                EfUnitOfWork unitofWork = new EfUnitOfWork(); 
                return unitofWork.SiteSettingValues.ToList();
               }
            );
           return siteSettings;
        }

        public static List<SiteSettings> GetAllSiteSettings()
        {
            EfUnitOfWork unitofWork = new EfUnitOfWork();
            var siteSettings =  unitofWork.SiteSettingValues.ToList();
            return siteSettings;
        }

        public static bool UpdateSiteSettings(string siteKey, string value)
        {
            try
            {
                EfUnitOfWork unitofWork = new EfUnitOfWork();
                var siteSetting = unitofWork.SiteSettingValues.Where(x => x.SiteKey == siteKey).FirstOrDefault();
                siteSetting.Value = value;
                unitofWork.UpdateAndSave(siteSetting);
                return true;
            }
            catch
            {

            }
            return false;
        }

         
        
    }
}
