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
using VSOnline.VSECommerce.Persistence.Entity;
using VSOnline.VSECommerce.Domain.ResultSet;
using VSOnline.VSECommerce.Domain.DTO;
using VSOnline.VSECommerce.Domain;
using VSOnline.VSECommerce.Utilities;
using AutoMapper;
using System.Reflection;
using System.ComponentModel;

namespace VSOnline.VSECommerce.Domain.Helper
{
    public static class ProductHelper
    {
        public static List<ProductModel> GetProductModelFromProductList(List<Product> products)
        {
            List<ProductModel> productModelList = new List<ProductModel>();
            Mapper.Map<IEnumerable<Product>,
            IEnumerable<ProductModel>>(products, productModelList);

            return productModelList;
        }

        public static List<ProductModelWithCategory> GetProductModelWithCategoryFromProductList(List<Product> products)
        {
            List<ProductModelWithCategory> productModelList = new List<ProductModelWithCategory>();
            Mapper.Map<IEnumerable<Product>,
            IEnumerable<ProductModelWithCategory>>(products, productModelList);

            return productModelList;
        }

        public static List<BrandFilterDTO> GetBrandFilterFromBrands(List<Manufacturer> brandlist)
        {
            List<BrandFilterDTO> brandfilterList = new List<BrandFilterDTO>();
            Mapper.Map<IEnumerable<Manufacturer>,
            IEnumerable<BrandFilterDTO>>(brandlist, brandfilterList);

            return brandfilterList;
        }

        public static string GetRowNumberQuery(string orderByField, int? pageStart, int? pageSize)
        {
            var rownumStart = pageStart ?? 0;
            var rownumEnd = (rownumStart + pageSize) > 0 ? (rownumStart + pageSize) : 500;//ToDo:hardcoded for now..
            return @" SELECT  *
					FROM    ( SELECT    ROW_NUMBER() OVER ( ORDER BY {OrderByField} ) AS RowNum, COUNT(*) OVER() TotalCount, *
							  FROM      Results
							) AS RowConstrainedResult
					WHERE   RowNum >= {rownumStart}
						AND RowNum < {rownumEnd}
					ORDER BY RowNum".FormatWith(new { OrderByField = orderByField, rownumStart, rownumEnd });
        }
        public static string GetAllCategory(string currentUser)
        {

            var query = @"
	   WITH userCte AS
               (
               select  UserId from [User]  where Username='{currentUser}'
                     )
                    ,
					 branchCte AS
                  (
         select  storeId from Seller inner join userCte on userCte.UserId= Seller.CreatedUser  where CreatedUser=userCte.UserId
                     ),
					SubCategorieCte as
					 (
					 select category from SellerCategory inner join branchCte on SellerCategory.seller=branchCte.StoreId  where SellerCategory.seller=branchCte.storeId 
					     union   select Category.CategoryId from Category,SellerCategory where (SellerCategory.Category is null)
					 ),
					 CategorieCte AS
					 (
					  select distinct ParentCategoryId  from Category,SubCategorieCte where (CategoryId=category )
					 ),
					 ResultCte AS
					 (
					   select categoryId ,Name from Category,CategorieCte c where (categoryId=c.ParentCategoryId and Category.ParentCategoryId is null)
					 )
					 select *from ResultCte".FormatWith(new { currentUser });
            return query;

        }
        public static string GetAllSubCategory(string currentUser)
        {

            var query = @"WITH userCte AS
               (
               select  UserId from [User]  where Username='{currentUser}'
                     )
                    ,
					 branchCte AS
                  (
         select  storeId from Seller inner join userCte on userCte.UserId= Seller.CreatedUser  where CreatedUser=userCte.UserId
                     ),
					SubCategorieCte as
					 (
					 select category from SellerCategory inner join branchCte on SellerCategory.seller=branchCte.StoreId  where SellerCategory.seller=branchCte.storeId 
					union select Category.CategoryId from Category,SellerCategory where (SellerCategory.Category is null and Category.ParentCategoryId is not null )
					 )
					  select distinct CategoryId,Name,ParentCategoryId from Category,SubCategorieCte where CategoryId=category
".FormatWith(new { currentUser});
            return query;

        }
      

    }
}
