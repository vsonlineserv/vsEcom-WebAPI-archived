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
using  System.Data.OleDb;
using System.Data.SqlClient;
using System.Configuration;
using System.IO;
using System.Collections;
using log4net;
using log4net.Config;
using VSOnline.VSECommerce.Utilities;

namespace VSOnline.VSECommerce.Domain.Loader
{

    public class LoadDataFromIndependentExcel
    {

        private static readonly ILog logger =
     LogManager.GetLogger(typeof(LoadDataFromIndependentExcel));

        public LoadDataFromIndependentExcel()
        {

        }

        string ProductExcelPath = "";
        string PricingExcelPath = "";
        string KeyFeaturesExcelPath = "";
        string DetailedSpecExcelPath = "";
        //
        // GET: /Home/
        string sqlConnectionString = ConfigurationManager.ConnectionStrings["VBuyContext"].ConnectionString;

        public bool LoadProducts(string excelPath)
        {
            ProductExcelPath = excelPath;
            return ImportDataFromExcel(ProductExcelPath);

        }
        public bool LoadTempPricing(string excelPath)
        {
            PricingExcelPath = excelPath;
            return ImportDataFromExcelToPricingTable(PricingExcelPath);

        }

        public bool LoadTempKeyFeatures(string excelPath)
        {
            KeyFeaturesExcelPath = excelPath;
            return ImportKeyFeaturesFromExcel(KeyFeaturesExcelPath);
        }

        public bool LoadTempDetailedSpecification(string excelPath)
        {
            DetailedSpecExcelPath = excelPath;
            return ImportSpecificationFromExcel(DetailedSpecExcelPath);
        }

