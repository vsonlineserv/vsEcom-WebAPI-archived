using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using  System.Data.OleDb;
using System.Data.SqlClient;
using System.Configuration;
using VSOnline.VSECommerce.Utilities;
using System.IO;
using System.Collections;
using System.Drawing;
using System.Drawing.Drawing2D;
using log4net;
using log4net.Config;

namespace VSOnline.VBuy.Loader.Controllers
{
    public class HomeController : Controller
    {

        private static readonly ILog logger =
               LogManager.GetLogger(typeof(HomeController));

        string ProductExcelPath = ConfigurationManager.AppSettings["ProductExcelPath"];
        string PricingExcelPath = ConfigurationManager.AppSettings["PricingExcelPath"];
        string KeyFeaturesExcelPath = ConfigurationManager.AppSettings["KeyFeaturesExcelPath"];
        string DetailedSpecExcelPath = ConfigurationManager.AppSettings["DetailedSpecExcelPath"];
        //
        // GET: /Home/
        string sqlConnectionString = ConfigurationManager.ConnectionStrings["VBuyContext"].ConnectionString;

        public ActionResult Index()
        {             
            return View();
        }

        #region LOADER

        [HttpGet]       
        public JsonResult LoadProducts()
        {
            var result = ImportDataFromExcel(ProductExcelPath);
           return new JsonResult { Data = result, JsonRequestBehavior= JsonRequestBehavior.AllowGet };
        }

