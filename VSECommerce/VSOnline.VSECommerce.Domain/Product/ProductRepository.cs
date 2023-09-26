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
using VSOnline.VSECommerce.Domain.DTO;
using VSOnline.VSECommerce.Utilities;
using VSOnline.VSECommerce.Domain.Helper;
using AutoMapper;
using PagedList;
using VSOnline.VSECommerce.Domain.ResultSet;

namespace VSOnline.VSECommerce.Domain 
{
    public static class ProductRepository
    {
        public static List<ProductModel> GetFeaturedProducts(this IGenericRepository<Product> productRepository)
        {
            var products = productRepository.Find(x => x.ShowOnHomePage == true && x.Published == true
                , y=>y.PricingCollection).Distinct().Take(25).ToList<Product>();

            products.ForEach(x => x.PricingCollection = x.PricingCollection.Where(y => y.IsDeleted != true).ToList());

            return ProductHelper.GetProductModelFromProductList(products);
        }

        public static string GetProductsQuery(this IGenericRepository<Product> productRepository,SelectedFilter filter, int[] categoryIdList, List<int> branchIdList,
           int? priceRangeFrom, int? priceRangeTo, int? pageStart, int? pageSize, int? userId)
        {
            var query = @"   
                    WITH ProductCTE AS 
                    (
                     Select ParentCategoryId, CategoryId, Category.Name AS SubCategoryName, ProductId, Product.Name as Name,Product.PictureName, Max(Price) AS Price
                               From Product
                                            Inner Join Category ON Category.CategoryId = Product.Category
                                            LEFT Join Pricing ON Pricing.Product = Product.ProductId
                                            
                                             WHERE ( NOT ((1 = [Product].[IsDeleted]) AND ([Product].[IsDeleted] IS NOT NULL))) 
                                                                
                                                                                          {PricingFilter}                                                              
                                                                                          {BrandFilter}  
		                                                                                  AND (1 = [Product].[Published]) AND ([Product].[Category] IN ({categoryIdListArray}))																 
                    GROUP BY ParentCategoryId, CategoryId,  Category.Name , ProductId, Product.Name,Product.PictureName
                    )
                     ,ProductWishlist AS
                     (

                    select   ProductId, UserWishlist.Id, CASE WHEN (UserWishlist.Id) IS NULL 
                                    THEN CAST(0 AS BIT) ELSE CAST(1 AS BIT) END 
                                        AS FlagWishlist
                    From ProductCTE 
	                    INNER JOIN UserWishlist ON ProductCTE.ProductId = UserWishlist.Product
											                    AND UserWishlist.[User] = {userId}

                    )
                    ,ParentCategoryCTE AS 
					(
					 Select DISTINCT Category.Name AS ParentCategoryName, ProductCTE.ParentCategoryId 
					 FROM Category
					 Inner Join ProductCTE ON Category.CategoryId = ProductCTE.ParentCategoryId
					)
                    ,
                    BranchCTE AS
                    (
	                    SELECT DISTINCT Pricing.Product Product, Count(Branch) StoresCount, Min(SpecialPrice) SpecialPrice 
                        FROM Pricing 
	                    Inner Join ProductCTE ON Pricing.Product = ProductCTE.ProductId
                        
	                    WHERE Branch IN ({branchIdListFilter})
                        {SpecialPricingFilter}
                        AND [Pricing].[IsDeleted] IS NULL OR [Pricing].[IsDeleted] =0
	                    Group BY Pricing.Product
                    )
                , Results AS 
					(
                    Select ProductCTE.ParentCategoryId, ParentCategoryName, CategoryId AS SubCategoryId, SubCategoryName, 
                    ProductCTE.ProductId, Name,PictureName, Price, ISNULL(StoresCount,0) StoresCount
                    , ISNULL(SpecialPrice,0) SpecialPrice
                    , FlagWishlist
                    FROM ProductCTE
                    INNER JOIN ParentCategoryCTE ON ParentCategoryCTE.ParentCategoryId = ProductCTE.ParentCategoryId                    
                    LEFT JOIN BranchCTE ON ProductCTE.ProductId = BranchCTE.Product
                    LEFT JOIN ProductWishlist ON ProductCTE.ProductId = ProductWishlist.ProductId     
                    {PriceLowToHighFilterClause}              
                    )
                    {GetRowNumberQuery}
                    "
                .FormatWith(new
                {
                    categoryIdListArray = string.Join(",",categoryIdList),
                    branchIdListFilter = branchIdList.Count>0 ? string.Join(",", branchIdList): "0",
                    SpecialPricingFilter = " AND [Pricing].[Price] >= {priceRangeFrom} AND [Pricing].[Price] <= {priceRangeTo}".FormatWith(new { priceRangeFrom, priceRangeTo }),
                    PricingFilter = " AND [Pricing].[SpecialPrice] >= {priceRangeFrom} AND [Pricing].[SpecialPrice] <= {priceRangeTo}".FormatWith(new { priceRangeFrom, priceRangeTo }),
                    BrandFilter = (filter !=null && filter.SelectedBrandList !=null && filter.SelectedBrandList.Count>0) ? " AND [Product].[Manufacturer] IN ( " + 
                    string.Join(",",filter.SelectedBrandIdList)  + " )" : "",
                    GetRowNumberQuery = ProductHelper.GetRowNumberQuery(GetSortByFieldBasedOnEnumForProductQuery(filter), pageStart, pageSize),
                    PriceLowToHighFilterClause = (filter != null && filter.SortById > 0 && filter.SortById < 4) ? " WHERE SpecialPrice > 0 " : "",
                    userId = userId
                });
            return query;
        }


