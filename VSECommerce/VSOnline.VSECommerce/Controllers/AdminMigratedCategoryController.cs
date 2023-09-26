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
    public class AdminMigratedCategoryController : ApiController
    {      
        IUnitOfWork _unitOfWork = null;

        public AdminMigratedCategoryController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        private SqlConnection con;
        string DbConName = ConfigurationManager.ConnectionStrings["VBuyContext"].ConnectionString;
        GetJsonData Jsondata = new GetJsonData();
        
       [HttpGet]
       [ActionName("loadPublishedCategory")]
        public String loadPublishedCategory()
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
                        con.Open();
                        string Query = "select CategoryId,Name,Published from Category  where UpdatedOnUtc > CAST(GETUTCDATE()-3 AS DATE) and ( Published= 'true' or Published= 1) order by CategoryId asc ";
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
       [ActionName("unPublishedCategory")]
        public String unPublishedCategory()
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
                        con.Open();
                        string Query = "select CategoryId,Name,Published,IsDeleted from Category   where (Published is null  or Published= 'false' or Published= 0) and (IsDeleted=0 or IsDeleted is null  or IsDeleted='false') ";
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
        public String UpdatePublishedCategories(string[] publishIds)
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
                        con.Open();
                            string[] selectID = publishIds;
                            string Query = "update Category set Published=1,UpdatedOnUtc=GETUTCDATE()  where CategoryId in(" + string.Join(",", selectID) + ")";
                            SqlCommand cmd = new SqlCommand(Query, con);
                            cmd.ExecuteNonQuery();
                            int rowsAffected = cmd.ExecuteNonQuery();
                            strjson = rowsAffected.ToString();                           
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


       //Category LIst Controller Methods
        [HttpGet]
        [ActionName("searchCategory")]
        public String searchCategory(int categoryId, string categoryName)
        {

            string DbConName = ConfigurationManager.ConnectionStrings["VBuyContext"].ConnectionString;
            String strjson = "", Query = "";
            DataSet ds = new DataSet();
            try
            {

                using (SqlConnection con = new SqlConnection(DbConName))
                {
                    try
                    {
                        con.Open();
                        if ((categoryId != 0) && (categoryName == null))
                        {
                            Query = "select CategoryId,Name,CategoryGroupTag,GroupDisplayOrder,DisplayOrder,Published from Category where CategoryId=" + categoryId + " and (IsDeleted is null or IsDeleted =0 or IsDeleted='False' ) ";
                        }
                        if (categoryId != 0 && categoryName != null)
                        {
                            Query = " select CategoryId,Name,CategoryGroupTag,GroupDisplayOrder,DisplayOrder,Published from Category where CategoryId=" + categoryId + " and (IsDeleted is null or IsDeleted =0 or IsDeleted='False' ) ";
                        }
                        if ((categoryName != null) && (categoryId == 0))
                        {
                            Query = "select CategoryId,Name,CategoryGroupTag,GroupDisplayOrder,DisplayOrder,Published  from Category where (Name like N'%" + categoryName + "%')and (IsDeleted is null or IsDeleted =0 or IsDeleted='False' ) ";
                        }

                        SqlCommand cmd = new SqlCommand(Query, con);
                        SqlDataAdapter sda = new SqlDataAdapter(cmd);
                        sda.Fill(ds);
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
        [ActionName("modifyCategory")]
        public String modifyCategory(int id, string categoryName, string CategoryGroupTag, int GroupDisplayOrder, int DisplayOrder, string Published, string flagTopCategory)
        {
            
            string DbConName = ConfigurationManager.ConnectionStrings["VBuyContext"].ConnectionString;
            string conStr = DbConName;
            String strjson = "", Query = "";
            string[] updateValue = { categoryName, CategoryGroupTag, Convert.ToInt32(GroupDisplayOrder).ToString(), Convert.ToInt32(DisplayOrder).ToString(), Published };
            string[] columnName = { "Name",  "CategoryGroupTag", "GroupDisplayOrder", "DisplayOrder", "Published" };
            DataSet ds = new DataSet();
            try
            {

                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {
                        con.Open();
                        Query = "select Name,DisplayOrder,CategoryGroupTag,GroupDisplayOrder,Published from Category where CategoryId=" + id + " ";
                        SqlCommand cmd = new SqlCommand(Query, con);
                        SqlDataAdapter sda = new SqlDataAdapter(cmd);
                        sda.Fill(ds);
                        string[] oldValue = { ds.Tables[0].Rows[0]["Name"].ToString(), ds.Tables[0].Rows[0]["CategoryGroupTag"].ToString(), ds.Tables[0].Rows[0]["GroupDisplayOrder"].ToString(), ds.Tables[0].Rows[0]["DisplayOrder"].ToString(), ds.Tables[0].Rows[0]["Published"].ToString() };
                        string modifyQuery = "update Category set Name ='" + categoryName + "',DisplayOrder=" + DisplayOrder + ",UpdatedOnUtc=getdate(),CategoryGroupTag='" + CategoryGroupTag + "',GroupDisplayOrder=" + GroupDisplayOrder + ",Published=" + Published + ",ShowOnHomePage=" + flagTopCategory + " where CategoryId=" + id + "";
                        SqlCommand cmd1 = new SqlCommand(modifyQuery, con);
                        cmd1.ExecuteNonQuery();
                        int rowsAffected = cmd1.ExecuteNonQuery();
                        if (rowsAffected == 1)
                        {
                            for (var Update = 0; Update <= updateValue.Length - 1; Update++)
                            {
                                AdminMigratedSaveHistory.insertData(id, updateValue[Update], oldValue[Update], "Category ", columnName[Update]);
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
    
       ///Export Methods
        [HttpGet]
         [ActionName("LoadCategory")]
        public string LoadCategory()
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
          [ActionName("LoadSubCategory")]
        public string LoadSubCategory(int CateId)
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
                        string Query = "select CategoryId,Name from Category where ParentCategoryId =" + CateId + "";

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
        [ActionName("LoadGridSubproductCategoryDetails")]
        public string LoadGridSubproductCategoryDetails(int Catid, int Parid)
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
                        string Query = " select  Manufacturer.Name as BrandName,Category.Name as Category, Product.ProductId,Product.Name as ProductName,Product.ManufacturerPartNumber from product inner join Category on  Product.Category=Category.CategoryId  inner join Manufacturer on Product.Manufacturer=Manufacturer.ManufacturerId where  Product.Category=" + Catid + "  and Category.ParentCategoryId=" + Parid + "";

                        //select  Manufacturer.Name as BrandName,Category.Name as Category, Product.ProductId,Product.Name as ProductName,Product.ManufacturerPartNumber from Manufacturer,product,Category where Product.Category=" + Catid + " and Product.Category=Category.CategoryId and Category.ParentCategoryId=" + Parid + " and Product.Manufacturer=Manufacturer.ManufacturerId";
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
        [ActionName("LoadSubproductCategoryDetails")]
        public string LoadSubproductCategoryDetails(int Catid, int Parid)
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
                        string Query = "select  Manufacturer.Name as Manufacturer,Category.Name, Product.ProductId,Product.PictureName,Product.PictureName1,Product.PictureName2,Product.Name,Product.ShortDescription,Product.Weight,Product.Length,Product.ManufacturerPartNumber,Product.Width,Product.Height,Product.Color  from product inner join Category on  Product.Category=Category.CategoryId  inner join Manufacturer on Product.Manufacturer=Manufacturer.ManufacturerId where  Product.Category=" + Catid + "  and Category.ParentCategoryId=" + Parid + "";
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
        [ActionName("LoadSubproductCategoryExcelDetails")]
        public string LoadSubproductCategoryExcelDetails(int Catid, int Parid, int publishstatus, string SelectedId)
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
                        string Query = "select  " + SelectedId + "  from product inner join Category on  Product.Category=Category.CategoryId  inner join Manufacturer on Product.Manufacturer=Manufacturer.ManufacturerId where  Product.Category=" + Catid + "  and Category.ParentCategoryId=" + Parid + "";
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
        [ActionName("LoadProductColumnnameForExcel")]
        public string LoadProductColumnnameForExcel()
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
                        string Query = "SELECT   'Manufacturer.'+ COLUMN_NAME as ColumnName from INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Manufacturer' and COLUMN_NAME='Name' UNION SELECT  DISTINCT 'Category.'+ COLUMN_NAME as ColumnName FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Category' and COLUMN_NAME='Name' UNION SELECT  DISTINCT 'product.'+ COLUMN_NAME as ColumnName FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='product' and COLUMN_NAME in ('ProductId','PictureName','PictureName1','Name','ShortDescription','Weight','Length','ManufacturerPartNumber','Width','Height','Color') order by ColumnName asc";
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
        [ActionName("LoadColumnnameForExcel")]
        public string LoadColumnnameForExcel()
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
                        string Query = "SELECT COLUMN_NAME as ColumnName FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Category'";
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
       [ActionName("LoadOrderDetailsColumnList")]
        public string LoadOrderDetailsColumnList(string CateId, string SubId, int publishstatus, string SelectedId)
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
                        if ((CateId != "0") && (SubId == "0") && (publishstatus != 1))
                        {
                            Query = "select  " + SelectedId + " from Category where Category.ParentCategoryId=" + CateId + "  and Category.Published=0 ";
                        }
                        if ((CateId != "0") && (SubId != "0") && (publishstatus != 1))
                        {
                            Query = "select  " + SelectedId + " from Category where Category.ParentCategoryId=" + CateId + "  and Category.Published=0  and Category.CategoryId=" + SubId + "";
                        }

                        if ((CateId != "0") && (SubId == "0") && (publishstatus != 0))
                        {
                            Query = "select  " + SelectedId + " from Category where Category.ParentCategoryId=" + CateId + "  and Category.Published=1";
                        }
                        if ((CateId != "0") && (SubId != "0") && (publishstatus != 0))
                        {
                            Query = "select  " + SelectedId + " from Category where Category.ParentCategoryId=" + CateId + "  and Category.Published=1 and Category.CategoryId=" + SubId + "";
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
       [ActionName("LoadAllCategoryDetails")]
        public string LoadAllCategoryDetails(string CateId, string SubId, int publishstatus)
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
                        if ((CateId != "0") && (SubId == "0") && (publishstatus != 1))
                        {
                            Query = "select  * from Category where Category.ParentCategoryId=" + CateId + "  and Category.Published=0 ";
                        }
                        if ((CateId != "0") && (SubId != "0") && (publishstatus != 1))
                        {
                            Query = "select  * from Category where Category.ParentCategoryId=" + CateId + "  and Category.Published=0  and Category.CategoryId=" + SubId + "";
                        }

                        if ((CateId != "0") && (SubId == "0") && (publishstatus != 0))
                        {
                            Query = "select  * from Category where Category.ParentCategoryId=" + CateId + "  and Category.Published=1";
                        }
                        if ((CateId != "0") && (SubId != "0") && (publishstatus != 0))
                        {
                            Query = "select  * from Category where Category.ParentCategoryId=" + CateId + "  and Category.Published=1 and Category.CategoryId=" + SubId + "";
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
       [ActionName("LoaCategoryDetails")]
        public string LoaCategoryDetails(string CateId, string SubId, int publishstatus)
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
                        if ((CateId != "0") && (SubId == "0") && (publishstatus != 1))
                        {
                            Query = "select  Category.CategoryId,Category.ParentCategoryId,Category.Name as SubCategory,CategoryGroupTag,Category.Published from Category where Category.ParentCategoryId=" + CateId + "  and Category.Published=0 ";
                        }
                        if ((CateId != "0") && (SubId != "0") && (publishstatus != 1))
                        {
                            Query = "select  Category.CategoryId,Category.ParentCategoryId,Category.Name as SubCategory,CategoryGroupTag,Category.Published from Category where Category.ParentCategoryId=" + CateId + "  and Category.Published=0  and Category.CategoryId=" + SubId + "";
                        }

                        if ((CateId != "0") && (SubId == "0") && (publishstatus != 0))
                        {
                            Query = "select  Category.CategoryId,Category.ParentCategoryId,Category.Name as SubCategory,CategoryGroupTag,Category.Published from Category where Category.ParentCategoryId=" + CateId + "  and Category.Published=1";
                        }
                        if ((CateId != "0") && (SubId != "0") && (publishstatus != 0))
                        {
                            Query = "select  Category.CategoryId,Category.ParentCategoryId,Category.Name as SubCategory,CategoryGroupTag,Category.Published from Category where Category.ParentCategoryId=" + CateId + "  and Category.Published=1 and Category.CategoryId=" + SubId + "";
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
       [ActionName("LoadCustomer")]
       public string LoadCustomer()
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
                       string Query = "select '7 days'as days, count(User)as users FROM [User]  where CreatedOnUtc > convert(varchar(8), dateadd(day,-7, getdate()), 112) and (IsMerchant='false' or IsMerchant=0) UNION select'15 days'  as days,count(User)as users FROM [User]    where CreatedOnUtc > convert(varchar(8), dateadd(day,-15, getdate()), 112) and (IsMerchant='false' or IsMerchant=0) UNION select '30 days'as days, count(User)as users FROM [User]    where CreatedOnUtc > convert(varchar(8), dateadd(day,-30, getdate()), 112) and (IsMerchant='false' or IsMerchant=0) UNION select 'Today 'as days, count(User)as users FROM [User]    where  CAST(CreatedOnUtc AS DATE) = CAST(GETDATE() AS DATE) and (IsMerchant='false' or IsMerchant=0)";
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
       [ActionName("LoadRetailer")]
       public string LoadRetailer()
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
                       string Query = "select 'Today 'as days, count(User)as retailer FROM [User]    where (IsMerchant='True' or IsMerchant=1) and  CAST(CreatedOnUtc AS DATE) = CAST(GETDATE() AS DATE) UNION select'7 days'  as days,count(User)as retailer FROM [User]    where (IsMerchant='True' or IsMerchant=1) and(CreatedOnUtc > convert(varchar(8), dateadd(day,-7, getdate()), 112)) UNION select '15 days'as days, count(User)as retailer FROM [User]    where (IsMerchant='True' or IsMerchant=1) and(CreatedOnUtc > convert(varchar(8), dateadd(day,-30, getdate()), 112)) ";
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
      
   
   }
    public partial class GetJsonData
    {
        public String GetJson(DataSet ds)
        {
            String strjson = "";
            try
            {
                System.Web.Script.Serialization.JavaScriptSerializer serializer = new

                System.Web.Script.Serialization.JavaScriptSerializer();


                serializer.MaxJsonLength = Int32.MaxValue;


                int xx = 0;
                for (xx = 0; xx < ds.Tables.Count; xx++)
                {
                    DataTable dt = ds.Tables[xx];
                    List<Dictionary<string, object>> rows =
                 new List<Dictionary<string, object>>();
                    Dictionary<string, object> row = null;
                    foreach (DataRow dr in dt.Rows)
                    {
                        row = new Dictionary<string, object>();
                        foreach (DataColumn col in dt.Columns)
                        {
                            row.Add(col.ColumnName.Trim(), dr[col]);
                        }
                        rows.Add(row);
                    }
                    if (xx == ds.Tables.Count - 1) { strjson += serializer.Serialize(rows); }
                    else
                    {
                        strjson += serializer.Serialize(rows) + "NextTable";
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
