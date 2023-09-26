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
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;

namespace VSOnline.VSECommerce.Domain.Loader
{
    /// <summary>
    /// Loader Logic. 
    /// 1.Load temp_products 
    /// 2. Load Products
    /// 3. Load temp_key feature 
    /// 4. load key feature 
    /// load temp,spec
    /// </summary>
    /// 
    public class ImportProductData
    {
        string sqlConnectionString = ConfigurationManager.ConnectionStrings["VBuyContext"].ConnectionString;
        string tempProductTable = "temp_Product";
        string tempPricingTable = "temp_Pricing";
        string tempKeyFeatureTable = "temp_ProductKeyFeatures";
        string tempSpecificationProductTable = "temp_ProductSpecification";
        string tempFilterProductTable = "temp_ProductFilterValueWithProductName";


        public string ImportDataTableToProduct(DataTable dt, string branchName, int storeId, int branchId)
        {
            string message = "";
            try
            {

              bool temploadStatus = LoadTempProductAndPricing(dt, branchName, storeId, branchId);
              bool tempFeaturesUploaded = LoadTempKeyFeaturesAndDetailedSpec(dt);
              string loadProductStatus = LoadProductTableFromTemp(temploadStatus);

              message = message +  loadProductStatus;

                LoadProductData loadDataObject = new LoadProductData();
                int loadPricingStatus = loadDataObject.LoadPricing();
                message = message + "Updated Pricing for" + loadPricingStatus.ToString();

                int loadKeyFeatureStatus = loadDataObject.LoadKeyFeatures();
                message = message + "Updated KeyFeatures for" + loadKeyFeatureStatus.ToString();

                int loadDetailedSpecStatus = loadDataObject.LoadDetailedSpecification();
                message = message + "Updated KeyFeatures for" + loadDetailedSpecStatus.ToString();

                //Load filters.
                int masterFilter = loadDataObject.LoadCategoryMaster();
                loadDataObject.LoadProductFilterValueTableFromtemp_ProductFilterValueWithProductName();
                int loadProductFilterStatus = loadDataObject.LoadProductFilterValue();
                message = message + "Updated KeyFeatures for" + loadProductFilterStatus.ToString();

            }
            catch(Exception ex)
            {
                return message + ex.Message;
            }
            return message;
        }

        private void LoadTempProductFilters(DataTable dt)
        {
            throw new NotImplementedException();
        }

        private string LoadProductTableFromTemp(bool temploadStatus)
        {
            string message = "";
            LoadProductData loadDataObject = new LoadProductData();
            if (temploadStatus)
            {
                message = " \r\n " + " Excel Validated for product......";

                try
                {
                    int numNewCategory = loadDataObject.LoadCategory();
                    message = message + " \r\n " + " Successfully loaded " + numNewCategory + " number of category";

                    int numManufacturer = loadDataObject.LoadManufacturer();
                    message = message + " \r\n " + " Successfully loaded " + numManufacturer + " number of Brands";

                    int loadedProductCount = loadDataObject.LoadProductsAndMapping();
                    message = message + " \r\n " + "Successfully loaded " + loadedProductCount + " number of Products";
                }
                catch (Exception ex)
                {
                    message = message + " \r\n " + ex.Message;
                }

            }
            else
            {
                message = message + " \r\n " + " Excel is having issue. Please Check for Column is blank or any issue in excel data......";
                message = message + " \r\n " + "Error loading products";
                message = message + " \r\n " + "Error loading products...Excel Is having issue. Please Check for Column is blank or any issue in excel data";
            }
            message = message + " \r\n " + " Done with Updating Products... " + DateTime.Now.ToString();

            return message;
        }