        public static string GetProductsQuery_WithFilter(this IGenericRepository<Product> productRepository, SelectedFilter filter, 
            List<VSOnline.VSECommerce.Domain.ResultSet.SelectedProductFilterList> selectedProductFilter,
            int[] categoryIdList, List<int> branchIdList,
          int? priceRangeFrom, int? priceRangeTo, int? pageStart, int? pageSize, int? userId)
        {
            string SelectedFilterDetailsCTE = "";
            if (selectedProductFilter != null)
            {
                if (selectedProductFilter.Count() > 0)
                {
                    HelperQuery productRepoObj = new HelperQuery();
                    SelectedFilterDetailsCTE = productRepoObj.GenerateFilterTempTable(selectedProductFilter);
                }
            }
            if(SelectedFilterDetailsCTE.Length<=0)
            {
                SelectedFilterDetailsCTE = "Select NULL Dummy";
            }
            var query = @"   
                    WITH SelectedFilterDetails 
					AS 
					(
					{SelectedFilterDetailsCTE}
					)                    
                    , ProductCTE AS 
                    (
                     Select ParentCategoryId, CategoryId, Category.Name AS SubCategoryName, Product.ProductId, Product.Name as Name,Product.PictureName, Max(Price) AS Price
                               From Product
                                            Inner Join Category ON Category.CategoryId = Product.Category
                                            {SelectedFilterDetailsCTEJoin}
                                            LEFT Join Pricing ON Pricing.Product = Product.ProductId
                                            
                                             WHERE ( NOT ((1 = [Product].[IsDeleted]) AND ([Product].[IsDeleted] IS NOT NULL))) 
                                                  
                                                                                          {PricingFilter}                                                              
                                                                                          {BrandFilter}  
		                                                                                  AND (1 = [Product].[Published]) AND ([Product].[Category] IN ({categoryIdListArray}))																 
                    GROUP BY ParentCategoryId, CategoryId,  Category.Name , Product.ProductId, Product.Name,Product.PictureName
                    )
                     ,ProductWishlist AS
                     (

                    select   ProductId, UserWishlist.Id, CASE WHEN (UserWishlist.Id) IS NULL 
                                    THEN CAST(0 AS BIT) ELSE CAST(1 AS BIT) END 
                                        AS FlagWishlist
                    From ProductCTE 
	                    INNER JOIN UserWishlist ON ProductCTE.ProductId = UserWishlist.Product
											                    AND UserWishlist.[User] = {userId}

                    )
                    ,ParentCategoryCTE AS 
					(
					 Select DISTINCT Category.Name AS ParentCategoryName, ProductCTE.ParentCategoryId 
					 FROM Category
					 Inner Join ProductCTE ON Category.CategoryId = ProductCTE.ParentCategoryId
					)
                    ,
                    BranchCTE AS
                    (
	                    SELECT DISTINCT Pricing.Product Product, Count(Branch) StoresCount, Min(SpecialPrice) SpecialPrice 
                        FROM Pricing 
	                    Inner Join ProductCTE ON Pricing.Product = ProductCTE.ProductId                        
	                    WHERE Branch IN ({branchIdListFilter})
                        {SpecialPricingFilter}
                        AND [Pricing].[IsDeleted] IS NULL OR [Pricing].[IsDeleted] =0
	                    Group BY Pricing.Product
                    )
                , Results AS 
					(
                    Select ProductCTE.ParentCategoryId, ParentCategoryName, CategoryId AS SubCategoryId, SubCategoryName, 
                    ProductCTE.ProductId, Name,PictureName, Price, ISNULL(StoresCount,0) StoresCount
                    , ISNULL(SpecialPrice,0) SpecialPrice
                    , FlagWishlist
                    FROM ProductCTE
                    INNER JOIN ParentCategoryCTE ON ParentCategoryCTE.ParentCategoryId = ProductCTE.ParentCategoryId                    
                    LEFT JOIN BranchCTE ON ProductCTE.ProductId = BranchCTE.Product
                    LEFT JOIN ProductWishlist ON ProductCTE.ProductId = ProductWishlist.ProductId     
                    {PriceLowToHighFilterClause}              
                    )
                    {GetRowNumberQuery}
                    "
                .FormatWith(new
                {
                    categoryIdListArray = string.Join(",", categoryIdList),
                    branchIdListFilter = branchIdList.Count > 0 ? string.Join(",", branchIdList) : "0",
                    SpecialPricingFilter = " AND [Pricing].[Price] >= {priceRangeFrom} AND [Pricing].[Price] <= {priceRangeTo}".FormatWith(new { priceRangeFrom, priceRangeTo }),
                    PricingFilter = " AND [Pricing].[SpecialPrice] >= {priceRangeFrom} AND [Pricing].[SpecialPrice] <= {priceRangeTo}".FormatWith(new { priceRangeFrom, priceRangeTo }),
                    BrandFilter = (filter != null && filter.SelectedBrandList != null && filter.SelectedBrandList.Count > 0) ? " AND [Product].[Manufacturer] IN ( " +
                    string.Join(",", filter.SelectedBrandIdList) + " )" : "",
                    GetRowNumberQuery = ProductHelper.GetRowNumberQuery(GetSortByFieldBasedOnEnumForProductQuery(filter), pageStart, pageSize),
                    PriceLowToHighFilterClause = (filter != null && filter.SortById > 0 && filter.SortById < 4) ? " WHERE SpecialPrice > 0 " : "",
                    userId = userId,
                    SelectedFilterDetailsCTE,
                    SelectedFilterDetailsCTEJoin = (selectedProductFilter != null && selectedProductFilter.Count() > 0 )? @"Inner Join ProductFilterValue ON ProductFilterValue.ProductId = Product.ProductId
											 Inner Join [CategoryMasterFilter] ON ProductFilterValue.CategoryMasterFilter = [CategoryMasterFilter].Id
											 INNER JOIN SelectedFilterDetails ON Product.ProductId = SelectedFilterDetails.ProductId
											 " : ""
                });
            return query;
        }



