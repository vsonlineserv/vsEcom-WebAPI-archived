////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce 
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VSOnline.VSECommerce.Domain;
using VSOnline.VSECommerce.Domain.DTO;
using System.Web.Http;
using System.Runtime.Serialization.Json;
using Newtonsoft.Json;
using VSOnline.VSECommerce.Persistence.Entity;
using VSOnline.VSECommerce.Utilities;
using VSOnline.VSECommerce.Core.Caching;
using VSOnline.VSECommerce.Domain.ResultSet;
using VSOnline.VSECommerce.Domain.Specification;
using System.Text;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
                                  
namespace VSOnline.VSECommerce.Web.Controllers
{
   [Authorize(Roles = "Administrators")]
    public class AdminMigratedProductController : ApiController
    {      
        IUnitOfWork _unitOfWork = null;

        public AdminMigratedProductController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        private SqlConnection con;
        string DbConName = ConfigurationManager.ConnectionStrings["VBuyContext"].ConnectionString;
        GetJsonData Jsondata = new GetJsonData();

        [HttpGet]
        [ActionName("LoadStore")]
        public string LoadStore(int storeId, string storeName, int branchID, string branchName)
        {

            string conStr = DbConName;
            String strjson = "", Query = "";
            DataSet ds = new DataSet();
            try
            {

                using (SqlConnection con = new SqlConnection(conStr))
                {

                    try
                    {
                        con.Open();
                        if ((storeName == null) && (branchName == null) && (branchID == 0) && (storeId != 0))
                        {

                            Query = "select  S.StoreId,S.StoreName,SB.Address1,SB.Address2,SB.BranchId,SB.BranchName,SB.Latitude,SB.Longitude,SB.EnableBuy, SB.FlagPartner, SB.PhoneNumber, SB.PostalCode from Seller S INNER JOIN SellerBranch SB  on S.StoreId=SB.Store where SB.Store=" + storeId + "";


                        }
                        if ((storeName == null) && (branchName != null) && (storeId == 0) && (branchID == 0))
                        {
                            Query = "select  S.StoreId,S.StoreName,SB.Address1,SB.Address2,SB.BranchId,SB.BranchName,SB.Latitude,SB.Longitude,SB.EnableBuy, SB.FlagPartner, SB.PhoneNumber, SB.PostalCode  from Seller S INNER JOIN SellerBranch SB  on S.StoreId=SB.Store where SB.BranchName like'%" + branchName + "%'";

                        }
                        else if ((branchName == null) && (storeName != null) && (storeId == 0) && (branchID == 0))
                        {
                            Query = "select  S.StoreId,S.StoreName,SB.Address1,SB.Address2,SB.BranchId,SB.BranchName,SB.Latitude,SB.Longitude,SB.EnableBuy, SB.FlagPartner, SB.PhoneNumber, SB.PostalCode  from Seller S INNER JOIN SellerBranch SB  on S.StoreId=SB.Store where  S.StoreName like '%" + storeName + "%' ";

                        }
                        else if ((branchID != 0 && storeId != 0))
                        {
                            Query = "select  S.StoreId,S.StoreName,SB.Address1,SB.Address2,SB.BranchId,SB.BranchName,SB.Latitude,SB.Longitude,SB.EnableBuy, SB.FlagPartner, SB.PhoneNumber, SB.PostalCode  from Seller S INNER JOIN SellerBranch SB  on S.StoreId=SB.Store where SB.Store=" + storeId + "";

                        }
                        else if ((branchID != 0) && (storeId == 0))
                        {
                            Query = "select  S.StoreId,S.StoreName,SB.Address1,SB.Address2,SB.BranchId,SB.BranchName,SB.Latitude,SB.Longitude,SB.EnableBuy, SB.FlagPartner, SB.PhoneNumber, SB.PostalCode  from Seller S INNER JOIN SellerBranch SB  on S.StoreId=SB.Store where SB.BranchId=" + branchID + "";

                        }
                        else if ((branchName != null) && (storeName != null))
                        {
                            Query = "select  S.StoreId,S.StoreName,SB.Address1,SB.Address2,SB.BranchId,SB.BranchName,SB.Latitude,SB.Longitude,SB.EnableBuy, SB.FlagPartner, SB.PhoneNumber, SB.PostalCode  from Seller S INNER JOIN SellerBranch SB  on S.StoreId=SB.Store where S.StoreName like'%" + storeName + "%'";

                        }
                        else
                        {
                            Query = Query = "select  S.StoreId,S.StoreName,SB.Address1,SB.Address2,SB.BranchId,SB.BranchName,SB.Latitude,SB.Longitude,SB.EnableBuy, SB.FlagPartner, SB.PhoneNumber, SB.PostalCode  from Seller S INNER JOIN SellerBranch SB  on S.StoreId=SB.Store where S.StoreId like " + storeId + "";
                        }

                        SqlCommand cmd = new SqlCommand(Query, con);
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        adp.Fill(ds);
                        strjson = Jsondata.GetJson(ds);
                    }

                    finally
                    {
                        con.Close();

                    }
                }

            }
            catch (Exception Ex)
            {

            }
            return strjson;




        }

