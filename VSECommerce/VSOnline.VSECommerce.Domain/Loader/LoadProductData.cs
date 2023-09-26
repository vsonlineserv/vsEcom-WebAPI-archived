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
using System.IO;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Configuration;
using log4net;
using log4net.Config;
using VSOnline.VSECommerce.Utilities;

namespace VSOnline.VSECommerce.Domain.Loader
{
    internal class LoadProductData
    {
        private static readonly ILog logger =
    LogManager.GetLogger(typeof(LoadDataFromIndependentExcel));

        string sqlConnectionString = ConfigurationManager.ConnectionStrings["VBuyContext"].ConnectionString;

        private const string loadKeyFeaturesQuery = @" MERGE INTO ProductKeyFeatures AS target
                USING (SELECT DISTINCT ProductId, Parameter, KeyFeature FROM temp_ProductKeyFeatures
				INNER JOIN Product ON temp_ProductKeyFeatures.ProductName = Product.Name COLLATE SQL_Latin1_General_CP1_CI_AS)
				AS source
                ON (target.ProductId = source.ProductId
                    AND target.Parameter = source.Parameter COLLATE SQL_Latin1_General_CP1_CI_AS
                    AND target.KeyFeature = source.KeyFeature COLLATE SQL_Latin1_General_CP1_CI_AS)
                WHEN NOT MATCHED BY TARGET THEN
                INSERT (ProductId,Parameter, KeyFeature) Values (source.ProductId, source.Parameter, source.KeyFeature);";

        private const string loadSpecificationQuery = @"MERGE INTO ProductSpecification AS target
                USING (SELECT DISTINCT ProductId, SpecificationGroup,SpecificationAttribute,SpecificationDetails
				FROM [temp_ProductSpecification]
				INNER JOIN Product ON [temp_ProductSpecification].ProductName = Product.Name COLLATE SQL_Latin1_General_CP1_CI_AS)
				AS source
                ON (target.ProductId = source.ProductId
				 AND target.SpecificationGroup = source.SpecificationGroup COLLATE SQL_Latin1_General_CP1_CI_AS
                    AND target.SpecificationAttribute = source.SpecificationAttribute COLLATE SQL_Latin1_General_CP1_CI_AS
                    AND target.SpecificationDetails = source.SpecificationDetails COLLATE SQL_Latin1_General_CP1_CI_AS
					)
                WHEN NOT MATCHED BY TARGET THEN
                INSERT (ProductId, SpecificationGroup,SpecificationAttribute,SpecificationDetails) 
				Values (source.ProductId, source.SpecificationGroup,source.SpecificationAttribute,source.SpecificationDetails);";

        private const string loadCategoryQuery =
            @"MERGE INTO Category AS target
                USING (SELECT DISTINCT Category FROM temp_Product) AS source
                ON (target.Name = source.Category)
                WHEN NOT MATCHED BY TARGET THEN
                INSERT (Name) Values (source.Category);";

        private const string loadSubCategoryQuery
            = @"With CategoryCTE AS 
                (
                Select distinct CategoryId, Category.Name from Category
                Inner Join temp_Product
                ON Category.Name = temp_Product.Category
                )
                ,
                SubCategoryTempCTE AS 
                (
                Select Distinct CategoryId,SubCategory from temp_Product
                Inner Join CategoryCTE
                ON CategoryCTE.Name = temp_Product.Category
                )
                MERGE INTO Category AS target
                USING (SELECT DISTINCT SubCategory,CategoryId  FROM SubCategoryTempCTE) AS source
                ON (target.Name = source.SubCategory)
                WHEN NOT MATCHED BY TARGET THEN
                INSERT (Name, ParentCategoryId) Values (source.SubCategory,CategoryId );";

        private string loadProductsTableQuery
            = @"declare @T table
                (
                  Name nvarchar(400),
                  MetaTitle nvarchar(400)
                );