        public static string GetProductsQuery_WithFilterAndBuy(this IGenericRepository<Product> productRepository, SelectedFilter filter,
            List<VSOnline.VSECommerce.Domain.ResultSet.SelectedProductFilterList> selectedProductFilter,
            int[] categoryIdList, List<int> branchIdList,
          int? priceRangeFrom, int? priceRangeTo, int? pageStart, int? pageSize, int? userId)
        {
            string SelectedFilterDetailsCTE = "";
            if (selectedProductFilter != null)
            {
                if (selectedProductFilter.Count() > 0)
                {
                    HelperQuery productRepoObj = new HelperQuery();
                    SelectedFilterDetailsCTE = productRepoObj.GenerateFilterTempTable(selectedProductFilter);
                }
            }
            if (SelectedFilterDetailsCTE.Length <= 0)
            {
                SelectedFilterDetailsCTE = "Select NULL Dummy";
            }
            var query = @"   
                    WITH SelectedFilterDetails 
					AS 
					(
					{SelectedFilterDetailsCTE}
					)                    
                    , ProductCTE AS 
                    (
                     Select ParentCategoryId, CategoryId, Category.Name AS SubCategoryName, Category.FlagShowBuy AS FlagShowBuy,
                    Product.ProductId, Product.Name as Name,Product.PictureName, Max(Price) AS Price
                               From Product
                                            Inner Join Category ON Category.CategoryId = Product.Category
                                            {SelectedFilterDetailsCTEJoin}
                                            LEFT Join Pricing ON Pricing.Product = Product.ProductId
                                            
                                             WHERE ( NOT ((1 = [Product].[IsDeleted]) AND ([Product].[IsDeleted] IS NOT NULL))) 
                                                  
                                                                                          {PricingFilter}                                                              
                                                                                          {BrandFilter}  
		                                                                                  AND (1 = [Product].[Published]) AND ([Product].[Category] IN ({categoryIdListArray}))																 
                    GROUP BY ParentCategoryId, CategoryId,  Category.Name , FlagShowBuy, Product.ProductId, Product.Name,Product.PictureName
                    )
                     ,ProductWishlist AS
                     (

                    select   ProductId, UserWishlist.Id, CASE WHEN (UserWishlist.Id) IS NULL 
                                    THEN CAST(0 AS BIT) ELSE CAST(1 AS BIT) END 
                                        AS FlagWishlist
                    From ProductCTE 
	                    INNER JOIN UserWishlist ON ProductCTE.ProductId = UserWishlist.Product
											                    AND UserWishlist.[User] = {userId}

                    )
                    ,ParentCategoryCTE AS 
					(
					 Select DISTINCT Category.Name AS ParentCategoryName, ProductCTE.ParentCategoryId 
					 FROM Category
					 Inner Join ProductCTE ON Category.CategoryId = ProductCTE.ParentCategoryId
					)
                    ,
                    BranchCTE AS
                    (
	                    SELECT DISTINCT Pricing.Product Product, Count(Branch) StoresCount, Min(SpecialPrice) SpecialPrice 
                        FROM Pricing 
	                    Inner Join ProductCTE ON Pricing.Product = ProductCTE.ProductId                        
	                    WHERE Branch IN ({branchIdListFilter})
                        {SpecialPricingFilter}
                        AND [Pricing].[IsDeleted] IS NULL OR [Pricing].[IsDeleted] =0
	                    Group BY Pricing.Product
                    )
	                ,MinBranchCTE AS
					(
					Select Pricing.Branch,SellerBranch.BranchName, Pricing.Product, Pricing.DeliveryTime, 
					Pricing.AdditionalShippingCharge, SellerBranch.EnableBuy, ProductCTE.FlagShowBuy
					from Pricing 
					Inner Join SellerBranch on SellerBranch.BranchId = Pricing.Branch
					Inner Join BranchCTE on BranchCTE.Product = Pricing.Product
                    INNER JOIN ProductCTE ON ProductCTE.ProductId = Pricing.Product
					AND Pricing.Product = BranchCTE.Product
                    AND SellerBranch.EnableBuy =1
                    AND ProductCTE.FlagShowBuy =1
					AND Pricing.SpecialPrice = BranchCTE.SpecialPrice
					)
                , Results AS 
					(
                    Select ProductCTE.ParentCategoryId CategoryId, ParentCategoryName, CategoryId AS SubCategoryId, SubCategoryName, 
                    ProductCTE.ProductId, Name,PictureName, Price, ISNULL(StoresCount,0) StoresCount
                    , ISNULL(SpecialPrice,0) SpecialPrice
                    , FlagWishlist
	                ,MinBranchCTE.Branch,  MinBranchCTE.BranchName, MinBranchCTE.Product, MinBranchCTE.DeliveryTime, 
					MinBranchCTE.AdditionalShippingCharge, MinBranchCTE.EnableBuy, MinBranchCTE.FlagShowBuy
                    FROM ProductCTE
                    INNER JOIN ParentCategoryCTE ON ParentCategoryCTE.ParentCategoryId = ProductCTE.ParentCategoryId                    
                    LEFT JOIN BranchCTE ON ProductCTE.ProductId = BranchCTE.Product
                    LEFT JOIN ProductWishlist ON ProductCTE.ProductId = ProductWishlist.ProductId     
                    LEFT JOIN MinBranchCTE ON MinBranchCTE.Product =  ProductCTE.ProductId
                    {PriceLowToHighFilterClause}              
                    )
                    {GetRowNumberQuery}
                    "
                .FormatWith(new
                {
                    categoryIdListArray = string.Join(",", categoryIdList),
                    branchIdListFilter = branchIdList.Count > 0 ? string.Join(",", branchIdList) : "0",
                    SpecialPricingFilter = " AND [Pricing].[Price] >= {priceRangeFrom} AND [Pricing].[Price] <= {priceRangeTo}".FormatWith(new { priceRangeFrom, priceRangeTo }),
                    PricingFilter = " AND [Pricing].[SpecialPrice] >= {priceRangeFrom} AND [Pricing].[SpecialPrice] <= {priceRangeTo}".FormatWith(new { priceRangeFrom, priceRangeTo }),
                    BrandFilter = (filter != null && filter.SelectedBrandList != null && filter.SelectedBrandList.Count > 0) ? " AND [Product].[Manufacturer] IN ( " +
                    string.Join(",", filter.SelectedBrandIdList) + " )" : "",
                    GetRowNumberQuery = ProductHelper.GetRowNumberQuery(GetSortByFieldBasedOnEnumForProductQuery(filter), pageStart, pageSize),
                    PriceLowToHighFilterClause = (filter != null && filter.SortById > 0 && filter.SortById < 4) ? " WHERE SpecialPrice > 0 " : "",
                    userId = userId,
                    SelectedFilterDetailsCTE,
                    SelectedFilterDetailsCTEJoin = (selectedProductFilter != null && selectedProductFilter.Count() > 0) ? @"Inner Join ProductFilterValue ON ProductFilterValue.ProductId = Product.ProductId
											 Inner Join [CategoryMasterFilter] ON ProductFilterValue.CategoryMasterFilter = [CategoryMasterFilter].Id
											 INNER JOIN SelectedFilterDetails ON Product.ProductId = SelectedFilterDetails.ProductId
											 " : ""
                });
            return query;
        }

        