        private bool ImportDataFromExcel(string excelfilepath)
        {
            //declare variables - edit these based on your particular situation
            string ssqltable = "temp_Product";
            string myexceldataquery = @"select PictureName,PictureName1,PictureName2,Category,SubCategory,Name,
            FullDescription,
            Manufacturer
            ,ManufacturerPartNumber,Gtin
            ,Weight,Length,Width,Height,Color, Size1, Size2, Size3, Size4, Size5, Size6
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
                string sclearsql = "delete from " + ssqltable + "";
                SqlConnection sqlconn = new SqlConnection(sqlConnectionString);
                SqlCommand sqlcmd = new SqlCommand(sclearsql, sqlconn);
                sqlconn.Open();
                sqlcmd.ExecuteNonQuery();
                sqlconn.Close();
                //series of commands to bulk copy data from the excel file into our sql table
                OleDbConnection oledbconn = new OleDbConnection(sexcelconnectionstring);
                OleDbCommand oledbcmd = new OleDbCommand(myexceldataquery, oledbconn);
                try
                {
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
                    oledbconn.Close();
                }
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
                // oledbconn.Close();
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
                try
                {
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
                finally
                {
                    oledbconn.Close();
                }

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
                try
                {
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
                finally
                {
                    oledbconn.Close();
                }
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
            bulkcopy.ColumnMappings.Add("FullDescription", "FullDescription");
            bulkcopy.ColumnMappings.Add("Manufacturer", "Manufacturer");
            bulkcopy.ColumnMappings.Add("ManufacturerPartNumber", "ManufacturerPartNumber");
            bulkcopy.ColumnMappings.Add("Gtin", "Gtin");
            bulkcopy.ColumnMappings.Add("Weight", "Weight");
            bulkcopy.ColumnMappings.Add("Length", "Length");
            bulkcopy.ColumnMappings.Add("Width", "Width");
            bulkcopy.ColumnMappings.Add("Height", "Height");
            bulkcopy.ColumnMappings.Add("Color", "Color");
            bulkcopy.ColumnMappings.Add("Size1", "Size1");
            bulkcopy.ColumnMappings.Add("Size2", "Size2");
            bulkcopy.ColumnMappings.Add("Size3", "Size3");
            bulkcopy.ColumnMappings.Add("Size4", "Size4");
            bulkcopy.ColumnMappings.Add("Size5", "Size5");
            bulkcopy.ColumnMappings.Add("Size6", "Size6");
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


        #region Filter
        public int FilterText(string filename)
        {
            string ssqltable = "temp_ProductFilterValue";
            var affectedRows = 0;
            string myexceldataquery = @"select CategoryId,ProductId,FilterParameter,FilterValue,FilterValueText
 from [Sheet1$]";
            try
            {
                //create our connection strings
                string sexcelconnectionstring = @"provider=microsoft.jet.oledb.4.0;data source=" + filename +
                ";extended properties=" + "\"excel 8.0;hdr=yes;\"";
                //execute a query to erase any previous data from our destination table
                //TODO:-
                //series of commands to bulk copy data from the excel file into our sql table
                OleDbConnection oledbconn = new OleDbConnection(sexcelconnectionstring);

                OleDbCommand oledbcmd = new OleDbCommand(myexceldataquery, oledbconn);
                try
                {
                    oledbconn.Open();
                    OleDbDataReader dr = oledbcmd.ExecuteReader();


                    SqlBulkCopy bulkcopy = new SqlBulkCopy(sqlConnectionString);
                    bulkcopy.DestinationTableName = ssqltable;
                    MapFilterColumns(bulkcopy);

                    bulkcopy.WriteToServer(dr);

                    oledbconn.Close();
                    LoadProductData executeLoadProduct= new LoadProductData();
                    executeLoadProduct.LoadCategoryMaster();
                    affectedRows = executeLoadProduct.LoadProductFilterValue();
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
                    oledbconn.Close();
                }

                return affectedRows;

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

            return affectedRows;
        }
        private void MapFilterColumns(SqlBulkCopy bulkcopy)
        {

            bulkcopy.ColumnMappings.Add("CategoryId", "CategoryId");
            bulkcopy.ColumnMappings.Add("ProductId", "ProductId");
            bulkcopy.ColumnMappings.Add("FilterParameter", "FilterParameter");
            bulkcopy.ColumnMappings.Add("FilterValue", "FilterValue");
            bulkcopy.ColumnMappings.Add("FilterValueText", "FilterValueText");
        }
     
        #endregion


        internal object LoadTempProductFilterValueWithProductName(string filename)
        {
            string ssqltable = "temp_ProductFilterValueWithProductName";
            var affectedRows = 0;
            string myexceldataquery = @"select PRODUCTNAME,FilterParameter,FilterValue,FilterValueText
 from [Sheet1$]";
            try
            {

                //create our connection strings

                string sexcelconnectionstring = @"provider=microsoft.jet.oledb.4.0;data source=" + filename +
               ";extended properties=" + "\"excel 8.0;hdr=yes;IMEX=1;TypeGuessRows=0;ImportMixedTypes=Text\"";

                //execute a query to erase any previous data from our destination table
                //TODO:-
                //series of commands to bulk copy data from the excel file into our sql table
                OleDbConnection oledbconn = new OleDbConnection(sexcelconnectionstring);

                OleDbCommand oledbcmd = new OleDbCommand(myexceldataquery, oledbconn);
                try
                {
                    oledbconn.Open();
                   
                    OleDbDataReader dr = oledbcmd.ExecuteReader();


                    SqlBulkCopy bulkcopy = new SqlBulkCopy(sqlConnectionString);
                    bulkcopy.DestinationTableName = ssqltable;
                    MapProductFilterValueWithNameColumns(bulkcopy);

                    bulkcopy.WriteToServer(dr);

                    oledbconn.Close();
                    
                    LoadProductData executeLoadProduct = new LoadProductData();
                    executeLoadProduct.LoadProductFilterValueTableFromtemp_ProductFilterValueWithProductName();
                    executeLoadProduct.LoadCategoryMaster();
                    affectedRows = executeLoadProduct.LoadProductFilterValue();
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
                    oledbconn.Close();
                }

                return affectedRows;

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

            return affectedRows;
        }

      
        private void MapProductFilterValueWithNameColumns(SqlBulkCopy bulkcopy)
        {
            bulkcopy.ColumnMappings.Add("ProductName", "ProductName");
            bulkcopy.ColumnMappings.Add("FilterParameter", "FilterParameter");
            bulkcopy.ColumnMappings.Add("FilterValue", "FilterValue");
            bulkcopy.ColumnMappings.Add("FilterValueText", "FilterValueText");
        }
    }
}