                MERGE INTO Product AS target
                USING (SELECT DISTINCT PictureName, PictureName1, PictureName2, temp_Product.Name, temp_Product.ShortDescription, temp_Product.FullDescription, 
				    temp_Product.MetaTitle, temp_Product.MetaKeywords, temp_Product.MetaDescription, ManufacturerPartNumber,
				    Gtin, IsGiftCard, Weight, Length, Width, Height, temp_Product.Color, temp_Product.DisplayOrder, temp_Product.Published
                    , ManufacturerId , SubCategory.CategoryId, temp_Product.Size1,temp_Product.Size2, temp_Product.Size3, temp_Product.Size4
                       , temp_Product.Size5, temp_Product.Size6
				        FROM temp_Product
                        INNER JOIN Manufacturer
					    ON temp_Product.Manufacturer = Manufacturer.MetaTitle
                        INNER JOIN Category SubCategory
					            ON temp_Product.SubCategory = SubCategory.Name
					    INNER JOIN Category cat
					         ON cat.CategoryId = SubCategory.ParentCategoryId 
                    ) AS source
                    ON (target.Name = source.Name
                    AND target.Manufacturer = source.ManufacturerId
                    AND target.Category = source.CategoryId)
                WHEN NOT MATCHED BY TARGET THEN
                INSERT (
				    PictureName, PictureName1, PictureName2, ProductTypeId, Name, ShortDescription, FullDescription, 
				    MetaTitle,MetaKeywords, MetaDescription, ManufacturerPartNumber,
				    Gtin, IsGiftCard, Weight, Length, Width, Height, Color, DisplayOrder, Published
				    , Manufacturer, Category, ShowOnHomePage, CreatedOnUtc, UpdatedOnUtc, 
                    Size1, Size2, Size3,Size4,Size5,Size6) 
				    Values
                    (source.PictureName, source.PictureName1, source.PictureName2, 1, source.Name, source.ShortDescription, ISNULL(source.FullDescription, source.Name),
				    source.Name, source.Name, ISNULL(source.ShortDescription, source.Name), source.ManufacturerPartNumber,
				    source.Gtin, 'False', source.Weight, source.Length, 
				    source.Width, source.Height, source.Color, 0, 'False'
                    , source.ManufacturerId, source.CategoryId, 'False'
				,'{cur_date}','{cur_date}'
                , Size1, Size2, Size3,Size4,Size5,Size6)
                OUTPUT Inserted.Name, Inserted.MetaTitle INTO @T;


                UPDATE temp_Product
                SET Published = 'True'
                from @T as T
                where temp_Product.Name = T.Name COLLATE SQL_Latin1_General_CP1_CI_AS
                ".FormatWith(new { cur_date = DateTime.UtcNow.ToString("MM/dd/yyyy HH:mm:ss") });//todo:may be later we can consider category, manufaturer.

        private string loadPricingTableQuery = @"
                DECLARE @T TABLE(ProductId INT, StoreId INT, BranchId INT);
                 MERGE INTO Pricing AS target
                USING (SELECT DISTINCT  ProductId, temp_pricing.StoreId,	temp_pricing.BranchId,	
						temp_pricing.BranchName,	Price,	SpecialPrice,	AdditionalShippingCharge,	AdditionalTax
						,Name
				        FROM temp_Pricing
                       INNER JOIN Product
						ON Product.Name =  temp_pricing.ProductName COLLATE SQL_Latin1_General_CP1_CI_AS
					INNER JOIN SellerBranch 
					ON SellerBranch.BranchName = temp_pricing.BranchName COLLATE SQL_Latin1_General_CP1_CI_AS
					AND SellerBranch.BranchId = temp_pricing.BranchId
                    ) AS source
                    ON (target.Product = source.ProductId
				    AND target.Store = source.StoreId
                    AND target.Branch = source.BranchId
					)
                WHEN NOT MATCHED BY TARGET THEN
				INSERT (Product, Store , Branch, Price, SpecialPrice,AdditionalShippingCharge,  AdditionalTax, CallForPrice, OldPrice, ProductCost
				   ) 
				    Values
                    ( source.ProductId, source.StoreId, source.BranchId, source.Price, source.SpecialPrice, source.AdditionalShippingCharge
					, source.AdditionalTax, 0, '0.0000', '0.0000')
                WHEN MATCHED THEN
				UPDATE SET target.OldPrice = target.Price, target.Price = source.Price, target.SpecialPrice = source.SpecialPrice,
				target.AdditionalShippingCharge = source.AdditionalShippingCharge,target.AdditionalTax = source.AdditionalTax,
				target.CallForPrice = 0
                OUTPUT source.ProductId,source.StoreId, source.BranchId INTO @T;
                Delete tmpPricing FROM temp_Pricing tmpPricing INNER JOIN @T tempResult 
			                ON tempResult.StoreId = tmpPricing.StoreId
			                AND tempResult.BranchId = tmpPricing.BranchId
			                INNER JOIN Product ON Product.Name = tmpPricing.ProductName
			                AND tempResult.ProductId = Product.ProductId
			                INNER JOIN Pricing ON Product.ProductId = Pricing.Product
			                AND Pricing.SpecialPrice = tmpPricing.SpecialPrice
			                AND Pricing.Price = tmpPricing.Price
			                AND Pricing.Store = tmpPricing.StoreId
			                AND Pricing.Branch = tmpPricing.BranchId";


