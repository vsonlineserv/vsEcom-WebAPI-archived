////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce.Domain
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VSOnline.VSECommerce.Domain.Helper
{
    public static class AdminHelperQuery
    {
        public static string GetTopCategoryQuery()
        {
            string query = @"select TOP 10 Category,Count(Category) ProductCount from OrderProductItem
                                Inner Join Product ON OrderProductItem.ProductId = Product.ProductId
                                Inner Join Category ON Product.Category = Category.CategoryId
                                Group By Category
                                Order By Count(Category) desc";
            return query;
        }
    }
}