        private bool LoadTempProductAndPricing(DataTable dtProduct, string branchName, int storeId, int branchId)
        {
            DataTable resultProductDataTable = new DataTable();
            DataTable resultPricingDataTable = new DataTable();

           var flagData = GetProductDataTable(dtProduct, resultProductDataTable, resultPricingDataTable, branchName, storeId, branchId);
            try
            {
                if (flagData)
                {

                    //create our connection strings
                    string sclearsql = "delete from " + tempProductTable + " WHERE Published = 'True'";
                    SqlConnection sqlconn = new SqlConnection(sqlConnectionString);
                    SqlCommand sqlcmd = new SqlCommand(sclearsql, sqlconn);
                    try
                    {
                        sqlconn.Open();
                        sqlcmd.ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {
                        
                    }
                    finally
                    {
                        sqlconn.Close();
                    }

                    SqlBulkCopy bulkcopy = new SqlBulkCopy(sqlConnectionString);
                    bulkcopy.DestinationTableName = tempProductTable;

                    foreach (DataColumn column in resultProductDataTable.Columns)
                    {
                            bulkcopy.ColumnMappings.Add(column.ColumnName, column.ColumnName);
                     
                    }

                    bulkcopy.WriteToServer(resultProductDataTable);


                    bulkcopy.DestinationTableName = tempPricingTable;
                    bulkcopy.ColumnMappings.Clear();
                    foreach (DataColumn column in resultPricingDataTable.Columns)
                    {
                        bulkcopy.ColumnMappings.Add(column.ColumnName, column.ColumnName);

                    }
                    bulkcopy.WriteToServer(resultPricingDataTable);
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }
            return true;
        }

        private bool GetProductDataTable(DataTable productDataTable, 
            DataTable productResultDataTable, DataTable resultPricingDataTable,string branchName, int storeId, int branchId)
        {
            try
            {
                var productTableRows = productDataTable.Select();
                var tableColumnSize = productDataTable.Columns.Count;
                //ProductName Column 
                int indexProductName = productDataTable.Columns.IndexOf("ProductName");


                productResultDataTable.Columns.Add("PictureName");
                productResultDataTable.Columns.Add("PictureName1");
                productResultDataTable.Columns.Add("PictureName2");
                productResultDataTable.Columns.Add("Category");
                productResultDataTable.Columns.Add("SubCategory");
                productResultDataTable.Columns.Add("Name");
                productResultDataTable.Columns.Add("ShortDescription");
                productResultDataTable.Columns.Add("FullDescription");
                productResultDataTable.Columns.Add("Manufacturer");
                productResultDataTable.Columns.Add("MetaKeywords");
                productResultDataTable.Columns.Add("MetaDescription");
                productResultDataTable.Columns.Add("MetaTitle");
                productResultDataTable.Columns.Add("ManufacturerPartNumber");
                productResultDataTable.Columns.Add("Weight");
                productResultDataTable.Columns.Add("Length");
                productResultDataTable.Columns.Add("Width");
                productResultDataTable.Columns.Add("Height");
                productResultDataTable.Columns.Add("Color");
                productResultDataTable.Columns.Add("Size1");
                productResultDataTable.Columns.Add("Size2");
                productResultDataTable.Columns.Add("Size3");
                productResultDataTable.Columns.Add("Size4");
                productResultDataTable.Columns.Add("Size5");
                productResultDataTable.Columns.Add("Size6");

                //Pricing 

                resultPricingDataTable.Columns.Add("ProductName");
                resultPricingDataTable.Columns.Add("StoreId");
                resultPricingDataTable.Columns.Add("BranchId");
                resultPricingDataTable.Columns.Add("BranchName");
                resultPricingDataTable.Columns.Add("Price");
                resultPricingDataTable.Columns.Add("SpecialPrice");
                resultPricingDataTable.Columns.Add("AdditionalShippingCharge");
                resultPricingDataTable.Columns.Add("AdditionalTax");


                foreach (var row in productTableRows)
                {
                    var productName = row[indexProductName].ToString();
                    if (!string.IsNullOrEmpty(productName))
                    {
                        DataRow drResult = productResultDataTable.NewRow();
                        DataRow drPricingResult = resultPricingDataTable.NewRow();
                        drResult["Name"] = productName;
                        MapProductColumns(drResult, row);


                        productResultDataTable.Rows.Add(drResult);

                        drPricingResult["ProductName"] = productName;
                        drPricingResult["StoreId"] = storeId;
                        drPricingResult["BranchName"] = branchName;
                        drPricingResult["BranchId"] = branchId;
                        MapPricingColumns(drPricingResult, row);
                        resultPricingDataTable.Rows.Add(drPricingResult);
                    }

                }
            }
            catch
            {
                return false;
            }
            return true;
        }

        private void MapPricingColumns(DataRow drPricingResult, DataRow row)
        {
            drPricingResult["Price"] = row["Price"];
            drPricingResult["SpecialPrice"] = row["SpecialPrice"];
            drPricingResult["AdditionalShippingCharge"] = row["AdditionalShippingCharge"];
            drPricingResult["AdditionalTax"] = row["AdditionalTax"];
        }

        private void MapProductColumns(DataRow drResult, DataRow row)
        {
            
            drResult["PictureName"] = row["PictureName"];
            drResult["PictureName1"] = row["PictureName1"];
            drResult["PictureName2"] = row["PictureName2"];
            drResult["Category"] = row["Category"];
            drResult["SubCategory"] = row["SubCategory"];
            drResult["ShortDescription"] = row["ShortDescription"];
            drResult["FullDescription"] = row["FullDescription"];
            drResult["Manufacturer"] = row["Manufacturer"];
            drResult["MetaKeywords"] = row["MetaKeywords"];
            drResult["MetaDescription"] = row["MetaDescription"];
            drResult["MetaTitle"] = row["MetaTitle"];
            drResult["ManufacturerPartNumber"] = row["ManufacturerPartNumber"];
            drResult["Weight"] = row["Weight"];
            drResult["Length"] = row["Length"];
            drResult["Width"] = row["Width"];
            drResult["Height"] = row["Height"];
            drResult["Color"] = row["Color"];
            drResult["Size1"] = row["Size1"];
            drResult["Size2"] = row["Size2"];
            drResult["Size3"] = row["Size3"];
            drResult["Size4"] = row["Size4"];
            drResult["Size5"] = row["Size5"];
            drResult["Size6"] = row["Size6"];
        }

        private bool LoadTempKeyFeaturesAndDetailedSpec(DataTable dtProduct)
        {
            DataTable finalKeyFeatureDataTable = new DataTable();
            DataTable finalDetailedSpecDataTable = new DataTable();
            DataTable finalProductFilterDataTable = new DataTable();

            bool flagData= GetKeyFeatureDataTable(dtProduct, finalKeyFeatureDataTable, finalDetailedSpecDataTable, finalProductFilterDataTable);
            try
            {
                SqlBulkCopy bulkcopy = new SqlBulkCopy(sqlConnectionString);
                bulkcopy.DestinationTableName = tempKeyFeatureTable;
                bulkcopy.WriteToServer(finalKeyFeatureDataTable);

                bulkcopy.DestinationTableName = tempSpecificationProductTable;
                bulkcopy.WriteToServer(finalDetailedSpecDataTable);

                bulkcopy.DestinationTableName = tempFilterProductTable;
                bulkcopy.WriteToServer(finalProductFilterDataTable);

            }
            catch
            {
                return false;
            }
            return true;
        }      
        private bool LoadTempDetailedSpecification(DataTable dtProduct)
        {
            return true;
        }

        private bool LoadFilters(DataTable dtProductFilters)
        {
            return true;
        }


        private bool GetKeyFeatureDataTable(DataTable productDataTable, DataTable finalKeyFeatureDataTable, DataTable finalDetailedSpecDataTable, DataTable finalProductFilterDataTable)
        {
            try
            {
                var rowsKeyFeatures = productDataTable.Select();
                var tableColumnSize = productDataTable.Columns.Count;
                //ProductName Column 
                int indexProductName = productDataTable.Columns.IndexOf("ProductName");


                finalKeyFeatureDataTable.Columns.Add("ProductName");
                finalKeyFeatureDataTable.Columns.Add("Parameter");
                finalKeyFeatureDataTable.Columns.Add("KeyFeature");

                finalDetailedSpecDataTable.Columns.Add("ProductName");
                finalDetailedSpecDataTable.Columns.Add("SpecificationGroup");
                finalDetailedSpecDataTable.Columns.Add("SpecificationAttribute");
                finalDetailedSpecDataTable.Columns.Add("SpecificationDetails");


                finalProductFilterDataTable.Columns.Add("ProductName");
                finalProductFilterDataTable.Columns.Add("FilterParameter");
                finalProductFilterDataTable.Columns.Add("FilterValue");
                finalProductFilterDataTable.Columns.Add("FilterValueText");


                foreach (var keyfeatureRow in rowsKeyFeatures)
                {
                    for (int i = 0; i < tableColumnSize; i++)
                    {
                        string columnName = LoaderHelper.GetColumn(keyfeatureRow, i);

                        if (columnName.StartsWith("Keyfeature-"))
                        {
                            string[] splitColumnName = columnName.Split('-');
                            var parameterName = splitColumnName[splitColumnName.Length - 1];

                            var productName = keyfeatureRow[indexProductName].ToString();
                            var parameter = parameterName;
                            var value = keyfeatureRow[i].ToString();
                            DataRow dr = finalKeyFeatureDataTable.NewRow();
                            dr["ProductName"] = productName;
                            dr["Parameter"] = parameter;
                            dr["KeyFeature"] = value;
                            finalKeyFeatureDataTable.Rows.Add(dr);

                            if(columnName.Contains("Filter-"))
                            {
                                DataRow drFilter = finalProductFilterDataTable.NewRow();
                                drFilter["ProductName"] = productName;
                                drFilter["FilterParameter"] = parameter;
                                drFilter["FilterValue"] = value;
                                drFilter["FilterValueText"] = value;
                                finalProductFilterDataTable.Rows.Add(drFilter);
                            }
                        }

                        if (columnName.StartsWith("Specification"))
                        {
                            string[] splitSpecificationColumnName = columnName.Split('-');
                            var specificationAttribute = splitSpecificationColumnName[splitSpecificationColumnName.Length - 1];
                            var productName = keyfeatureRow[indexProductName].ToString();
                            var specificationGroup = "General";
                            if (splitSpecificationColumnName.Length > 2)
                            {
                                specificationGroup = splitSpecificationColumnName[1];
                            }
                            DataRow detailedSpecRow = finalDetailedSpecDataTable.NewRow();

                            detailedSpecRow["ProductName"] = productName;
                            detailedSpecRow["SpecificationGroup"] = specificationGroup;
                            detailedSpecRow["SpecificationAttribute"] = specificationAttribute;
                            detailedSpecRow["SpecificationDetails"] = keyfeatureRow[i].ToString();

                            finalDetailedSpecDataTable.Rows.Add(detailedSpecRow);

                        }

                    }
                }
            }
            catch
            {
                return false;
            }
            return true;
        }
    }
}