        public int LoadCategory()
        {
            int categoryResult = 0;
            int subCategoryResult = 0;
            try
            {
                SqlConnection sqlconn = new SqlConnection(sqlConnectionString);
                SqlCommand sqlCategoryCommand = new SqlCommand(loadCategoryQuery, sqlconn);
                SqlCommand sqlSubCategoryCommand = new SqlCommand(loadSubCategoryQuery, sqlconn);
                sqlconn.Open();
                categoryResult = sqlCategoryCommand.ExecuteNonQuery();
                subCategoryResult = sqlSubCategoryCommand.ExecuteNonQuery();
                sqlconn.Close();
            }
            catch (Exception ex)
            {
                logger.Error("-------------------ERROR LOG -----------------");
                logger.Error(ex.Message + ex.InnerException);
                logger.Error("-----------------END OF ERROR LOG-----------------");
            }
            return categoryResult + subCategoryResult;
        }


        public int LoadPricing()
        {
            int productsCount = 0;
            try
            {
                SqlConnection sqlconn = new SqlConnection(sqlConnectionString);
                SqlCommand sqlProductCommand = new SqlCommand(loadPricingTableQuery, sqlconn);
                sqlconn.Open();
                productsCount = sqlProductCommand.ExecuteNonQuery();
                //update publish flag 
                sqlconn.Close();
            }
            catch (Exception ex)
            {
                var s = ex.Message;
            }

            return productsCount;
        }

        public int LoadManufacturer()
        {
            int result = 0;
            var query = @"MERGE INTO Manufacturer AS target
                USING (SELECT DISTINCT Manufacturer FROM temp_Product) AS source
                ON (target.Name = source.Manufacturer)
                WHEN NOT MATCHED BY TARGET THEN
                INSERT (Name, MetaTitle) Values (source.Manufacturer, source.Manufacturer);";
            try
            {
                SqlConnection sqlconn = new SqlConnection(sqlConnectionString);
                SqlCommand sqlcmd = new SqlCommand(query, sqlconn);
                sqlconn.Open();
                result = sqlcmd.ExecuteNonQuery();
                sqlconn.Close();
            }
            catch (Exception ex)
            {
                logger.Error("-------------------ERROR LOG -----------------");
                logger.Error(ex.Message + ex.InnerException);
                logger.Error("-----------------END OF ERROR LOG-----------------");
            }
            return result;
        }


        public int LoadProductsAndMapping()
        {
            int productsCount = 0;
            try
            {
                SqlConnection sqlconn = new SqlConnection(sqlConnectionString);
                SqlCommand sqlProductCommand = new SqlCommand(loadProductsTableQuery, sqlconn);
                sqlconn.Open();
                productsCount = sqlProductCommand.ExecuteNonQuery();
                //update publish flag 
                sqlconn.Close();
            }
            catch (Exception ex)
            {
                logger.Error("-------------------ERROR LOG -----------------");
                logger.Error(ex.Message + ex.InnerException);
                logger.Error("-----------------END OF ERROR LOG-----------------");
            }
            //hack for now as we divide by 2.
            return productsCount / 2;

        }

        public int LoadKeyFeatures()
        {
            int keyFeaturesCount = 0;
            try
            {
                SqlConnection sqlconn = new SqlConnection(sqlConnectionString);
                SqlCommand sqlKeyFeaturesCommand = new SqlCommand(loadKeyFeaturesQuery, sqlconn);
                sqlconn.Open();
                keyFeaturesCount = sqlKeyFeaturesCommand.ExecuteNonQuery();
                sqlconn.Close();
            }
            catch (Exception ex)
            {
                logger.Error("-------------------ERROR LOG -----------------");
                logger.Error(ex.Message + ex.InnerException);
                logger.Error("-----------------END OF ERROR LOG-----------------");
            }
            return keyFeaturesCount;
        }


        public int LoadDetailedSpecification()
        {

            int specificationResult = 0;
            try
            {
                SqlConnection sqlconn = new SqlConnection(sqlConnectionString);
                SqlCommand sqlSpecificationCommand = new SqlCommand(loadSpecificationQuery, sqlconn);
                sqlSpecificationCommand.CommandTimeout = 0;
                sqlconn.Open();
                specificationResult = sqlSpecificationCommand.ExecuteNonQuery();
                sqlconn.Close();
            }
            catch (Exception ex)
            {
                logger.Error("-------------------ERROR LOG -----------------");
                logger.Error(ex.Message + ex.InnerException);
                logger.Error("-----------------END OF ERROR LOG-----------------");
            }
            return specificationResult;
        }

        #region Filter