        [HttpGet]
        [ActionName("ModifyProducts")]
        public String ModifyProducts(int productid, string proName, string proShortDesc, string proFullDesc,
            string PictureName, string PictureName1, string PictureName2, string MnuPartNumber, string BrandName, bool showonHomePage)
        {

            string conStr = DbConName;
            String strjson = "";
            DataSet ds = new DataSet();
            string[] UpdateValue = { proName, BrandName, MnuPartNumber, proShortDesc, proFullDesc, PictureName, PictureName1, PictureName2 };
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {



                        con.Open();
                        SqlCommand cmd1 = new SqlCommand("select * from Product where ProductId=" + productid + " ", con);
                        SqlDataAdapter sda = new SqlDataAdapter(cmd1);
                        sda.Fill(ds);
                        string product = ds.Tables[0].Rows[0]["Name"].ToString();
                        string ShortDesc = ds.Tables[0].Rows[0]["ShortDescription"].ToString();
                        string fullDesc = ds.Tables[0].Rows[0]["FullDescription"].ToString();
                        string pic1 = ds.Tables[0].Rows[0]["PictureName"].ToString();
                        string pic2 = ds.Tables[0].Rows[0]["PictureName1"].ToString();
                        string pic3 = ds.Tables[0].Rows[0]["PictureName2"].ToString();
                        string ManuPartNumber = ds.Tables[0].Rows[0]["ManufacturerPartNumber"].ToString();
                        string ProductBrandName = ds.Tables[0].Rows[0]["Manufacturer"].ToString();
                        string tablename = "Product";
                        string[] columnName = { "Name", "Manufacturer", "ManufacturerPartNumber", "ShortDescription", "FullDescription", "PictureName", "PictureName1", "PictureName2", "ProductDescriptionHtml" };
                        string[] oldValue = { product, ProductBrandName, ManuPartNumber, ShortDesc, fullDesc, pic1, pic2, pic3 };
                        string Query = "update Product set Manufacturer='{BrandName}', Name='{proName}',ManufacturerPartNumber='{MnuPartNumber}',ShortDescription='{proShortDesc}',FullDescription='{proFullDesc}',PictureName='{PictureName}',PictureName1='{PictureName1}',PictureName2='{PictureName2}', ShowonHomePage='{showOnHomePage}' where ProductId='{productid}'"
                                   .FormatWith(new { BrandName, proName, MnuPartNumber, proShortDesc, proFullDesc, PictureName, PictureName1, PictureName2,  productid, showonHomePage });
                        SqlCommand cmd = new SqlCommand(Query, con);
                        cmd.ExecuteNonQuery();


                        int rowsAffected = cmd.ExecuteNonQuery();

                        strjson = rowsAffected + " " + "- Updated Successfully";
                        if (rowsAffected == 1)
                        {
                            for (var Update = 0; Update <= UpdateValue.Length - 1; Update++)
                            {
                                AdminMigratedSaveHistory.insertData(productid, oldValue[Update], UpdateValue[Update], tablename, columnName[Update]);
                            }
                        }

                    

                    }
                    catch(Exception ex)
                    {

                    }
                    finally
                    {
                        con.Close();
                    }
                }

            }
            catch (Exception Ex)
            {

            }
            return strjson;

        }

        [HttpGet]
        [ActionName("ModifyStoreName")]
        public String ModifyStoreName(int EditStoreid, string EditStoreName)
        {

            string conStr = DbConName;
            String strjson = "", oldValue, tables, columns;
            DataSet ds = new DataSet();
            try
            {

                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {
                        con.Open();
                        string query1 = "select StoreId,StoreName from Seller where StoreId=" + EditStoreid + " ";
                        SqlCommand cmd1 = new SqlCommand(query1, con);
                        SqlDataAdapter sda1 = new SqlDataAdapter(cmd1);
                        DataSet ds1 = new DataSet();
                        sda1.Fill(ds1);
                        oldValue = ds1.Tables[0].Rows[0]["StoreName"].ToString();
                        tables = "Seller";
                        columns = "StoreName";
                        string Query = "update Seller set StoreName='" + EditStoreName + "' where StoreId=" + EditStoreid + "";

                        SqlCommand cmd = new SqlCommand(Query, con);
                        cmd.ExecuteNonQuery();

                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected == 1)
                        {
                            AdminMigratedSaveHistory.insertData(EditStoreid, EditStoreName, oldValue, tables, columns);
                        }




                    }

                    finally
                    {
                        con.Close();
                    }

                }

            }
            catch (Exception Ex)
            {
                throw new Exception(Ex.Message);
            }
            return strjson;

        }
        
        [HttpGet]
        [ActionName("ModifyBranch")]
        public string ModifyBranch(int branchid, string branchname, string address1, string address2, string pinCode, string phoneNumber, decimal latitude, decimal longitude, string EnableBuy, bool FlagPartner)
        {

            string conStr = DbConName;
            String strjson = "", branch = "", addres1 = "", tablename = "", addres2 = "", EnableBuyOption = "";
            string[] UpdateValue = { EnableBuy, branchname, address1, address2, Convert.ToDecimal(latitude).ToString(), Convert.ToDecimal(longitude).ToString() };
            decimal latitudes = 0, longitudes = 0;

            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {
                        con.Open();
                        SqlCommand cmd1 = new SqlCommand("select * from SellerBranch where BranchId=" + branchid + " ", con);
                        SqlDataAdapter sda = new SqlDataAdapter(cmd1);
                        DataSet ds1 = new DataSet();
                        sda.Fill(ds1);
                        branch = ds1.Tables[0].Rows[0]["BranchName"].ToString();
                        addres1 = ds1.Tables[0].Rows[0]["Address1"].ToString();
                        addres2 = ds1.Tables[0].Rows[0]["Address2"].ToString();
                        latitudes = Convert.ToDecimal(ds1.Tables[0].Rows[0]["Latitude"].ToString());
                        longitudes = Convert.ToDecimal(ds1.Tables[0].Rows[0]["Longitude"].ToString());
                        EnableBuyOption = ds1.Tables[0].Rows[0]["EnableBuy"].ToString();
                        string[] oldValue = { EnableBuyOption, branch, addres1, addres2, Convert.ToDecimal(latitudes).ToString(), Convert.ToDecimal(longitudes).ToString() };
                        tablename = "SellerBranch";
                        string[] columnname = { "EnableBuy", "BranchName", "Address1", "Address2", "Latitude", "Longitude" };
                        string Query = "update SellerBranch set  EnableBuy='" + EnableBuy + "',BranchName='" + branchname + "',Address1='" + address1 + "',Address2='" + address2 + "',Latitude='" + latitude + "',Longitude='" + longitude + "',PhoneNumber='" + phoneNumber + "', FlagPartner='" + FlagPartner + "', PostalCode='" + pinCode + "'  where BranchId=" + branchid + "";
                        SqlCommand cmd = new SqlCommand(Query, con);
                        cmd.ExecuteNonQuery();
                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected == 1)
                        {
                            for (var Update = 0; Update <= UpdateValue.Length - 1; Update++)
                            {
                                AdminMigratedSaveHistory.insertData(branchid, UpdateValue[Update], oldValue[Update], tablename, columnname[Update]);
                            }
                        }

                    }
                    finally
                    {
                        con.Close();
                    }
                }


            }
            catch (Exception Ex)
            {

            }

            return strjson;
        }

        [HttpGet]
        [ActionName("SearchProduct")]
        public String SearchProduct(int searchProId, string searchProName, int publishstatus)
        {

            string conStr = DbConName;
            string strjson = "", Query = "";
            DataSet ds = new DataSet();

            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {
                        con.Open();
                        if ((searchProId != 0) && (searchProName == null) && (publishstatus != 1))
                        {
                            Query = "select Product.ProductId,Product.Name,Manufacturer.Name as BrandName,Manufacturer.ManufacturerId,Product.ManufacturerPartNumber,Product.ShortDescription,Product.FullDescription,Product.PictureName,Product.PictureName1,Product.PictureName2,Product.ProductDescriptionHtml, Product.ShowOnHomePage from Product inner join Manufacturer on  Product.Manufacturer=Manufacturer.ManufacturerId  where ProductId=" + searchProId + "  and Published=0";
                        }
                        if (searchProId != 0 && searchProName != null && publishstatus != 1)
                        {
                            Query = "select Product.ProductId,Product.Name,Manufacturer.Name as BrandName,Manufacturer.ManufacturerId,Product.ManufacturerPartNumber,Product.ShortDescription,Product.FullDescription,Product.PictureName,Product.PictureName1,Product.PictureName2,Product.ProductDescriptionHtml, Product.ShowOnHomePage from Product inner join Manufacturer on  Product.Manufacturer=Manufacturer.ManufacturerId where ProductId=" + searchProId + " and Published=0";
                        }
                        if ((searchProName != null) && (searchProId == 0) && (publishstatus != 1))
                        {
                            Query = "select Product.ProductId,Product.Name,Manufacturer.Name as BrandName,Manufacturer.ManufacturerId,Product.ManufacturerPartNumber,Product.ShortDescription,Product.FullDescription,Product.PictureName,Product.PictureName1,Product.PictureName2,Product.ProductDescriptionHtml, Product.ShowOnHomePage from Product inner join Manufacturer on  Product.Manufacturer=Manufacturer.ManufacturerId where Product.Name like '%" + searchProName + "%' and Published=0";
                        }
                        if ((searchProId != 0) && (searchProName == null) && (publishstatus != 0))
                        {
                            Query = "select Product.ProductId,Product.Name,Manufacturer.Name as BrandName,Manufacturer.ManufacturerId,Product.ManufacturerPartNumber,Product.ShortDescription,Product.FullDescription,Product.PictureName,Product.PictureName1,Product.PictureName2,Product.ProductDescriptionHtml, Product.ShowOnHomePage from Product inner join  Manufacturer on  Product.Manufacturer=Manufacturer.ManufacturerId where  ProductId=" + searchProId + "  and Published=1";
                        }
                        if (searchProId != 0 && searchProName != null && publishstatus != 0)
                        {
                            Query = "select Product.ProductId,Product.Name,Manufacturer.Name as BrandName,Manufacturer.ManufacturerId,Product.ManufacturerPartNumber,Product.ShortDescription,Product.FullDescription,Product.PictureName,Product.PictureName1,Product.PictureName2,Product.ProductDescriptionHtml, Product.ShowOnHomePage from Product inner join Manufacturer on  Product.Manufacturer=Manufacturer.ManufacturerId where  ProductId=" + searchProId + "  and Published=1";
                        }
                        if ((searchProName != null) && (searchProId == 0) && (publishstatus != 0))
                        {
                            Query = "select Product.ProductId,Product.Name,Manufacturer.Name as BrandName,Manufacturer.ManufacturerId,Product.ManufacturerPartNumber,Product.ShortDescription,Product.FullDescription,Product.PictureName,Product.PictureName1,Product.PictureName2,Product.ProductDescriptionHtml, Product.ShowOnHomePage from Product inner join Manufacturer on Product.Manufacturer=Manufacturer.ManufacturerId where Product.Name like '%" + searchProName + "%'  and Published=1";
                        }

                        SqlCommand cmd = new SqlCommand(Query, con);
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        adp.Fill(ds);
                        strjson = Jsondata.GetJson(ds);

                    }

                    finally
                    {

                        con.Close();
                    }
                }



            }
            catch (Exception Ex)
            {

            }
            return strjson;




        }

        [HttpGet]
        [ActionName("getBrandId")]
        public string getBrandId(int Productid)
        {

            string conStr = DbConName;
            String strjson = "";


            try
            {

                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {
                        con.Open();
                        string Query = "with cte as (select distinct Category from Product where Product.ProductId=" + Productid + "),cte1 as (select distinct Category.ParentCategoryId from Category inner join cte on cte.Category=Category.CategoryId),cte2 as (select distinct Category.CategoryId from Category  inner join cte1 on cte1.ParentCategoryId=Category.ParentCategoryId),cte3 as (select distinct Manufacturer from Product inner join cte2 on cte2.CategoryId=Product.Category),cte4 as (select distinct cte3.Manufacturer,Manufacturer.Name from cte3 inner join Manufacturer on cte3.Manufacturer=Manufacturer.ManufacturerId) select * from cte4 order by cte4.Manufacturer asc";
                        //select distinct Manufacturer,Manufacturer.Name from Product,Manufacturer  where Product.Manufacturer=Manufacturer.ManufacturerId  order by Manufacturer asc";
                        SqlCommand cmd1 = new SqlCommand(Query, con);
                        SqlDataAdapter sda = new SqlDataAdapter(cmd1);
                        DataSet ds1 = new DataSet();
                        sda.Fill(ds1);
                        strjson = Jsondata.GetJson(ds1);
                    }

                    finally
                    {
                        con.Close();
                    }
                }

            }
            catch (Exception Ex)
            {

            }

            return strjson;
        }

        [HttpGet]
        [ActionName("SearchProductKey")]
        public String SearchProductKey(int Productkey)
        {

            String conStr = DbConName;
            String strjson = "";
            DataSet ds = new DataSet();
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {

                        con.Open();
                        string Query = "select ProductKeyFeatures.Id, ProductKeyFeatures.ProductId,ProductKeyFeatures.Parameter,ProductKeyFeatures.KeyFeature,ProductKeyFeatures.DisplayOrder from ProductKeyFeatures where ProductId=" + Productkey + " ";
                        SqlCommand cmd = new SqlCommand(Query, con);
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        adp.Fill(ds);
                        strjson = Jsondata.GetJson(ds);
                    }
                    finally
                    {
                        con.Close();
                    }
                }



            }
            catch (Exception Ex)
            {

            }
            return strjson;




        }
       
        [HttpGet]
        [ActionName("ModifyProductKey")]
        public string ModifyProductKey(int keyID, int display, string param, string keyFeatures)
        {


            string conStr = DbConName;
            String strjson = "", tablename = "";
            string[] UpdateValue = { Convert.ToInt32(display).ToString(), param, keyFeatures };

            DataSet ds = new DataSet();
            try
            {

                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {

                        con.Open();
                        string OldQuery = "select * from ProductKeyFeatures  where Id=" + keyID + "";
                        SqlCommand cmd1 = new SqlCommand(OldQuery, con);
                        SqlDataAdapter adp = new SqlDataAdapter(cmd1);
                        adp.Fill(ds);
                        string[] oldValue = { ds.Tables[0].Rows[0]["DisplayOrder"].ToString(), ds.Tables[0].Rows[0]["Parameter"].ToString(), ds.Tables[0].Rows[0]["KeyFeature"].ToString() };
                        tablename = "ProductKeyFeatures";
                        string[] columnname = { "DisplayOrder", "Parameter", "KeyFeature" };
                        string Query = "update ProductKeyFeatures set Parameter='" + param + "',KeyFeature='" + keyFeatures + "',DisplayOrder='" + display + "'   where Id=" + keyID + " ";
                        SqlCommand cmd = new SqlCommand(Query, con);
                        cmd.ExecuteNonQuery();
                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected == 1)
                        {
                            for (var Update = 0; Update <= UpdateValue.Length - 1; Update++)
                            {
                                AdminMigratedSaveHistory.insertData(keyID, UpdateValue[Update], oldValue[Update], tablename, columnname[Update]);
                            }
                        }

                    }
                    finally
                    {
                        con.Close();
                    }

                }


            }
            catch (Exception Ex)
            {

            }
            return strjson;




        }
    
   ///Publish Product 
   ///
        [HttpGet]
        [ActionName("unPublishedProduct")]
        public String unPublishedProduct()
        {


            string conStr = DbConName; String strjson = "";
            DataSet ds = new DataSet();
            try
            {

                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {
                        con.Open();
                        string Query = "select ProductId,Name,ShortDescription,FullDescription,Published,IsDeleted from Product   where (Published is null  or Published= 'false' or Published= 0) and (IsDeleted=0 or IsDeleted is null  or IsDeleted='false') ";
                        SqlCommand cmd = new SqlCommand(Query, con);
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        adp.Fill(ds);
                        strjson = Jsondata.GetJson(ds);
                    }

                    finally
                    {
                        con.Close();
                    }

                }
            }
            catch (Exception Ex)
            {

            }
            return strjson;




        }

        [HttpGet]
        [ActionName("PublishedProduct")]
        public String PublishedProduct()
        {


            string conStr = DbConName; String strjson = "";
            DataSet ds = new DataSet();
            try
            {

                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {
                        con.Open();
                        string Query = "select ProductId,Name,Published from Product WHERE UpdatedOnUtc > CAST(GETUTCDATE()-3 AS DATE) and  (Published= 'true' or Published= 1) order by ProductId asc ";
                        SqlCommand cmd = new SqlCommand(Query, con);
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        adp.Fill(ds);
                        strjson = Jsondata.GetJson(ds);
                    }

                    finally
                    {
                        con.Close();
                    }

                }
            }
            catch (Exception Ex)
            {

            }
            return strjson;




        }

        [HttpPost]
        [ActionName("UpdatePublishedProduct")]
        public String UpdatePublishedProduct(string[] publishIds)
        {

            string conStr = DbConName;
            String strjson = "";
            DataSet ds = new DataSet();
            try
            {

                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {
                        string[] selectID = publishIds;
                       
                            con.Open();
                            string Query = "update Product set Published=1,UpdatedOnUtc=GETUTCDATE()  where ProductId in (" + string.Join(",", selectID) + ")";
                            SqlCommand cmd = new SqlCommand(Query, con);
                            cmd.ExecuteNonQuery();
                            int rowsAffected = cmd.ExecuteNonQuery();
                            strjson = rowsAffected.ToString();
                            con.Close();
                        

                    }
                    catch
                    {

                    }
                    finally
                    {
                        con.Close();
                    }

                }
            }
            catch (Exception Ex)
            {

            }
            return strjson;
        }
   
       ///SEO 
        [HttpGet]
        [ActionName("loadSeoCategory")]
        public string loadSeoCategory()
        {
            string conStr = DbConName;
            String strjson = "";


            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {

                        con.Open();
                        string Query = "select CategoryId,Name from Category where ParentCategoryId is null";
                        SqlCommand cmd1 = new SqlCommand(Query, con);
                        SqlDataAdapter sda = new SqlDataAdapter(cmd1);
                        DataSet ds1 = new DataSet();
                        sda.Fill(ds1);
                        strjson = Jsondata.GetJson(ds1);
                    }


                    finally
                    {
                        con.Close();
                    }
                }
            }
            catch (Exception Ex)
            {

            }

            return strjson;
        }

        [HttpGet]
        [ActionName("loadSubCategory")]
        public string loadSubCategory(int CategoryId)
        {
            string conStr = DbConName;
            String strjson = "";


            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {

                        con.Open();
                        string Query = "select CategoryId,Name from Category where ParentCategoryId =" + CategoryId + "";

                        SqlCommand cmd1 = new SqlCommand(Query, con);
                        SqlDataAdapter sda = new SqlDataAdapter(cmd1);
                        DataSet ds1 = new DataSet();
                        sda.Fill(ds1);
                        strjson = Jsondata.GetJson(ds1);
                    }

                    finally
                    {
                        con.Close();
                    }
                }

            }
            catch (Exception Ex)
            {

            }

            return strjson;
        }
        [HttpGet]
        [ActionName("seoProductList")]
        public String seoProductList(int CategoryId, int SubCategoryId)
        {

            string conStr = DbConName;
            String strjson = "", Query = "";
            DataSet ds = new DataSet();
            try
            {

                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {
                        con.Open();
                        if (Convert.ToString(SubCategoryId) == "0")
                        {
                            Query = "with cte As  (select Category.CategoryId from Category where Category.ParentCategoryId=" + CategoryId + "),cte1 as (select ProductId,Name,MetaTitle,MetaDescription,MetaKeywords from Product inner join cte on cte.CategoryId=Product.Category) select ProductId,Name,MetaTitle,MetaDescription,MetaKeywords from cte1 order by ProductId asc";
                        }
                        else
                        {
                            Query = "select ProductId,Name,MetaTitle,MetaDescription,MetaKeywords from Product where Product.Category=" + SubCategoryId + "";
                        }
                        SqlCommand cmd = new SqlCommand(Query, con);
                        SqlDataAdapter adp = new SqlDataAdapter(cmd);
                        adp.Fill(ds);
                        strjson = Jsondata.GetJson(ds);
                    }

                    finally
                    {
                        con.Close();
                    }
                }
            }
            catch (Exception Ex)
            {

            }
            return strjson;




        }
        [HttpGet]
        [ActionName("ModifySEOProduct")]
        public String ModifySEOProduct(int ProductId, string MetaTitle, string MetaDescription, string MetaKeywords)
        {

            string conStr = DbConName;
            String strjson = "", tablename = "Product";
            string[] UpdateValue = { MetaTitle, MetaDescription, MetaKeywords };
            string[] columnName = { "MetaTitle", "MetaDescription", "MetaKeywords" };
            DataSet ds = new DataSet();
            try
            {

                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {

                        string oldQuery = "select MetaTitle,MetaDescription,MetaKeywords from Product where ProductId=" + ProductId + " ";
                        SqlCommand cmd1 = new SqlCommand(oldQuery, con);
                        SqlDataAdapter sda = new SqlDataAdapter(cmd1);
                        sda.Fill(ds);
                        string[] oldValue = { ds.Tables[0].Rows[0]["MetaTitle"].ToString(), ds.Tables[0].Rows[0]["MetaDescription"].ToString(), ds.Tables[0].Rows[0]["MetaKeywords"].ToString() };
                        con.Open();
                        string Query = "update Product set MetaTitle='" + MetaTitle + "',MetaDescription='" + MetaDescription + "',MetaKeywords='" + MetaKeywords + "'  where ProductId=" + ProductId + " ";
                        SqlCommand cmd = new SqlCommand(Query, con);
                        cmd.ExecuteNonQuery();
                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected == 1)
                        {
                            for (var Update = 0; Update <= UpdateValue.Length - 1; Update++)
                            {
                                AdminMigratedSaveHistory.insertData(ProductId, UpdateValue[Update], oldValue[Update], tablename, columnName[Update]);
                            }

                        }
                        con.Close();


                    }

                    finally { con.Close(); }
                }
            }
            catch (Exception Ex)
            {

            }
            return strjson;
        }
        
       /// <summary>
       /// PRICING
       /// </summary>
       /// <returns></returns>
       [HttpGet]
        [ActionName("LoadPricingColumnnameForExcel")]
        public string LoadPricingColumnnameForExcel()
        {
            string conStr = DbConName;
            String strjson = "";


            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {

                        con.Open();
                        string Query = "SELECT 'SellerBranch.'+ COLUMN_NAME as ColumnName from INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'SellerBranch' and COLUMN_NAME='BranchName' UNION SELECT   'pricing.'+ COLUMN_NAME as ColumnName from INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'pricing' and COLUMN_NAME in('Product','Price','SpecialPrice') UNION SELECT   'Manufacturer.'+ COLUMN_NAME as ColumnName from INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Manufacturer' and COLUMN_NAME='Name' UNION SELECT  DISTINCT 'Category.'+ COLUMN_NAME as ColumnName FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Category' and COLUMN_NAME='Name'  UNION SELECT  DISTINCT 'product.'+ COLUMN_NAME as ColumnName FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='product' and COLUMN_NAME='Name' order by ColumnName asc";
                        SqlCommand cmd1 = new SqlCommand(Query, con);
                        SqlDataAdapter sda = new SqlDataAdapter(cmd1);
                        DataSet ds1 = new DataSet();
                        sda.Fill(ds1);
                        strjson = Jsondata.GetJson(ds1);
                    }

                    finally
                    {
                        con.Close();
                    }
                }

            }
            catch (Exception Ex)
            {

            }

            return strjson;
        }

       [HttpGet]
       [ActionName("LoadPricingExcelDetails")]
        public string LoadPricingExcelDetails(string BranchName, string SelectedId, string BranchId)
        {
            string conStr = DbConName;
            String strjson = "", Query = "";


            try
            {

                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {
                        con.Open();

                        if (!string.IsNullOrEmpty(BranchName) && string.IsNullOrEmpty(BranchId))
                        {
                            Query = "select  " + SelectedId + " from  SellerBranch inner join pricing on  SellerBranch.BranchId=pricing.Branch  inner join Product on  pricing.Product=Product.ProductId  inner join  Manufacturer on Product.Manufacturer=Manufacturer.ManufacturerId inner join Category on Product.Category=Category.CategoryId where  SellerBranch.BranchName='" + BranchName + "'  order by pricing.Product asc";

                        }
                        if (string.IsNullOrEmpty(BranchName) && !string.IsNullOrEmpty(BranchId))
                        {
                            Query = "select " + SelectedId + " from   SellerBranch inner join pricing on SellerBranch.BranchId=pricing.Branch  inner join Product on  pricing.Product=Product.ProductId  inner join  Manufacturer on Product.Manufacturer=Manufacturer.ManufacturerId inner join Category on Product.Category=Category.CategoryId where  SellerBranch.BranchId=" + BranchId + "  order by pricing.Product asc";

                        }
                        if (!string.IsNullOrEmpty(BranchName) && string.IsNullOrEmpty(BranchId))
                        {
                            Query = "select  " + SelectedId + " from SellerBranch inner join pricing on SellerBranch.BranchId=pricing.Branch  inner join Product on  pricing.Product=Product.ProductId  inner join  Manufacturer on Product.Manufacturer=Manufacturer.ManufacturerId inner join Category on Product.Category=Category.CategoryId where  SellerBranch.BranchId=" + BranchId + " and SellerBranch.BranchName='" + BranchName + "' order by pricing.Product asc";

                        }
                        SqlCommand cmd1 = new SqlCommand(Query, con);
                        SqlDataAdapter sda = new SqlDataAdapter(cmd1);
                        DataSet ds1 = new DataSet();
                        sda.Fill(ds1);
                        strjson = Jsondata.GetJson(ds1);
                    }

                    finally
                    {
                        con.Close();
                    }
                }

            }
            catch (Exception Ex)
            {

            }

            return strjson;
        }

       [HttpGet]
       [ActionName("LoadBranchProductDetails")]
        public string LoadBranchProductDetails(string BranchName, string BranchId)
        {
            String strjson = "", Query = "";


            string conStr = DbConName;
            try
            {

                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {
                        con.Open();

                        if (!string.IsNullOrEmpty(BranchName) && string.IsNullOrEmpty(BranchId))
                        {
                            Query = "select  Manufacturer.Name as BrandName,Category.Name as CategoryName,SellerBranch.BranchName,Product.Name,pricing.PricingId,pricing.Product,pricing.Price,pricing.OldPrice,pricing.ProductCost,pricing.SpecialPrice,convert(varchar(10), pricing.SpecialPriceStartDateTimeUtc, 120)as SpecialPriceStartDateTimeUtc ,convert(varchar(10), pricing.SpecialPriceEndDateTimeUtc, 120) as SpecialPriceEndDateTimeUtc from  SellerBranch inner join pricing on  SellerBranch.BranchId=pricing.Branch  inner join Product on  pricing.Product=Product.ProductId  inner join  Manufacturer on Product.Manufacturer=Manufacturer.ManufacturerId inner join Category on Product.Category=Category.CategoryId where  SellerBranch.BranchName='" + BranchName + "'  order by pricing.Product asc";

                        }
                        if (string.IsNullOrEmpty(BranchName) && !string.IsNullOrEmpty(BranchId))
                        {
                            Query = "select  Manufacturer.Name as BrandName,Category.Name as CategoryName,SellerBranch.BranchName,Product.Name,pricing.PricingId,pricing.Product,pricing.Price,pricing.OldPrice,pricing.ProductCost,pricing.SpecialPrice,convert(varchar(10), pricing.SpecialPriceStartDateTimeUtc, 120)as SpecialPriceStartDateTimeUtc ,convert(varchar(10), pricing.SpecialPriceEndDateTimeUtc, 120) as SpecialPriceEndDateTimeUtc from   SellerBranch inner join pricing on SellerBranch.BranchId=pricing.Branch  inner join Product on  pricing.Product=Product.ProductId  inner join  Manufacturer on Product.Manufacturer=Manufacturer.ManufacturerId inner join Category on Product.Category=Category.CategoryId where  SellerBranch.BranchId=" + BranchId + "  order by pricing.Product asc";

                        }
                        if (!string.IsNullOrEmpty(BranchName) && !string.IsNullOrEmpty(BranchId))
                        {
                            Query = "select  Manufacturer.Name as BrandName,Category.Name as CategoryName,SellerBranch.BranchName,Product.Name,pricing.PricingId,pricing.Product,pricing.Price,pricing.OldPrice,pricing.ProductCost,pricing.SpecialPrice,convert(varchar(10), pricing.SpecialPriceStartDateTimeUtc, 120)as SpecialPriceStartDateTimeUtc ,convert(varchar(10), pricing.SpecialPriceEndDateTimeUtc, 120) as SpecialPriceEndDateTimeUtc from SellerBranch inner join pricing on SellerBranch.BranchId=pricing.Branch  inner join Product on  pricing.Product=Product.ProductId  inner join  Manufacturer on Product.Manufacturer=Manufacturer.ManufacturerId inner join Category on Product.Category=Category.CategoryId where  SellerBranch.BranchId=" + BranchId + " and SellerBranch.BranchName='" + BranchName + "' order by pricing.Product asc";

                        }
                        SqlCommand cmd1 = new SqlCommand(Query, con);
                        SqlDataAdapter sda = new SqlDataAdapter(cmd1);
                        DataSet ds1 = new DataSet();
                        sda.Fill(ds1);
                        strjson = Jsondata.GetJson(ds1);
                    }

                    finally
                    {
                        con.Close();

                    }
                }

            }
            catch (Exception Ex)
            {

            }

            return strjson;
        }


       [HttpGet]
       [ActionName("LoadBranchProductExcelDetails")]
        public string LoadBranchProductExcelDetails(string BranchName, string BranchId)
        {
            String strjson = "", Query = "";


            string conStr = DbConName;
            try
            {

                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {
                        con.Open();
                        if (!string.IsNullOrEmpty(BranchName) && string.IsNullOrEmpty(BranchId))
                        {
                            Query = "select  Manufacturer.Name as BrandName,Category.Name as CategoryName,SellerBranch.BranchName,Product.Name,pricing.PricingId,pricing.Product,pricing.Price,pricing.OldPrice,pricing.ProductCost,pricing.SpecialPrice,convert(varchar(10), pricing.SpecialPriceStartDateTimeUtc, 120)as SpecialPriceStartDateTimeUtc ,convert(varchar(10), pricing.SpecialPriceEndDateTimeUtc, 120) as SpecialPriceEndDateTimeUtc from  SellerBranch inner join pricing on  SellerBranch.BranchId=pricing.Branch  inner join Product on  pricing.Product=Product.ProductId  inner join  Manufacturer on Product.Manufacturer=Manufacturer.ManufacturerId inner join Category on Product.Category=Category.CategoryId where  SellerBranch.BranchName='" + BranchName + "'  order by pricing.Product asc";

                        }
                        if (string.IsNullOrEmpty(BranchName) && !string.IsNullOrEmpty(BranchId))
                        {
                            Query = "select  Manufacturer.Name as BrandName,Category.Name as CategoryName,SellerBranch.BranchName,Product.Name,pricing.PricingId,pricing.Product,pricing.Price,pricing.OldPrice,pricing.ProductCost,pricing.SpecialPrice,convert(varchar(10), pricing.SpecialPriceStartDateTimeUtc, 120)as SpecialPriceStartDateTimeUtc ,convert(varchar(10), pricing.SpecialPriceEndDateTimeUtc, 120) as SpecialPriceEndDateTimeUtc from   SellerBranch inner join pricing on SellerBranch.BranchId=pricing.Branch  inner join Product on  pricing.Product=Product.ProductId  inner join  Manufacturer on Product.Manufacturer=Manufacturer.ManufacturerId inner join Category on Product.Category=Category.CategoryId where  SellerBranch.BranchId=" + BranchId + "  order by pricing.Product asc";

                        }
                        if (!string.IsNullOrEmpty(BranchName) && !string.IsNullOrEmpty(BranchId))
                        {
                            Query = "select  Manufacturer.Name as BrandName,Category.Name as CategoryName,SellerBranch.BranchName,Product.Name,pricing.PricingId,pricing.Product,pricing.Price,pricing.OldPrice,pricing.ProductCost,pricing.SpecialPrice,convert(varchar(10), pricing.SpecialPriceStartDateTimeUtc, 120)as SpecialPriceStartDateTimeUtc ,convert(varchar(10), pricing.SpecialPriceEndDateTimeUtc, 120) as SpecialPriceEndDateTimeUtc from SellerBranch inner join pricing on SellerBranch.BranchId=pricing.Branch  inner join Product on  pricing.Product=Product.ProductId  inner join  Manufacturer on Product.Manufacturer=Manufacturer.ManufacturerId inner join Category on Product.Category=Category.CategoryId where  SellerBranch.BranchId=" + BranchId + " and SellerBranch.BranchName='" + BranchName + "' order by pricing.Product asc";

                        }
                        SqlCommand cmd1 = new SqlCommand(Query, con);
                        SqlDataAdapter sda = new SqlDataAdapter(cmd1);
                        DataSet ds1 = new DataSet();
                        sda.Fill(ds1);
                        strjson = Jsondata.GetJson(ds1);
                    }

                    finally
                    {
                        con.Close();

                    }
                }

            }
            catch (Exception Ex)
            {

            }

            return strjson;
        }
       
       [HttpGet]
       [ActionName("UpdatePriceDetails")]
        public string UpdatePriceDetails(int priceid, string price, string oldprice, string productcost, string SpecialPrice, string SplStartDate, string SplEndDate)
        {

            string conStr = DbConName;
            String strjson = "", Query = "", tablename = "pricing";
            string[] UpdateValue = { price, SpecialPrice, SplStartDate, SplEndDate };
            string[] columnName = { "Price", "SpecialPrice", "SpecialPriceStartDateTimeUtc", "SpecialPriceEndDateTimeUtc" };
            DataSet ds = new DataSet();


            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {

                    try
                    {
                        con.Open();
                        string oldQuery = "select * from pricing where PricingId=" + priceid + " ";
                        SqlCommand cmd1 = new SqlCommand(oldQuery, con);
                        SqlDataAdapter sda = new SqlDataAdapter(cmd1);
                        sda.Fill(ds);
                        string[] oldValue = { ds.Tables[0].Rows[0]["Price"].ToString(), ds.Tables[0].Rows[0]["SpecialPrice"].ToString(), ds.Tables[0].Rows[0]["SpecialPriceStartDateTimeUtc"].ToString(), ds.Tables[0].Rows[0]["SpecialPriceEndDateTimeUtc"].ToString() };


                        if ((!string.IsNullOrEmpty(SplStartDate)) && (!string.IsNullOrEmpty(SplEndDate)))
                        {
                            Query = "update  pricing set  SpecialPriceStartDateTimeUtc='" + SplStartDate + "',SpecialPriceEndDateTimeUtc='" + SplEndDate + "', Price=" + price + ",OldPrice=" + oldprice + ",ProductCost=" + productcost + ",SpecialPrice=" + SpecialPrice + " where PricingId=" + priceid + " ";
                        }

                        if ((string.IsNullOrEmpty(SplStartDate)) && (!string.IsNullOrEmpty(SplEndDate)))
                        {
                            Query = "update  pricing set  SpecialPriceStartDateTimeUtc=null,SpecialPriceEndDateTimeUtc='" + SplEndDate + "', Price=" + price + ",OldPrice=" + oldprice + ",ProductCost=" + productcost + ",SpecialPrice=" + SpecialPrice + " where PricingId=" + priceid + " ";
                        }
                        if ((!string.IsNullOrEmpty(SplStartDate)) && (string.IsNullOrEmpty(SplEndDate)))
                        {
                            Query = "update  pricing set  SpecialPriceStartDateTimeUtc='" + SplStartDate + "',SpecialPriceEndDateTimeUtc=null, Price=" + price + ",OldPrice=" + oldprice + ",ProductCost=" + productcost + ",SpecialPrice=" + SpecialPrice + " where PricingId=" + priceid + " ";
                        }
                        if ((string.IsNullOrEmpty(SplStartDate)) && (string.IsNullOrEmpty(SplEndDate)))
                        {
                            Query = "update  pricing set  SpecialPriceStartDateTimeUtc=null,SpecialPriceEndDateTimeUtc=null, Price=" + price + ",OldPrice=" + oldprice + ",ProductCost=" + productcost + ",SpecialPrice=" + SpecialPrice + " where PricingId=" + priceid + " ";
                        }
                        SqlCommand cmd = new SqlCommand(Query, con);
                        cmd.ExecuteNonQuery();
                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected == 1)
                        {

                            for (var Update = 0; Update <= UpdateValue.Length - 1; Update++)
                            {
                                AdminMigratedSaveHistory.insertData(priceid, UpdateValue[Update], oldValue[Update], tablename, columnName[Update]);
                            }

                        }
                        con.Close();
                        SqlDataAdapter sda1 = new SqlDataAdapter(cmd);
                        DataSet ds1 = new DataSet();
                        sda1.Fill(ds1);
                        strjson = Jsondata.GetJson(ds1);
                    }

                    finally
                    {
                        con.Close();
                    }

                }
            }
            catch (Exception Ex)
            {

            }

            return strjson;
        }

    
   }           
}