        public static string GetSortByFieldBasedOnEnumForProductQuery(SelectedFilter filter)
        {
            var sortById = (filter != null && filter.SortById > 0) ? filter.SortById : (int)Enums.SortBy.StoresCount;

            switch(sortById)
            {
                
                case 2:
                    {
                        return "SpecialPrice ASC";  
                        
                    }
                case 3:
                    {
                        return "SpecialPrice DESC";  
                        
                    }
                case 4:
                    {
                        return "Name ASC";                          
                    }
                case 5://NameDESC
                    {
                        return "Name DESC";                         
                    }
                    //stores count.
                default:
                case 1:
                    {
                        return "StoresCount DESC";                    
                    }
               
            }
        }


        public static string GetUserWishlistProductsQuery(this IGenericRepository<Product> productRepository, List<int> branchIdList,
            int? pageStart, int? pageSize, int? userId)
        {
            var query = @"   
                    WITH ProductCTE AS 
                    (
                     Select ParentCategoryId, CategoryId, Category.Name AS SubCategoryName, ProductId, Product.Name as Name,Product.PictureName, Max(Price) AS Price
                               From Product
                                            Inner Join Category ON Category.CategoryId = Product.Category
                                            INNER JOIN UserWishlist ON Product.ProductId = UserWishlist.Product
											                    AND UserWishlist.[User] = {userId}
                                            LEFT Join Pricing ON Pricing.Product = Product.ProductId
                                            
                                             WHERE ( NOT ((1 = [Product].[IsDeleted]) AND ([Product].[IsDeleted] IS NOT NULL)))                                                                                                                                                   
		                                                                                  AND (1 = [Product].[Published])															 
                                                                                    
                    GROUP BY ParentCategoryId, CategoryId,  Category.Name , ProductId, Product.Name,Product.PictureName
                    )                     
                    ,ParentCategoryCTE AS 
					(
					 Select DISTINCT Category.Name AS ParentCategoryName, ProductCTE.ParentCategoryId 
					 FROM Category
					 Inner Join ProductCTE ON Category.CategoryId = ProductCTE.ParentCategoryId
					)
                    ,
                    BranchCTE AS
                    (
	                    SELECT DISTINCT Pricing.Product Product, Count(Branch) StoresCount, Min(SpecialPrice) SpecialPrice 
                        FROM Pricing 
	                    Inner Join ProductCTE ON Pricing.Product = ProductCTE.ProductId
                         
	                    WHERE Branch IN ({branchIdListFilter})
                        AND [Pricing].[IsDeleted] IS NULL OR [Pricing].[IsDeleted] =0
	                    Group BY Pricing.Product
                    )
                , Results AS 
					(
                    Select ProductCTE.ParentCategoryId, ParentCategoryName, CategoryId AS SubCategoryId, SubCategoryName, ProductCTE.ProductId, Name,PictureName, Price, ISNULL(StoresCount,0) StoresCount
                    , ISNULL(SpecialPrice,0) SpecialPrice
                   , CAST(1 AS BIT) FlagWishlist
                    FROM ProductCTE
                    INNER JOIN ParentCategoryCTE ON ParentCategoryCTE.ParentCategoryId = ProductCTE.ParentCategoryId
                    LEFT JOIN BranchCTE ON ProductCTE.ProductId = BranchCTE.Product
                    )
                    {GetRowNumberQuery}
                    "
                .FormatWith(new
                {
                     
                    branchIdListFilter = branchIdList.Count > 0 ? string.Join(",", branchIdList) : "0",
                    //SpecialPricingFilter = " AND [Pricing].[Price] >= {priceRangeFrom} AND [Pricing].[Price] <= {priceRangeTo}".FormatWith(new { priceRangeFrom, priceRangeTo }),
                    //PricingFilter = " AND [Pricing].[SpecialPrice] >= {priceRangeFrom} AND [Pricing].[SpecialPrice] <= {priceRangeTo}".FormatWith(new { priceRangeFrom, priceRangeTo }),
                    GetRowNumberQuery = ProductHelper.GetRowNumberQuery("ProductId", pageStart, pageSize),
                    userId = userId
                });
            return query;
        }