        protected internal int LoadCategoryMaster()
        {
            int rows = 0;
            try
            {

                var loadCategoryMasterFilterTableQuery = @"MERGE CategoryMasterFilter AS TARGET USING (select distinct CategoryId,FilterParameter 
                                                   from temp_ProductFilterValue) AS SOURCE 
                                                          ON (TARGET.FilterParameter = SOURCE.FilterParameter
                                               AND TARGET.Category = SOURCE.CategoryId) 
                                                          WHEN NOT MATCHED BY TARGET THEN 
                                                          INSERT (Category, FilterParameter) 
                                                          VALUES (SOURCE.CategoryId, SOURCE.FilterParameter);";
                SqlConnection sqlconn = new SqlConnection(sqlConnectionString);
                SqlCommand sqlProductCommand = new SqlCommand(loadCategoryMasterFilterTableQuery, sqlconn);
                sqlconn.Open();
                var Records = sqlProductCommand.ExecuteNonQuery();
                //MessageBox.Show(Records.ToString() + "   Rows Updated");
                rows = Records;
                sqlconn.Close();
            }
            catch (Exception ex)
            {
                var s = ex.Message;
                logger.Error("-------------------ERROR LOG -----------------");
                logger.Error(ex.Message + ex.InnerException);
                logger.Error("-----------------END OF ERROR LOG-----------------");
            }
            finally
            {

            }
            return rows;
        }

        protected internal int LoadProductFilterValue()
        {
            var rows = 0;
            try
            {


                var LoadProductFilterValueTableQuery = @"MERGE ProductFilterValue AS TARGET
                                                          USING (select DISTINCT filter.Category,filter.FilterParameter,filter.Id,tempFilter.FilterValue,tempFilter.FilterValueText,tempFilter.ProductId from CategoryMasterFilter filter inner join  temp_ProductFilterValue tempFilter on filter.FilterParameter=tempFilter.FilterParameter and filter.Category=tempFilter.CategoryId and filter.Category is not null ) AS SOURCE 
                                                          ON (TARGET.CategoryMasterFilter = SOURCE.Id and TARGET.ProductId=SOURCE.ProductId and TARGET.FilterValue=SOURCE.FilterValue and TARGET.FilterValueText= SOURCE.FilterValueText) 
                                                           WHEN NOT MATCHED BY TARGET THEN 
                                                           INSERT (ProductId,CategoryMasterFilter,FilterValue,FilterValueText) 
                                                            VALUES (SOURCE.ProductId,SOURCE.Id,SOURCE.FilterValue,SOURCE.FilterValueText);";
                SqlConnection sqlconn = new SqlConnection(sqlConnectionString);
                SqlCommand sqlProductCommand = new SqlCommand(LoadProductFilterValueTableQuery, sqlconn);
                sqlconn.Open();
                var Records = sqlProductCommand.ExecuteNonQuery();
                //MessageBox.Show(Records.ToString() + "   Rows Updated");
                rows = Records;
                sqlconn.Close();
            }
            catch (Exception ex)
            {
                var s = ex.Message;
                logger.Error("-------------------ERROR LOG -----------------");
                logger.Error(ex.Message + ex.InnerException);
                logger.Error("-----------------END OF ERROR LOG-----------------");
            }
            finally
            {

            }
            return rows;
        }

        protected internal void LoadProductFilterValueTableFromtemp_ProductFilterValueWithProductName()
        {
            try
            {
                var sqlQuery = @" INSERT INTO temp_ProductFilterValue
                     (CategoryId, ProductId, FilterParameter, FilterValue, FilterValueText)
                     (
                     Select Category.Categoryid CategoryId, Product.ProductId ProductId,  
                     temp_ProductFilterValueWithProductName.FilterParameter, 
                      temp_ProductFilterValueWithProductName.FilterValue, 
                       temp_ProductFilterValueWithProductName.FilterValueText
                     from Product 
                     Inner Join Category ON Product.Category = Category.CategoryId 
                     INNER JOIN temp_ProductFilterValueWithProductName
                     ON temp_ProductFilterValueWithProductName.ProductName = Product.Name COLLATE SQL_Latin1_General_CP1_CI_AS
                     )";
                SqlConnection sqlconn = new SqlConnection(sqlConnectionString);
                SqlCommand sqlProductCommand = new SqlCommand(sqlQuery, sqlconn);
                sqlconn.Open();
                var Records = sqlProductCommand.ExecuteNonQuery();
                //MessageBox.Show(Records.ToString() + "   Rows Updated");

                sqlconn.Close();
            }
            catch (Exception ex)
            {
                var s = ex.Message;
                logger.Error("-------------------ERROR LOG -----------------");
                logger.Error(ex.Message + ex.InnerException);
                logger.Error("-----------------END OF ERROR LOG-----------------");
            }
            finally
            {

            }
        }

#endregion

    }
}
