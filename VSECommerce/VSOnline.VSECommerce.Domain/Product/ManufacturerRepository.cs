////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce.Domain Repository
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VSOnline.VSECommerce.Persistence.Entity;

namespace VSOnline.VSECommerce.Domain
{
    public static class ManufacturerRepository
    {
        public static List<KeyValuePair<int, string>> GetBrands(this IGenericRepository<Manufacturer> manufacturerRepository)
        {
            Dictionary<int, string> dictionary =  
                manufacturerRepository.GetAll().Select(b => new { b.ManufacturerId, b.Name })
                .ToDictionary(o => o.ManufacturerId, o => o.Name);
            return dictionary.ToList<KeyValuePair<int, string>>();
        }
    }
}