        public static string GetSearchCataloguePricingFilterQuery(this IGenericRepository<Product> productRepository, string productFilter)
        {
            var query = @"
                     Select DISTINCT ProductId
                               From Product
                                            Inner Join Category ON Category.CategoryId = Product.Category                                             
                                            LEFT JOIN Manufacturer ON Product.Manufacturer = Manufacturer.ManufacturerId
                                             WHERE ( NOT ((1 = [Product].[IsDeleted]) AND ([Product].[IsDeleted] IS NOT NULL)))                                                                                                                                             
		                                                                                  AND (1 = [Product].[Published]) AND
                                                                            ([Product].Name LIKE '{productNameFilter}'
                                                                                OR [Product].MetaKeywords LIKE '{productNameFilter}'    
                                                                                OR [Product].MetaTitle LIKE '{productNameFilter}'     
                                                                                OR Manufacturer.Name LIKE '{productNameFilter}')"
                .FormatWith(new
                {
                    productNameFilter = "%" + productFilter + "%"
                });

            return query;
        }

        public static string GetSearchCatalogueQuery(this IGenericRepository<Product> productRepository, SelectedFilter filter, string productFilter, List<int> branchIdList,
         int? priceRangeFrom, int? priceRangeTo, int? pageStart, int? pageSize)
        {
            var query = @"WITH ProductCTE AS 
                    (
                     Select ParentCategoryId, CategoryId, Category.Name AS SubCategoryName, ProductId, Product.Name as Name, Product.PictureName, Max(Price) AS Price
                               From Product
                                            Inner Join Category ON Category.CategoryId = Product.Category
                                            LEFT Join Pricing ON Pricing.Product = Product.ProductId
                                            LEFT JOIN Manufacturer ON Product.Manufacturer = Manufacturer.ManufacturerId
                                             WHERE ( NOT ((1 = [Product].[IsDeleted]) AND ([Product].[IsDeleted] IS NOT NULL))) 
                                                                                         
                                                                                          {PricingFilter}     
                                                                                          {BrandFilter}                                                          
		                                                                                  AND (1 = [Product].[Published]) AND
                                                                            ([Product].Name LIKE '{productNameFilter}'
                                                                                OR [Product].MetaKeywords LIKE '{productNameFilter}'    
                                                                                OR [Product].MetaTitle LIKE '{productNameFilter}'     
                                                                                OR Manufacturer.Name LIKE '{productNameFilter}')																 
                    GROUP BY ParentCategoryId, CategoryId,  Category.Name , ProductId, Product.Name,Product.PictureName
                    )
                    ,
                    BranchCTE AS
                    (
	                    SELECT DISTINCT Pricing.Product Product, Count(Branch) StoresCount, Min(SpecialPrice) SpecialPrice 
                        FROM Pricing 
	                    Inner Join ProductCTE ON Pricing.Product = ProductCTE.ProductId
                        
	                    WHERE Branch IN ({branchIdListFilter})
                        {SpecialPricingFilter}
                        AND [Pricing].[IsDeleted] IS NULL OR [Pricing].[IsDeleted] =0
	                    Group BY Pricing.Product
                    )
                , Results AS 
					(
                    Select ParentCategoryId, CategoryId AS SubCategoryId, SubCategoryName, ProductId, Name,PictureName, Price, ISNULL(StoresCount,0) StoresCount
                    , ISNULL(SpecialPrice,0) SpecialPrice
                    FROM ProductCTE
                    LEFT JOIN BranchCTE ON ProductCTE.ProductId = BranchCTE.Product
                    {PriceLowToHighFilterClause} 
                    )                    
                    {GetRowNumberQuery}
                    "
                .FormatWith(new
                {
                    productNameFilter = "%" + productFilter + "%",
                    branchIdListFilter = branchIdList.Count > 0 ? string.Join(",", branchIdList) : "0",
                    SpecialPricingFilter = " AND [Pricing].[Price] >= {priceRangeFrom} AND [Pricing].[Price] <= {priceRangeTo}".FormatWith(new { priceRangeFrom, priceRangeTo }),
                    PricingFilter = " AND [Pricing].[SpecialPrice] >= {priceRangeFrom} AND [Pricing].[SpecialPrice] <= {priceRangeTo}".FormatWith(new { priceRangeFrom, priceRangeTo }),
                    BrandFilter = (filter != null && filter.SelectedBrandList != null && filter.SelectedBrandList.Count > 0) ? " AND [Product].[Manufacturer] IN ( " +
                     string.Join(",", filter.SelectedBrandIdList) + " )" : "",
                    GetRowNumberQuery = ProductHelper.GetRowNumberQuery(GetSortByFieldBasedOnEnumForProductQuery(filter), pageStart, pageSize),
                    PriceLowToHighFilterClause = (filter != null && filter.SortById > 0 && filter.SortById < 4) ? " WHERE SpecialPrice > 0 " : ""
                });
            return query;
        }

