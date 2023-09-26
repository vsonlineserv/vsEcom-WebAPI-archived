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
using VSOnline.VSECommerce.Utilities;

namespace VSOnline.VSECommerce.Domain
{
    public class ProductFilterRepository
    {
        public string GetProductFilterQuery(int[] catList)
        {
            var query = @"select Distinct [FilterParameter],FilterValueText from [dbo].[CategoryMasterFilter]
            Inner Join ProductFilterValue ON [CategoryMasterFilter].Id = ProductFilterValue.CategoryMasterFilter
            Where Category in ({CategoryIdList}) ORDER BY [FilterParameter]".FormatWith(new
                {
                    CategoryIdList =  string.Join(",", catList)
                });
            return query;
        }
    }
}