        [HttpGet]
        public JsonResult LoadTempPricing()
        {
            var result = ImportDataFromExcelToPricingTable(PricingExcelPath);
            return new JsonResult { Data = result, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }


        [HttpGet]
        public JsonResult LoadTempKeyFeatures()
        {
            var result = ImportKeyFeaturesFromExcel(KeyFeaturesExcelPath);
            return new JsonResult { Data = result, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpGet]
        public JsonResult LoadTempDetailedSpecification()
        {
            var result = ImportSpecificationFromExcel(DetailedSpecExcelPath);
            return new JsonResult { Data = result, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }



        [HttpGet]
        public JsonResult LoadPricing()
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
            catch(Exception ex)
            {
                var s = ex.Message;
            }
            //hack for now as we divide by 2.
            return new JsonResult { Data = new { Count = productsCount }, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpGet]
        public JsonResult LoadManufacturer()
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
            catch(Exception ex)
            {
                logger.Error("-------------------ERROR LOG -----------------");
                logger.Error(ex.Message + ex.InnerException);
                logger.Error("-----------------END OF ERROR LOG-----------------");
            }
            return new JsonResult { Data = result, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpGet]
        public JsonResult LoadCategory()
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
            catch(Exception ex)
            {
                logger.Error("-------------------ERROR LOG -----------------");
                logger.Error(ex.Message + ex.InnerException);
                logger.Error("-----------------END OF ERROR LOG-----------------");
            }
            return new JsonResult { Data = categoryResult + subCategoryResult, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpGet]
        public JsonResult LoadProductsAndMapping()
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
            catch(Exception ex)
            {
                logger.Error("-------------------ERROR LOG -----------------");
                logger.Error(ex.Message + ex.InnerException);
                logger.Error("-----------------END OF ERROR LOG-----------------");
            }
            //hack for now as we divide by 2.
            return new JsonResult { Data = new {ProductCount = productsCount /2}, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
           
        }

        [HttpGet]
        public JsonResult LoadKeyFeatures()
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
            catch(Exception ex)
            {
                logger.Error("-------------------ERROR LOG -----------------");
                logger.Error(ex.Message + ex.InnerException);
                logger.Error("-----------------END OF ERROR LOG-----------------");
            }
            return new JsonResult { Data = keyFeaturesCount, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpGet]
        public JsonResult LoadDetailedSpecification()
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
            catch(Exception ex)
            {
                logger.Error("-------------------ERROR LOG -----------------");
                logger.Error(ex.Message + ex.InnerException);
                logger.Error("-----------------END OF ERROR LOG-----------------");
            }
            return new JsonResult { Data = specificationResult, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

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
                    , ManufacturerId , SubCategory.CategoryId
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
				    , Manufacturer, Category, ShowOnHomePage, CreatedOnUtc, UpdatedOnUtc) 
				    Values
                    (source.PictureName, source.PictureName1, source.PictureName2, 1, source.Name, source.ShortDescription, ISNULL(source.FullDescription, source.Name),
				    source.Name, source.Name, ISNULL(source.ShortDescription, source.Name), source.ManufacturerPartNumber,
				    source.Gtin, 'False', source.Weight, source.Length, 
				    source.Width, source.Height, source.Color, 0, 'False'
                    , source.ManufacturerId, source.CategoryId, 'False'
				,'{cur_date}','{cur_date}')
                OUTPUT Inserted.Name, Inserted.MetaTitle INTO @T;


                UPDATE temp_Product
                SET Published = 'True'
                from @T as T
                where temp_Product.Name = T.Name COLLATE SQL_Latin1_General_CP1_CI_AS
                ".FormatWith(new { cur_date = DateTime.UtcNow.ToString("MM/dd/yyyy HH:mm:ss") });//todo:may be later we can consider category, manufaturer.

        private string loadPricingTableQuery = @"
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
                    AND target.Price = source.Price
					AND target.SpecialPrice = source.SpecialPrice
					AND target.AdditionalShippingCharge = source.AdditionalShippingCharge
					AND target.AdditionalTax = source.AdditionalTax
					)
                WHEN NOT MATCHED BY TARGET THEN
                INSERT (Product, Store , Branch, Price, SpecialPrice,AdditionalShippingCharge,  AdditionalTax, CallForPrice, OldPrice, ProductCost
				   ) 
				    Values
                    ( source.ProductId, source.StoreId, source.BranchId, source.Price, source.SpecialPrice, source.AdditionalShippingCharge
					, source.AdditionalTax, 0, '0.0000', '0.0000')
            	WHEN MATCHED THEN
				UPDATE SET target.Price = source.Price, target.SpecialPrice = source.SpecialPrice,
				target.AdditionalShippingCharge = source.AdditionalShippingCharge,target.AdditionalTax = source.AdditionalTax,
				target.CallForPrice = 0,target.OldPrice = target.Price;";

        private bool ImportDataFromExcel(string excelfilepath)
        {
            //declare variables - edit these based on your particular situation
            string ssqltable = "temp_Product";
            string myexceldataquery = @"select PictureName,PictureName1,PictureName2,Category,SubCategory,Name,
            FullDescription,
            Manufacturer
            ,ManufacturerPartNumber,Gtin
            ,Weight,Length,Width,Height,Color
            from [sheet1$]";

            try
            {
                //create our connection strings
                string sexcelconnectionstring = @"provider=microsoft.jet.oledb.4.0;data source=" + excelfilepath +
                ";extended properties=" + "\"excel 8.0;hdr=yes;\"";                
                //execute a query to erase any previous data from our destination table
                string sclearsql = "delete from " + ssqltable + " WHERE Published = 'True'";
                SqlConnection sqlconn = new SqlConnection(sqlConnectionString);
                SqlCommand sqlcmd = new SqlCommand(sclearsql, sqlconn);
               
                try
                {
                    sqlconn.Open();
                    sqlcmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    logger.Error("-------------------ERROR LOG -----------------");
                    logger.Error(ex.Message + ex.InnerException);
                    logger.Error("-----------------END OF ERROR LOG-----------------");
                }
                finally
                {
                    sqlconn.Close();
                }
                //series of commands to bulk copy data from the excel file into our sql table
                OleDbConnection oledbconn = new OleDbConnection(sexcelconnectionstring);
                OleDbCommand oledbcmd = new OleDbCommand(myexceldataquery, oledbconn);
                try
                {
                    oledbconn.Open();
                    OleDbDataReader dr = oledbcmd.ExecuteReader();

                    SqlBulkCopy bulkcopy = new SqlBulkCopy(sqlConnectionString);
                    bulkcopy.DestinationTableName = ssqltable;
                    MapColumns(bulkcopy);
                    bulkcopy.WriteToServer(dr);
                    return true;
                }

                catch (Exception ex)
                {
                    logger.Error("-------------------ERROR LOG -----------------");
                    logger.Error(ex.Message + ex.InnerException);
                    logger.Error("-----------------END OF ERROR LOG-----------------");
                }
                finally
                {
                    oledbconn.Close();
                }      
                
            }
            catch (Exception ex)
            {
                logger.Error("-------------------ERROR LOG -----------------");
                logger.Error(ex.Message + ex.InnerException);
                logger.Error("-----------------END OF ERROR LOG-----------------");
            }
           
            return false;
        }

        private bool ImportDataFromExcelToPricingTable(string excelfilepath)
        {
            //declare variables - edit these based on your particular situation
            string ssqltable = "temp_Pricing";
            string myexceldataquery = @"select StoreId,	BranchId,	
            BranchName,	Price,	SpecialPrice,	AdditionalShippingCharge,	AdditionalTax
            ,Name
            from [sheet1$]";
            try
            {
                //create our connection strings
                string sexcelconnectionstring = @"provider=microsoft.jet.oledb.4.0;data source=" + excelfilepath +
                ";extended properties=" + "\"excel 8.0;hdr=yes;IMEX=1\"";
                //execute a query to erase any previous data from our destination table
                string sclearsql = "delete from " + ssqltable + " WHERE Published = 'True'";
                SqlConnection sqlconn = new SqlConnection(sqlConnectionString);
                SqlCommand sqlcmd = new SqlCommand(sclearsql, sqlconn);
                sqlconn.Open();
                sqlcmd.ExecuteNonQuery();
                sqlconn.Close();
                //series of commands to bulk copy data from the excel file into our sql table
                OleDbConnection oledbconn = new OleDbConnection(sexcelconnectionstring);
                OleDbCommand oledbcmd = new OleDbCommand(myexceldataquery, oledbconn);
                oledbconn.Open();
                OleDbDataReader dr = oledbcmd.ExecuteReader();

                SqlBulkCopy bulkcopy = new SqlBulkCopy(sqlConnectionString);
                bulkcopy.DestinationTableName = ssqltable;
                MapPricingColumns(bulkcopy);

                bulkcopy.WriteToServer(dr);

                oledbconn.Close();
                return true;
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
             //later
            }
            return false;
        }

        private bool ImportKeyFeaturesFromExcel(string excelfilepath)
        {
             //declare variables - edit these based on your particular situation
            string ssqltable = "temp_ProductKeyFeatures";
            string myexceldataquery = @"select PRODUCTNAME,PARAMETER,KEYFEATURE from [Sheet1$]";
            try
            {
                //create our connection strings
                string sexcelconnectionstring = @"provider=microsoft.jet.oledb.4.0;data source=" + excelfilepath +
                ";extended properties=" + "\"excel 8.0;hdr=yes;IMEX=1\"";
                //execute a query to erase any previous data from our destination table
                //TODO:-
                //series of commands to bulk copy data from the excel file into our sql table
                OleDbConnection oledbconn = new OleDbConnection(sexcelconnectionstring);
                OleDbCommand oledbcmd = new OleDbCommand(myexceldataquery, oledbconn);
                oledbconn.Open();
                OleDbDataReader dr = oledbcmd.ExecuteReader();

                SqlBulkCopy bulkcopy = new SqlBulkCopy(sqlConnectionString);
                bulkcopy.DestinationTableName = ssqltable;
                MapFeaturesColumns(bulkcopy);

                bulkcopy.WriteToServer(dr);

                oledbconn.Close();
                return true;
            }
            catch (Exception ex)
            {
                var s = ex.Message;
                logger.Error("-------------------ERROR LOG -----------------");
                logger.Error(ex.Message + ex.InnerException);
                logger.Error("-----------------END OF ERROR LOG-----------------");
            }
            return false;
        }

        
        private bool ImportSpecificationFromExcel(string excelfilepath)
        {
            //declare variables - edit these based on your particular situation
            string ssqltable = "temp_ProductSpecification";
            string myexceldataquery = @"select PRODUCTNAME,	GROUP,	ATTRIBUTE,	DETAILS
            from [sheet1$]";
            try
            {
                //create our connection strings
                string sexcelconnectionstring = @"provider=microsoft.jet.oledb.4.0;data source=" + excelfilepath +
                ";extended properties=" + "\"excel 8.0;hdr=yes;IMEX=1\"";
                //execute a query to erase any previous data from our destination table
                //TODO:-
                //series of commands to bulk copy data from the excel file into our sql table
                OleDbConnection oledbconn = new OleDbConnection(sexcelconnectionstring);
                OleDbCommand oledbcmd = new OleDbCommand(myexceldataquery, oledbconn);
                oledbconn.Open();
                OleDbDataReader dr = oledbcmd.ExecuteReader();

                SqlBulkCopy bulkcopy = new SqlBulkCopy(sqlConnectionString);
                bulkcopy.DestinationTableName = ssqltable;
                MapSpecificationColumns(bulkcopy);

                bulkcopy.BulkCopyTimeout = 5000;
                bulkcopy.WriteToServer(dr);

                oledbconn.Close();
                return true;
            }
            catch (Exception ex)
            {
                var s = ex.Message;
                logger.Error("-------------------ERROR LOG -----------------");
                logger.Error(ex.Message + ex.InnerException);
                logger.Error("-----------------END OF ERROR LOG-----------------");
            }
            return false;
        }

        private void MapFeaturesColumns(SqlBulkCopy bulkcopy)
        {
            bulkcopy.ColumnMappings.Add("ProductName", "ProductName");
            bulkcopy.ColumnMappings.Add("Parameter", "Parameter");
            bulkcopy.ColumnMappings.Add("KeyFeature", "KeyFeature");
        }

        private void MapSpecificationColumns(SqlBulkCopy bulkcopy)
        {
            bulkcopy.ColumnMappings.Add("ProductName", "ProductName");
            bulkcopy.ColumnMappings.Add("Group", "SpecificationGroup");
            bulkcopy.ColumnMappings.Add("Attribute", "SpecificationAttribute");
            bulkcopy.ColumnMappings.Add("Details", "SpecificationDetails");
        }

        private void MapColumns(SqlBulkCopy bulkcopy)
        {
            bulkcopy.ColumnMappings.Add("PictureName", "PictureName");
            bulkcopy.ColumnMappings.Add("PictureName1", "PictureName1");
            bulkcopy.ColumnMappings.Add("PictureName2", "PictureName2");
            bulkcopy.ColumnMappings.Add("Category", "Category");
            bulkcopy.ColumnMappings.Add("SubCategory", "SubCategory");
            bulkcopy.ColumnMappings.Add("Name", "Name");
          //  bulkcopy.ColumnMappings.Add("ShortDescription", "ShortDescription");
            bulkcopy.ColumnMappings.Add("FullDescription", "FullDescription");
            bulkcopy.ColumnMappings.Add("Manufacturer", "Manufacturer");
            //bulkcopy.ColumnMappings.Add("MetaKeywords", "MetaKeywords");
            //bulkcopy.ColumnMappings.Add("MetaDescription", "MetaDescription");
            //bulkcopy.ColumnMappings.Add("MetaTitle", "MetaTitle");
            bulkcopy.ColumnMappings.Add("ManufacturerPartNumber", "ManufacturerPartNumber");
            bulkcopy.ColumnMappings.Add("Gtin", "Gtin");
          //  bulkcopy.ColumnMappings.Add("IsGiftCard", "IsGiftCard");
            bulkcopy.ColumnMappings.Add("Weight", "Weight");
            bulkcopy.ColumnMappings.Add("Length", "Length");
            bulkcopy.ColumnMappings.Add("Width", "Width");
            bulkcopy.ColumnMappings.Add("Height", "Height");
            bulkcopy.ColumnMappings.Add("Color", "Color");
           // bulkcopy.ColumnMappings.Add("DisplayOrder", "DisplayOrder");
          //  bulkcopy.ColumnMappings.Add("Published", "Published");
        }

        private void MapPricingColumns(SqlBulkCopy bulkcopy)
        {
            bulkcopy.ColumnMappings.Add("BranchName", "BranchName");
            bulkcopy.ColumnMappings.Add("Name", "ProductName");
            bulkcopy.ColumnMappings.Add("StoreId", "StoreId");
            bulkcopy.ColumnMappings.Add("BranchId", "BranchId");
            bulkcopy.ColumnMappings.Add("Price", "Price");
            bulkcopy.ColumnMappings.Add("SpecialPrice", "SpecialPrice");
            bulkcopy.ColumnMappings.Add("AdditionalShippingCharge", "AdditionalShippingCharge");
            bulkcopy.ColumnMappings.Add("AdditionalTax", "AdditionalTax");
        }

        #endregion


        #region ResizeImages

        [HttpGet]
        public JsonResult ResizeImages()
        {
            try
            {
                ResizeImagesInFolder(450);
                ResizeImagesInFolder(200);
            }
            catch(Exception ex)
            {
                logger.Error("-------------------ERROR LOG -----------------");
                logger.Error(ex.Message + ex.InnerException);
                logger.Error("-----------------END OF ERROR LOG-----------------");

                throw new Exception(ex.Message);

            }

            return new JsonResult { Data = "completed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        string imagesPath = @"D:\VBUY\VBuy_Products_FromAug21\Aug22\Input1";
        string outputPath = @"D:\VBUY\VBuy_Products_FromAug21\Aug22\Output1";

        /// <summary>
        /// This is a internal method which will be called by the root folders for parsing through the 
        /// sub folders.
        /// </summary>
        /// <param name="dirInfo">DirectoryInfo for which parsing is required to know the subdirectory details</param>
        /// <param name="recursive">If this is set to True, then the folders will be parsed until the last folder in the directory, 
        /// and setting this to False, will only return the immediate sub folders.
        /// </param>
        protected void ParseSubFolder(DirectoryInfo dirInfo, string subDirectoryName,int newImageSize)
        {
            DirectoryInfo[] subDirs;

            if (!Directory.Exists(subDirectoryName))
            {
                Directory.CreateDirectory(subDirectoryName);
            } 
            foreach (DirectoryInfo directory in dirInfo.GetDirectories())
            {
                if (directory != null && directory.Exists)
                {                     
                    subDirs = directory.GetDirectories();                   

                    if (!Directory.Exists(subDirectoryName + @"\" + directory.Name))
                    {
                        Directory.CreateDirectory(subDirectoryName + @"\" + directory.Name);
                    }
                    ResizeImageFiles(directory.FullName, subDirectoryName + @"\" + directory.Name, newImageSize);

                    if (subDirs.Length != 0)
                    {                        
                        ParseSubFolder(directory, subDirectoryName + @"\" + directory.Name, newImageSize);
                    }
                }
            }
        }

        private void ResizeImagesInFolder(int NewImageSize)
        {
            //Create Out Put Directory. 
            var OutputPicsDirectory = outputPath + @"\Resize" + NewImageSize;
            if (!Directory.Exists(outputPath))
                throw new Exception("SourceFolder does not exist");

            DirectoryInfo diParent = new DirectoryInfo(imagesPath);
            if (!Directory.Exists(OutputPicsDirectory))
            {
                Directory.CreateDirectory(OutputPicsDirectory);
            } 

            DirectoryInfo[] subDirs;
            FileInfo[] files;

            //Getting filelist of parent directory. We will not include any image in this folder. 
           // ResizeImageFiles(diParent,NewImageSize);

            foreach (DirectoryInfo directory in diParent.GetDirectories())
            {
                if (directory != null && directory.Exists)
                {                    
                    subDirs = directory.GetDirectories();
                    files = directory.GetFiles();
                    if (subDirs.Length != 0)
                    {
                        ResizeImageFiles(directory.FullName, OutputPicsDirectory + @"\" + directory.Name, NewImageSize);
                        ParseSubFolder(directory, OutputPicsDirectory + @"\" + directory.Name, NewImageSize);
                    }
                    else if (files.Length > 0)
                    {                       
                        //Getting file list of SubDirectories.                         
                        ResizeImageFiles(directory.FullName, OutputPicsDirectory + @"\" + directory.Name, NewImageSize);
                    }
                }
            }

                      
        }

        private void ResizeImageFiles(string sourcePicsFolder, string outputPicsDirectory, int NewImageSize)
        {
            DirectoryInfo diImages = new DirectoryInfo(sourcePicsFolder);
            ArrayList alImages = new ArrayList();
            alImages.AddRange(diImages.GetFiles("*.*"));
           

            System.Drawing.Image imgOriginal;
            int OriginalHeight;
            int OriginalWidth;
            int NewWidth;
            int NewHeight;
            Bitmap ResizedBitmap;
            Graphics ResizedImage;

            if (!Directory.Exists(outputPicsDirectory))
            {
                Directory.CreateDirectory(outputPicsDirectory);
            } 

            foreach (FileInfo fiImage in alImages)
            {

                imgOriginal = System.Drawing.Image.FromFile(fiImage.FullName);

                OriginalHeight = imgOriginal.Height;
                OriginalWidth = imgOriginal.Width;

                NewWidth = OriginalWidth;
                NewHeight = OriginalHeight;

                if (OriginalHeight > NewImageSize || OriginalWidth > NewImageSize)
                {
                    if (OriginalWidth > NewImageSize)
                    {
                        NewWidth = NewImageSize;
                        if ((OriginalWidth / NewWidth) > 0)
                        {
                            NewHeight = OriginalHeight * NewWidth / OriginalWidth;
                        }
                    }
                    else if (OriginalHeight > NewImageSize)
                    {
                        NewHeight = NewImageSize;
                        if ((OriginalHeight / NewHeight) > 0)
                        {
                            NewWidth = OriginalWidth * NewWidth / OriginalHeight;
                        }
                    }

                    ResizedBitmap = new Bitmap(NewWidth, NewHeight);
                    ResizedBitmap.MakeTransparent();
                    ResizedImage = Graphics.FromImage(ResizedBitmap);

                    ResizedImage.InterpolationMode = InterpolationMode.Default;
                    ResizedImage.CompositingQuality = CompositingQuality.Default;
                    ResizedImage.SmoothingMode = SmoothingMode.Default;
                    

                    ResizedImage.DrawImage(imgOriginal, 0, 0, NewWidth, NewHeight);

                    /*IMPORTANT FOR QUALTY REDUCTION*/
                    System.Drawing.Imaging.EncoderParameters encoderParams = new System.Drawing.Imaging.EncoderParameters();
                    long[] quality = new long[1];
                    quality[0] = 75;
                    System.Drawing.Imaging.EncoderParameter encoderParam = new System.Drawing.Imaging.EncoderParameter(System.Drawing.Imaging.Encoder.Quality, quality);
                    encoderParams.Param[0] = encoderParam;
                    

                    if(fiImage.Extension.Contains("png"))
                    {
                        System.Drawing.Imaging.ImageCodecInfo encoder = GetEncoderInfo("image/png");
                        ResizedBitmap.Save(outputPicsDirectory + @"\" + fiImage.Name, encoder, encoderParams);  
                    }
                    else
                    {
                        System.Drawing.Imaging.ImageCodecInfo encoder = GetEncoderInfo("image/jpeg");                      
                        /*Saving*/
                        ResizedBitmap.Save(outputPicsDirectory + @"\" + fiImage.Name, encoder, encoderParams);         
                    }

                    imgOriginal.Dispose();
                    ResizedBitmap.Dispose();
                    ResizedImage.Dispose();
                }
                else
                {
                    //just copy
                    System.IO.File.Copy(fiImage.FullName, outputPicsDirectory + @"\" + fiImage.Name, true);
                }

            }
            
        }

        private static System.Drawing.Imaging.ImageCodecInfo GetEncoderInfo(String mimeType)
        {
            int j;
            System.Drawing.Imaging.ImageCodecInfo[] encoders;
            encoders = System.Drawing.Imaging.ImageCodecInfo.GetImageEncoders();
            for (j = 0; j < encoders.Length; ++j)
            {
                if (encoders[j].MimeType == mimeType)
                    return encoders[j];
            }
            return null;
        }

        #endregion

    }
}