        public static string GetOffersQuery(this IGenericRepository<Product> productRepository, List<int> branchIdList, int limit, int? userId)
        {
            var query = @"   
                    WITH ProductCTE AS 
                    (
                     Select ParentCategoryId, CategoryId, Category.Name AS SubCategoryName, ProductId, Product.Name as Name,Product.PictureName, Max(Price) AS Price
                               From Product
                                            Inner Join Category ON Category.CategoryId = Product.Category
                                            INNER Join Pricing ON Pricing.Product = Product.ProductId
 
                                             WHERE ( NOT ((1 = [Product].[IsDeleted]) AND ([Product].[IsDeleted] IS NOT NULL))) 
                                                                                                   
                                                    AND (SpecialPriceStartDateTimeUtc <= '{OfferLimitStartDate}' AND  SpecialPriceEndDateTimeUtc <=  '{OfferLimitEndDate}'
                                                    AND GETUTCDATE() BETWEEN SpecialPriceStartDateTimeUtc AND SpecialPriceEndDateTimeUtc 
                                                    )	  
                                                    AND ISNULL( ((1-(Pricing.SpecialPrice / NULLIF(Pricing.Price,0) ))*100),0) >5                                                      
		                                                                                  AND (1 = [Product].[Published])															 
                    GROUP BY ParentCategoryId, CategoryId,  Category.Name , ProductId, Product.Name,Product.PictureName
                    )
                    ,ProductWishlist AS
                     (

                    select   ProductId, UserWishlist.Id, CASE WHEN (UserWishlist.Id) IS NULL 
                                    THEN CAST(0 AS BIT) ELSE CAST(1 AS BIT) END 
                                        AS FlagWishlist
                    From ProductCTE 
	                    INNER JOIN UserWishlist ON ProductCTE.ProductId = UserWishlist.Product
											                    AND UserWishlist.[User] = {userId}

                    )
                    ,
                    BranchCTE AS
                    (
	                    SELECT DISTINCT Pricing.Product Product, Count(Branch) StoresCount, Min(SpecialPrice) SpecialPrice 
                        FROM Pricing 
	                    Inner Join ProductCTE ON Pricing.Product = ProductCTE.ProductId
                        
	                    WHERE Branch IN ({branchIdListFilter})
                         
	                    Group BY Pricing.Product
                    )
                    Select TOP {topLimit} ParentCategoryId, CategoryId, SubCategoryName, ProductCTE.ProductId, Name,PictureName, Price, ISNULL(StoresCount,0) StoresCount
                    , ISNULL(SpecialPrice,0) SpecialPrice
                    ,FlagWishlist
                    FROM ProductCTE
                    INNER JOIN BranchCTE ON ProductCTE.ProductId = BranchCTE.Product
                    LEFT JOIN ProductWishlist ON ProductCTE.ProductId = ProductWishlist.ProductId"
                .FormatWith(new
                {
                    branchIdListFilter = branchIdList.Count > 0 ? string.Join(",", branchIdList) : "0",
                    //SpecialPricingFilter = " AND [Pricing].[Price] >= {priceRangeFrom} AND [Pricing].[Price] <= {priceRangeTo}".FormatWith(new { priceRangeFrom, priceRangeTo }),
                    //PricingFilter = " AND [Pricing].[SpecialPrice] >= {priceRangeFrom} AND [Pricing].[SpecialPrice] <= {priceRangeTo}".FormatWith(new { priceRangeFrom, priceRangeTo }),
                    OfferLimitStartDate = DateTime.UtcNow.Date.AddDays(1).ToString("yyyy-MM-dd"),
                    OfferLimitEndDate = DateTime.UtcNow.AddDays(11).Date.ToString("yyyy-MM-dd"),
                    topLimit = limit>0? limit:100,
                    userId = userId

                });
            return query;
        }


       public static List<ProductModelWithCategory>GetProducts(this IGenericRepository<Product> productRepository, int[] categoryIdList, List<int> branchIdList)
        {           
                var products = productRepository.Find(x => x.IsDeleted != true && x.Published == true &&
                categoryIdList.Contains(x.Category), y => y.PricingCollection, z => z.CategoryDetails)
                    .Distinct()
                .ToList<Product>();
                products.ForEach(x => x.PricingCollection = x.PricingCollection.Where(y => branchIdList.Contains(y.Branch) && y.IsDeleted != true).ToList());
                return ProductHelper.GetProductModelWithCategoryFromProductList(products);
          
        }

       public static List<ProductModelForBranchCatalog> GetProducts(this IGenericRepository<Product> productRepository, RetailerProductSelectedFilter filter, int branchId)
       {
           var products = productRepository.Find(x => x.IsDeleted != true &&
              x.Category == filter.SelectedSubCategory && (filter.SelectedBrand != null ? x.Manufacturer == filter.SelectedBrand : x.Manufacturer != null)
              , y => y.PricingCollection).ToList<Product>();

           List<ProductModelForBranchCatalog> productModelList = new List<ProductModelForBranchCatalog>();
           Mapper.Map<IEnumerable<Product>,
           IEnumerable<ProductModelForBranchCatalog>>(products, productModelList);

           productModelList.ForEach(x => x.FlagExist = x.BranchList.Contains(branchId));

           return productModelList;
       }


       public static List<ProductModel> GetPagingProducts(this IGenericRepository<Product> productRepository, RetailerProductSelectedFilter filter, int pageNo, int PageSize)
       {       
           IPagedList<Product> productsPaging = null;
          var products = productRepository.Find(x => x.IsDeleted != true &&
              x.Category == filter.SelectedSubCategory && (filter.SelectedBrand != null ? x.Manufacturer == filter.SelectedBrand : x.Manufacturer != null)
              , y => y.PricingCollection).ToList();

           products.ForEach(x => x.PricingCollection = x.PricingCollection.Where(y => y.IsDeleted != true).ToList());

           productsPaging = products.OrderBy(x => x.ProductId).ToPagedList<Product>(pageNo, PageSize);
           List<ProductModel> productModelList = new List<ProductModel>();
           Mapper.Map<IEnumerable<Product>,
           IEnumerable<ProductModel>>(productsPaging, productModelList);

           return productModelList;
       }
       public static List<ProductModel> GetSearchProductsFilter(this IGenericRepository<Product> productRepository, string searchString, bool enableElastic)
       {
           //if(enableElastic)
           //{
           //    return  Search.SearchClient.SearchIndex(searchString, 15);              
           //}

           var products = productRepository.Find(x => x.IsDeleted != true && x.Published == true &&
              ( x.Name.Contains(searchString)  || x.MetaTitle.Contains(searchString) || x.MetaKeywords.Contains(searchString)
              || x.ManufacturerDetails.Name.Contains(searchString)), y => y.ManufacturerDetails).ToList<Product>();
           return ProductHelper.GetProductModelFromProductList(products);
          
       }

      public static List<BrandFilterDTO> GetBrandFilter(this IGenericRepository<Product> productRepository, List<int> prodList)
       {
           var brandList = productRepository.Find(x => prodList.Contains(x.ProductId), y => y.ManufacturerDetails).Select(y => y.ManufacturerDetails)
           .Distinct()
           .ToList<Manufacturer>();

           return ProductHelper.GetBrandFilterFromBrands(brandList);
       }

       public static List<ProductModelWithCategory> GetOffers(this IGenericRepository<Product> productRepository, List<int> branchIdList, int limit)
       {
           //todo:-logic to changel later or we can use simple join query using CTE
           if (limit > 0)
           {
               var products = productRepository.Find(x => x.IsDeleted != true && x.Published == true
               , y => y.CategoryDetails, z => z.PricingCollection).Take(limit).ToList();
               products.ForEach(x => x.PricingCollection = x.PricingCollection.Where(z => z.SpecialPriceEndDateTimeUtc >= DateTime.UtcNow
                   && z.SpecialPriceEndDateTimeUtc < DateTime.UtcNow.AddDays(5) && z.IsDeleted != true && branchIdList.Contains(z.Branch)).Take(limit).ToList());

               return ProductHelper.GetProductModelWithCategoryFromProductList(products);
           }

           else
           {
               var products = productRepository.Find(x => x.IsDeleted != true && x.Published == true
               , y => y.CategoryDetails, z => z.PricingCollection).ToList();
               products.ForEach(x => x.PricingCollection = x.PricingCollection.Where(z => z.SpecialPriceEndDateTimeUtc >= DateTime.UtcNow
                   && z.SpecialPriceEndDateTimeUtc < DateTime.UtcNow.AddDays(5) && x.IsDeleted != true && branchIdList.Contains(z.Branch)).ToList());

               return ProductHelper.GetProductModelWithCategoryFromProductList(products);
           }
       }


       //public static List<ProductModel> SearchCatalogue(this IGenericRepository<Product> productRepository, 
       //    string productFilter)
       //{
       //    var products = productRepository.Find(x => x.IsDeleted != true && x.Published == true &&
       //       (x.Name.Contains(productFilter) || x.ShortDescription.Contains(productFilter) || x.FullDescription.Contains(productFilter)
       //       || x.ManufacturerDetails.Name.Contains(productFilter)), y => y.ManufacturerDetails, z=> z.PricingCollection).ToList<Product>();
           
       //    return ProductHelper.GetProductModelFromProductList(products);
       //}

       public static List<ProductModelWithCategory> SearchCatalogue(this IGenericRepository<Product> productRepository,
         string productFilter, List<int> branchIdList)
       {           
           var products = productRepository.Find(x => x.IsDeleted != true && x.Published == true &&
                        (x.Name.Contains(productFilter) || x.MetaKeywords.Contains(productFilter) || x.MetaTitle.Contains(productFilter)
              || x.ManufacturerDetails.Name.Contains(productFilter)), y => y.ManufacturerDetails, z => z.PricingCollection, cat => cat.CategoryDetails).ToList<Product>();

           //todo:-logic to changel later or we can use simple join query using CTE
           products.ForEach(x => x.PricingCollection = x.PricingCollection.Where(y => branchIdList.Contains(y.Branch) && y.IsDeleted != true).ToList());
           return ProductHelper.GetProductModelWithCategoryFromProductList(products);
       }

       public static ProductDetailModel GetProductDetails(this IGenericRepository<Product> productRepository, int productId)
       {
           var product = productRepository.Find(x => x.IsDeleted != true && x.Published == true &&
               x.ProductId == productId, y => y.ManufacturerDetails).FirstOrDefault<Product>();

           ProductDetailModel productDetailModel = new ProductDetailModel();
           Mapper.Map<Product,
           ProductDetailModel>(product, productDetailModel);
           productDetailModel.BrandName = product.ManufacturerDetails!=null ? product.ManufacturerDetails.Name : String.Empty;

           return productDetailModel;
       }

       public static NewProductResultSet CreateNewProduct(this IGenericRepository<Product> productRepository, ProductDTO newProductDTO)
       {
           NewProductResultSet result = new NewProductResultSet();
           try
           {
               var product = productRepository.Find(x => x.Name == newProductDTO.Name && x.Category == newProductDTO.Category).ToList();
               if (product.Count == 0)
               {
                   Product newProduct = new Product();
                   Mapper.Map<ProductDTO, Product>(newProductDTO, newProduct);
                   newProduct.CreatedOnUtc = DateTime.UtcNow;                   
                   newProduct.UpdatedOnUtc = DateTime.UtcNow;
                   newProduct.Size1 = newProductDTO.Size1;
                   newProduct.Size2 = newProductDTO.Size2;
                   newProduct.Size3 = newProductDTO.Size3;
                   newProduct.Size4 = newProductDTO.Size4;
                   newProduct.Size5 = newProductDTO.Size5;
                   newProduct.Size6 = newProductDTO.Size6;
                   productRepository.Add(newProduct);
                   result.NewProduct = newProduct;
                   result.Status = Enums.UpdateStatus.Success;
                   return result;
               }
               else
               {
                   result.Status = Enums.UpdateStatus.AlreadyExist;
                   return result;
               }
           }
           catch
           {
               result.Status = Enums.UpdateStatus.Error;
               return result;
           }

       }

       public static Product UpdateProduct(this IGenericRepository<Product> productRepository, ProductDTO updateProductDTO)
       {
           try
           {
               var product = productRepository.Find(x => x.ProductId == updateProductDTO.ProductId,y=>y.ManufacturerDetails, z=>z.CategoryDetails).First<Product>();
               if (product.ProductId == updateProductDTO.ProductId)
               {
                   product.Name = updateProductDTO.Name;
                   product.ShortDescription = updateProductDTO.ShortDescription;
                   product.FullDescription = updateProductDTO.FullDescription;
                   product.Weight = updateProductDTO.Weight;
                   product.Length = updateProductDTO.Length;
                   product.Height = updateProductDTO.Height;
                   product.Width = updateProductDTO.Width;
                   product.Color = updateProductDTO.Color;
                   product.ManufacturerPartNumber = updateProductDTO.ManufacturerPartNumber;
                   product.Manufacturer = updateProductDTO.Manufacturer;
                   product.Category = updateProductDTO.Category;
                   product.Size1 = updateProductDTO.Size1;
                   product.Size2 = updateProductDTO.Size2;
                   product.Size3 = updateProductDTO.Size3;
                   product.Size4 = updateProductDTO.Size4;
                   product.Size5 = updateProductDTO.Size5;
                   product.Size6 = updateProductDTO.Size6;

                   product.UpdatedOnUtc = DateTime.UtcNow;
                   return product;
               }
               return null;
           }
           catch
           {
               return null;
           }
       }

       public static Product UpdateProductSeo(this IGenericRepository<Product> productRepository, ProductDTO updateProductDTO)
       {
           try
           {
               var product = productRepository.Find(x => x.ProductId == updateProductDTO.ProductId, y => y.ManufacturerDetails, z => z.CategoryDetails).First<Product>();
               if (product.ProductId == updateProductDTO.ProductId)
               {
                   product.MetaTitle = updateProductDTO.MetaTitle;
                   product.MetaKeywords = updateProductDTO.MetaKeywords;
                   product.MetaDescription = updateProductDTO.MetaDescription;
                   product.UpdatedOnUtc = DateTime.UtcNow;
                   return product;
               }
               return null;
           }
           catch
           {
               return null;
           }
       }
    }
}
