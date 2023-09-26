////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce 
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using VSOnline.VSECommerce.Domain;
using VSOnline.VSECommerce.Domain.DTO;
using System.Web.Http;
using VSOnline.VSECommerce.Persistence.Entity;
using System.Text;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using System.Web.Security;
using System.Net.Mail;


namespace VSOnline.VSECommerce.Web.Controllers
{
    [Authorize(Roles = "Administrators")]
    public class AdminMigratedController : ApiController
    {
        IUnitOfWork _unitOfWork = null;

        public AdminMigratedController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        private SqlConnection con;
        string DbConName = ConfigurationManager.ConnectionStrings["VBuyContext"].ConnectionString;
        GetJsonData Jsondata = new GetJsonData();

        [HttpGet]
        [ActionName("searchUser")]
        public string searchUser(string userName, string email, string RegisDetails, string RegisUserFromDate, string RegisUserToDate)
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
                        if ((userName != null) && (email == null) && (RegisDetails == "ALL") && (RegisUserFromDate == null) && (RegisUserToDate == null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where Username like '%" + userName + "%' and (Deleted is null or Deleted =0) ";
                        }
                        if ((userName == null) && (email != null) && (RegisDetails == "ALL") && (RegisUserFromDate == null) && (RegisUserToDate == null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where Email like '%" + email + "%' and (Deleted is null or Deleted =0) ";
                        }
                        if ((userName == null) && (email == null) && (RegisDetails == "ALL") && (RegisUserFromDate == null) && (RegisUserToDate == null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where (Deleted is null or Deleted =0) ";
                        }
                        if ((userName == null) && (email == null) && (RegisDetails != "ALL") && (RegisUserFromDate == null) && (RegisUserToDate == null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where IsMerchant='" + RegisDetails + "' and (Deleted is null or Deleted =0) ";
                        }
                        if ((userName == null) && (email == null) && (RegisDetails == "ALL") && (RegisUserFromDate != null) && (RegisUserToDate != null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where [User].[CreatedOnUtc] >= '" + RegisUserFromDate + "' and [User].[CreatedOnUtc] <='" + RegisUserToDate + " 23:59:59.999' and  (Deleted is null or Deleted =0)";
                        }
                        if ((userName != null) && (email != null) && (RegisDetails == "ALL") && (RegisUserFromDate == null) && (RegisUserToDate == null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where Username like '%" + userName + "%' and Email like '%" + email + "%' and  (Deleted is null or Deleted =0)";
                        }
                        if ((userName != null) && (email == null) && (RegisDetails == "ALL") && (RegisUserFromDate == null) && (RegisUserToDate == null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where Username like '%" + userName + "%'  and  (Deleted is null or Deleted =0)";
                        }
                        if ((userName != null) && (email == null) && (RegisDetails != "ALL") && (RegisUserFromDate == null) && (RegisUserToDate == null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where Username like '%" + userName + "%' and  IsMerchant='" + RegisDetails + "' and  (Deleted is null or Deleted =0)";
                        }
                        if ((userName != null) && (email == null) && (RegisDetails == "ALL") && (RegisUserFromDate != null) && (RegisUserToDate != null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where Username like '%" + userName + "%' and  [User].[CreatedOnUtc] >= '" + RegisUserFromDate + "' and [User].[CreatedOnUtc] <='" + RegisUserToDate + " 23:59:59.999' and  (Deleted is null or Deleted =0)";
                        }
                        if ((userName == null) && (email != null) && (RegisDetails == "ALL") && (RegisUserFromDate == null) && (RegisUserToDate == null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where Email like '%" + email + "%' and  (Deleted is null or Deleted =0)";
                        }
                        if ((userName == null) && (email != null) && (RegisDetails != "ALL") && (RegisUserFromDate == null) && (RegisUserToDate == null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where Email like '%" + email + "%' and  IsMerchant='" + RegisDetails + "' and  (Deleted is null or Deleted =0)";
                        }
                        if ((userName == null) && (email != null) && (RegisDetails == "ALL") && (RegisUserFromDate != null) && (RegisUserToDate != null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where Email like '%" + email + "%' and  [User].[CreatedOnUtc] >= '" + RegisUserFromDate + "' and [User].[CreatedOnUtc] <='" + RegisUserToDate + " 23:59:59.999' and  (Deleted is null or Deleted =0)";
                        }
                        if ((userName == null) && (email == null) && (RegisDetails == "ALL") && (RegisUserFromDate != null) && (RegisUserToDate != null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where  [User].[CreatedOnUtc] >= '" + RegisUserFromDate + "' and [User].[CreatedOnUtc] <='" + RegisUserToDate + " 23:59:59.999' and  (Deleted is null or Deleted =0)";
                        }
                        if ((userName == null) && (email == null) && (RegisDetails != "ALL") && (RegisUserFromDate != null) && (RegisUserToDate != null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where IsMerchant='" + RegisDetails + "' and [User].[CreatedOnUtc] >= '" + RegisUserFromDate + "' and [User].[CreatedOnUtc] <='" + RegisUserToDate + " 23:59:59.999' and  (Deleted is null or Deleted =0)";
                        }
                        if ((userName != null) && (email == null) && (RegisDetails == "ALL") && (RegisUserFromDate != null) && (RegisUserToDate != null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where Username like '%" + userName + "%' and [User].[CreatedOnUtc] >= '" + RegisUserFromDate + "' and [User].[CreatedOnUtc] <='" + RegisUserToDate + " 23:59:59.999' and  (Deleted is null or Deleted =0)";
                        }
                        if ((userName != null) && (email != null) && (RegisDetails == "ALL") && (RegisUserFromDate == null) && (RegisUserToDate == null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where Username like '%" + userName + "%'  and Email like '%" + email + "%' and (Deleted is null or Deleted =0)";
                        }
                        if ((userName != null) && (email != null) && (RegisDetails != "ALL") && (RegisUserFromDate == null) && (RegisUserToDate == null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where Username like '%" + userName + "%'  and Email like '%" + email + "%' and IsMerchant='" + RegisDetails + "' and (Deleted is null or Deleted =0)";
                        }
                        if ((userName == null) && (email != null) && (RegisDetails != "ALL") && (RegisUserFromDate != null) && (RegisUserToDate != null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where [User].[CreatedOnUtc] >= '" + RegisUserFromDate + "' and [User].[CreatedOnUtc] <='" + RegisUserToDate + " 23:59:59.999'  and Email like '%" + email + "%' and IsMerchant='" + RegisDetails + "' and (Deleted is null or Deleted =0)";
                        }
                        if ((userName == null) && (email != null) && (RegisDetails == "ALL") && (RegisUserFromDate != null) && (RegisUserToDate != null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where [User].[CreatedOnUtc] >= '" + RegisUserFromDate + "' and [User].[CreatedOnUtc] <='" + RegisUserToDate + " 23:59:59.999'  and Email like '%" + email + "%' and (Deleted is null or Deleted =0)";
                        }
                        if ((userName != null) && (email == null) && (RegisDetails == "ALL") && (RegisUserFromDate != null) && (RegisUserToDate != null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where [User].[CreatedOnUtc] >= '" + RegisUserFromDate + "' and [User].[CreatedOnUtc] <='" + RegisUserToDate + " 23:59:59.999'  and Username like '%" + userName + "%' and (Deleted is null or Deleted =0)";
                        }
                        if ((userName != null) && (email == null) && (RegisDetails != "ALL") && (RegisUserFromDate != null) && (RegisUserToDate != null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where  IsMerchant='" + RegisDetails + "' and  [User].[CreatedOnUtc] >= '" + RegisUserFromDate + "' and [User].[CreatedOnUtc] <='" + RegisUserToDate + " 23:59:59.999'  and Username like '%" + userName + "%' and (Deleted is null or Deleted =0)";
                        }
                        if ((userName != null) && (email != null) && (RegisDetails != "ALL") && (RegisUserFromDate != null) && (RegisUserToDate != null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where Email like '%" + email + "%' and IsMerchant='" + RegisDetails + "' and  [User].[CreatedOnUtc] >= '" + RegisUserFromDate + "' and [User].[CreatedOnUtc] <='" + RegisUserToDate + " 23:59:59.999'  and Username like '%" + userName + "%' and (Deleted is null or Deleted =0)";
                        }
                        if ((userName != null) && (email != null) && (RegisDetails == "ALL") && (RegisUserFromDate != null) && (RegisUserToDate != null))
                        {
                            Query = "select UserId,Username,FirstName,LastName,Email,PhoneNumber1,PhoneNumber2,IsMerchant,Active,Deleted  from [User] where Email like '%" + email + "%' and  [User].[CreatedOnUtc] >= '" + RegisUserFromDate + "' and [User].[CreatedOnUtc] <='" + RegisUserToDate + " 23:59:59.999'  and Username like '%" + userName + "%' and (Deleted is null or Deleted =0)";
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
        [ActionName("SearchFromToDateUserDetails")]
        public string SearchFromToDateUserDetails(string RegisUserFromDate, string RegisUserToDate)
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
                        Query = "select  * from [User] where  [User].[CreatedOnUtc] >= '" + RegisUserFromDate + "' and [User].[CreatedOnUtc] <='" + RegisUserToDate + " 23:59:59.999'";
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
        [ActionName("ModifyUserName")]
        public string ModifyUserName(int UserId, string userName, string FirstName, string LastName, string Email, string PhoneNumber1, string PhoneNumber2)
        {


            string conStr = DbConName;
            String strjson = "", Query = "", tablename = "";
            string[] newValue = { userName, FirstName, LastName, Email, PhoneNumber1, PhoneNumber2 };
            DataSet ds = new DataSet();
            try
            {

                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {
                        con.Open();
                        SqlCommand cmd1 = new SqlCommand("select * from [User] where UserId=" + UserId + " ", con);
                        SqlDataAdapter sda = new SqlDataAdapter(cmd1);
                        sda.Fill(ds);
                        string[] oldValue = { ds.Tables[0].Rows[0]["Username"].ToString(), ds.Tables[0].Rows[0]["FirstName"].ToString(), ds.Tables[0].Rows[0]["LastName"].ToString(), ds.Tables[0].Rows[0]["Email"].ToString(), ds.Tables[0].Rows[0]["PhoneNumber1"].ToString(), ds.Tables[0].Rows[0]["PhoneNumber2"].ToString() };
                        tablename = "[User]";
                        string[] columnName = { "Username", "FirstName", "LastName", "Email", "PhoneNumber1", "PhoneNumber2" };
                        Query = "update [User] set Username='" + userName + "',FirstName='" + FirstName + "',LastName='" + LastName + "',Email='" + Email + "',PhoneNumber1='" + PhoneNumber1 + "',PhoneNumber2='" + PhoneNumber2 + "' where UserId=" + UserId + "";
                        SqlCommand cmd = new SqlCommand(Query, con);
                        cmd.ExecuteNonQuery();
                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected == 1)
                        {
                            for (var Update = 0; Update <= newValue.Length - 1; Update++)
                            {
                                AdminMigratedSaveHistory.insertData(UserId, newValue[Update], oldValue[Update], tablename, columnName[Update]);
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
        [ActionName("ModifyUserIsDeleted")]
        public string ModifyUserIsDeleted(string isDeleted, int userid)
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
                        SqlCommand cmd1 = new SqlCommand("select Deleted from [User] where UserId=" + userid + " ", con);
                        SqlDataAdapter sda = new SqlDataAdapter(cmd1);
                        sda.Fill(ds);
                        Query = "update [User] set Deleted='" + isDeleted + "'  where UserId=" + userid + "";
                        SqlCommand cmd = new SqlCommand(Query, con);
                        cmd.ExecuteNonQuery();
                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected == 1)
                        {
                            AdminMigratedSaveHistory.insertData(userid, isDeleted, ds.Tables[0].Rows[0]["Deleted"].ToString(), "[User]", "Deleted");
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


        ///Assign Category to Seller
        ///
        [HttpGet]
        [ActionName("LoadAssignSellerCategory")]
        public string LoadAssignSellerCategory(int Id)
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
                        string Query = "select Sc.seller,C.Name  from   SellerCategory Sc inner join Category C on Sc.Category=C.CategoryId where Sc.seller=" + Id + " and  (FlagDeleted=0 or FlagDeleted='false')";
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
        [ActionName("LoadSellerCategory")]
        public string LoadSellerCategory(string BranchId, string BranchName)
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

                        if (!string.IsNullOrEmpty(BranchId) && string.IsNullOrEmpty(BranchName))
                        {
                            Query = "select BranchId, BranchName from SellerBranch where BranchId=" + BranchId + "";
                        }
                        if (string.IsNullOrEmpty(BranchId) && !string.IsNullOrEmpty(BranchName))
                        {
                            Query = "select BranchId, BranchName from SellerBranch   where (BranchName like '%" + BranchName + "%')";
                        }
                        if (!string.IsNullOrEmpty(BranchId) && !string.IsNullOrEmpty(BranchName))
                        {
                            Query = "select BranchId, BranchName from SellerBranch where BranchId=" + BranchId + " and BranchName='" + BranchName + "'";
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
        [ActionName("LoadAssCategory")]
        public string LoadAssCategory(int id)
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
                        string Query = "select C.CategoryId,C.Name from  Category C inner join SellerCategory Sc on Sc.Category=C.CategoryId where Sc.seller=" + id + "";
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
        [ActionName("UpdateAssignCategory")]
        public string UpdateAssignCategory(int seller, string Branch)
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
                        var categoryList = Branch.ToString().Split(',');
                        for (var catList = 0; catList < categoryList.Length - 1; catList++)
                        {
                            string Query = "update  SellerCategory set FlagDeleted=1  where SellerCategory.seller=" + seller + " and SellerCategory.Category=" + categoryList[catList] + "";
                            SqlCommand cmd1 = new SqlCommand(Query, con);
                            cmd1.ExecuteNonQuery();
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
        [ActionName("AssignCategory")]
        public string AssignCategory(int seller, string category)
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
                        var categoryList = category.ToString().Split(',');
                        for (var catList = 0; catList < categoryList.Length - 1; catList++)
                        {
                            string Query = "if exists(select * from SellerCategory where SellerCategory.seller=" + seller + " and SellerCategory.Category=" + categoryList[catList] + ") update  SellerCategory set FlagDeleted=0  where SellerCategory.seller=" + seller + " and SellerCategory.Category=" + categoryList[catList] + " if not exists(select * from SellerCategory where SellerCategory.seller=" + seller + " and SellerCategory.Category=" + categoryList[catList] + ") insert into SellerCategory (seller,Category,FlagDeleted) values(" + seller + "," + categoryList[catList] + ",0) ";
                            SqlCommand cmd1 = new SqlCommand(Query, con);
                            cmd1.ExecuteNonQuery();
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
        [ActionName("LoadAppSelectedCategory")]
        public string LoadAppSelectedCategory(int selected)
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
                        string Query = "select  C.CategoryId,C.Name  from Category C where C.CategoryId=" + selected + "";
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
        [ActionName("LoadSelectedCategory")]
        public string LoadSelectedCategory(int selected)
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
                        string Query = "select  C.CategoryId,C.Name  from Category C where C.CategoryId=" + selected + "";
                        SqlCommand cmd1 = new SqlCommand(Query, con);
                        SqlDataAdapter sda = new SqlDataAdapter(cmd1);
                        DataSet ds1 = new DataSet();
                        sda.Fill(ds1);
                        strjson = Jsondata.GetJson(ds1);
                    }

                    finally { con.Close(); }
                }

            }
            catch (Exception Ex)
            {

            }

            return strjson;
        }
        [HttpGet]
        [ActionName("LoadSubCategory")]
        public string LoadSubCategory(int CateId, int seller)
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
                        string Query = "select  CategoryId,Name from Category where ParentCategoryId =" + CateId + " and CategoryId not in (select SellerCategory.Category from SellerCategory where SellerCategory.seller=" + seller + "  and (FlagDeleted=0 or FlagDeleted='false'))";
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
        [ActionName("LoadsubAssigncat")]
        public string LoadsubAssigncat(int CateId, int seller)
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
                        string Query = "select  Sc.Category as Id,C.Name from SellerCategory Sc inner join Category C on sc.Category=C.CategoryId where sc.seller=" + seller + " and  C.ParentCategoryId= " + CateId + " and (FlagDeleted=0 or FlagDeleted='false')";
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



        ///Discount 
        [HttpGet]
        [ActionName("SaveDiscountDetails")]
        public string SaveDiscountDetails(string Name, int DiscountType, int UsePercentage, decimal DiscountPercentage, decimal DiscountAmount, string StartDate, string EndDate, string CouponCode, string RequiresCouponCode, decimal MinOrderValue, decimal MaxDiscountAmount)
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
                        if (!string.IsNullOrEmpty(StartDate) && !string.IsNullOrEmpty(EndDate))
                        {
                            Query = "insert into Discount (Name,DiscountTypeId,UsePercentage,DiscountPercentage,DiscountAmount,StartDateUtc,EndDateUtc,RequiresCouponCode,CouponCode,MinOrderValue,[MaxDiscountAmount]) values('" + Name + "'," + DiscountType + "," + UsePercentage + "," + DiscountPercentage + "," + DiscountAmount + ",'" + StartDate + "','" + EndDate + "'," + RequiresCouponCode + ",'" + CouponCode + "'," + MinOrderValue + "," + MaxDiscountAmount + ") select * from Discount order by Id asc ";

                        }
                        else if (!string.IsNullOrEmpty(StartDate) && string.IsNullOrEmpty(EndDate))
                        {
                            Query = "insert into Discount (Name,DiscountTypeId,UsePercentage,DiscountPercentage,DiscountAmount,StartDateUtc,EndDateUtc,RequiresCouponCode,CouponCode,MinOrderValue,[MaxDiscountAmount]) values('" + Name + "'," + DiscountType + "," + UsePercentage + "," + DiscountPercentage + "," + DiscountAmount + ",'" + StartDate + "',null," + RequiresCouponCode + ",'" + CouponCode + "'," + MinOrderValue + "," + MaxDiscountAmount + ") select * from Discount order by Id asc ";

                        }
                        else if (string.IsNullOrEmpty(StartDate) && !string.IsNullOrEmpty(EndDate))
                        {
                            Query = "insert into Discount (Name,DiscountTypeId,UsePercentage,DiscountPercentage,DiscountAmount,StartDateUtc,EndDateUtc,RequiresCouponCode,CouponCode,MinOrderValue,[MaxDiscountAmount]) values('" + Name + "'," + DiscountType + "," + UsePercentage + "," + DiscountPercentage + "," + DiscountAmount + ",null,'" + EndDate + "'," + RequiresCouponCode + ",'" + CouponCode + "'," + MinOrderValue + "," + MaxDiscountAmount + ") select * from Discount order by Id asc ";

                        }

                        else if (string.IsNullOrEmpty(StartDate) && string.IsNullOrEmpty(EndDate))
                        {
                            Query = "insert into Discount (Name,DiscountTypeId,UsePercentage,DiscountPercentage,DiscountAmount,StartDateUtc,EndDateUtc,RequiresCouponCode,CouponCode,MinOrderValue,[MaxDiscountAmount]) values('" + Name + "'," + DiscountType + "," + UsePercentage + "," + DiscountPercentage + "," + DiscountAmount + ",null,null," + RequiresCouponCode + ",'" + CouponCode + "'," + MinOrderValue + "," + MaxDiscountAmount + ") select * from Discount order by Id asc ";

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
        [ActionName("UpdateDiscountDetails")]
        public string UpdateDiscountDetails(int Id, string Name, string DiscountType, string UsePercentage, string DiscountPercentage, string DiscountAmount, string StartDate, string EndDate, string CouponCode, string RequiresCouponCode, string MinOrderValue, string MaxDiscountAmount)
        {
            string conStr = DbConName;
            String strjson = "", Query = "", tablename = "Discount";
            string[] UpdateValue = { Name, DiscountType, UsePercentage, DiscountPercentage, DiscountAmount, StartDate, EndDate, CouponCode, RequiresCouponCode, MinOrderValue, MaxDiscountAmount };
            string[] columnName = { "Name", "DiscountTypeId", "UsePercentage", "DiscountPercentage", "DiscountAmount", "StartDateUtc", "EndDateUtc", "RequiresCouponCode", "CouponCode", "MinOrderValue", "MaxDiscountAmount" };
            DataSet ds = new DataSet();


            try
            {

                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {
                        con.Open();
                        if (!string.IsNullOrEmpty(StartDate) && !string.IsNullOrEmpty(EndDate))
                        {
                            Query = "update  Discount set Name='" + Name + "',DiscountTypeId=" + DiscountType + ",UsePercentage=" + UsePercentage + ",DiscountPercentage=" + DiscountPercentage + ",DiscountAmount=" + DiscountAmount + ",StartDateUtc='" + StartDate + "',EndDateUtc='" + EndDate + "',RequiresCouponCode= " + RequiresCouponCode + ",CouponCode='" + CouponCode + "',MinOrderValue= " + MinOrderValue + ",MaxDiscountAmount=" + MaxDiscountAmount + " where Id=" + Id + " select * from Discount order by Id asc";

                        }
                        else if (!string.IsNullOrEmpty(StartDate) && string.IsNullOrEmpty(EndDate))
                        {
                            Query = "update  Discount set Name='" + Name + "',DiscountTypeId=" + DiscountType + ",UsePercentage=" + UsePercentage + ",DiscountPercentage=" + DiscountPercentage + ",DiscountAmount=" + DiscountAmount + ",StartDateUtc='" + StartDate + "',EndDateUtc=null,RequiresCouponCode= " + RequiresCouponCode + ",CouponCode='" + CouponCode + "',MinOrderValue= " + MinOrderValue + ",MaxDiscountAmount=" + MaxDiscountAmount + " where Id=" + Id + " select * from Discount order by Id asc";

                        }
                        else if (string.IsNullOrEmpty(StartDate) && !string.IsNullOrEmpty(EndDate))
                        {
                            Query = "update  Discount set Name='" + Name + "',DiscountTypeId=" + DiscountType + ",UsePercentage=" + UsePercentage + ",DiscountPercentage=" + DiscountPercentage + ",DiscountAmount=" + DiscountAmount + ",StartDateUtc=null,EndDateUtc='" + EndDate + "',RequiresCouponCode= " + RequiresCouponCode + ",CouponCode='" + CouponCode + "',MinOrderValue= " + MinOrderValue + ",MaxDiscountAmount=" + MaxDiscountAmount + " where Id=" + Id + " select * from Discount order by Id asc";

                        }
                        else if (string.IsNullOrEmpty(StartDate) && string.IsNullOrEmpty(EndDate))
                        {
                            Query = "update  Discount set Name='" + Name + "',DiscountTypeId=" + DiscountType + ",UsePercentage=" + UsePercentage + ",DiscountPercentage=" + DiscountPercentage + ",DiscountAmount=" + DiscountAmount + ",StartDateUtc=null,EndDateUtc=null,RequiresCouponCode= " + RequiresCouponCode + ",CouponCode='" + CouponCode + "',MinOrderValue= " + MinOrderValue + ",MaxDiscountAmount=" + MaxDiscountAmount + " where Id=" + Id + " select * from Discount order by Id asc";
                        }
                        SqlCommand cmd = new SqlCommand(Query, con);
                        cmd.ExecuteNonQuery();
                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected == 1)
                        {
                            string oldQuery = "select * from Discount where Id=" + Id + " ";
                            SqlCommand cmd1 = new SqlCommand(oldQuery, con);
                            SqlDataAdapter sda = new SqlDataAdapter(cmd1);
                            sda.Fill(ds);
                            string[] oldValue = { ds.Tables[0].Rows[0]["Name"].ToString(), ds.Tables[0].Rows[0]["DiscountTypeId"].ToString(), ds.Tables[0].Rows[0]["UsePercentage"].ToString(), ds.Tables[0].Rows[0]["DiscountPercentage"].ToString(), ds.Tables[0].Rows[0]["DiscountAmount"].ToString(), ds.Tables[0].Rows[0]["StartDateUtc"].ToString(), ds.Tables[0].Rows[0]["EndDateUtc"].ToString(), ds.Tables[0].Rows[0]["RequiresCouponCode"].ToString(), ds.Tables[0].Rows[0]["CouponCode"].ToString(), ds.Tables[0].Rows[0]["MinOrderValue"].ToString(), ds.Tables[0].Rows[0]["MaxDiscountAmount"].ToString() };

                            for (var Update = 0; Update <= UpdateValue.Length - 1; Update++)
                            {
                                AdminMigratedSaveHistory.insertData(Id, UpdateValue[Update], oldValue[Update], tablename, columnName[Update]);
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

        [HttpGet]
        [ActionName("LoadDiscountDetails")]
        public string LoadDiscountDetails()
        {

            string conStr = DbConName;
            String strjson = "";




            using (SqlConnection con = new SqlConnection(conStr))
            {
                try
                {
                    con.Open();
                    string Query = "select * from Discount order by Discount.Id asc ";
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
            return strjson;
        }
        [HttpGet]
        [ActionName("LoadNameBasedDiscountDetails")]
        public string LoadNameBasedDiscountDetails(string Name)
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
                        string Query = "select * from Discount where  Discount.Name  like '%" + Name + "%' order by Discount.Id asc ";
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
        [ActionName("LoadCodeBasedDiscountDetails")]
        public string LoadCodeBasedDiscountDetails(int CoCode)
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
                        string Query = "select * from Discount where Discount.CouponCode=" + CoCode + " order by Discount.Id asc ";
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
        [ActionName("LoadNameCodeBasedDiscountDetails")]
        public string LoadNameCodeBasedDiscountDetails(string Name, int CoCode)
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
                        string Query = "select * from Discount where Discount.Name like '%" + Name + "%' and Discount.CouponCode=" + CoCode + " order by Discount.Id asc ";
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

        ///Add New Store
        ///
        UserService userService = new UserService();
        private void AddSeller(RetailerUserDTO retailerUserDTO, int userid)
        {
            try
            {

                string conStr = DbConName;
                //Add user as Seller.               
                Seller newSeller = new Seller();
                newSeller.StoreName = retailerUserDTO.BusinessName;
                newSeller.PrimaryContact = userid;
                newSeller.CreatedOnUtc = DateTime.UtcNow;
                newSeller.CreatedUser = userid;


                IUnitOfWork _unitOfWork = new EfUnitOfWork();
                _unitOfWork.SellerRepository.Add(newSeller);

                SellerBranch branch = new SellerBranch();
                branch.Store = newSeller.StoreId;
                branch.Address1 = retailerUserDTO.Address1;
                branch.Address2 = retailerUserDTO.Address2;
                branch.BranchName = retailerUserDTO.BusinessName;
                branch.Email = retailerUserDTO.Email;
                branch.Country = retailerUserDTO.Country;
                branch.State = retailerUserDTO.State;
                branch.City = retailerUserDTO.City;
                branch.PostalCode = retailerUserDTO.Pincode;
                branch.PhoneNumber = retailerUserDTO.PhoneNumber1;
                branch.Latitude = retailerUserDTO.Latitude;
                branch.Longitude = retailerUserDTO.Longitude;

                branch.CreatedOnUtc = DateTime.UtcNow;
                newSeller.Branches.Add(branch);
                _unitOfWork.SellerRepository.Add(newSeller);
                _unitOfWork.Commit();

            }





            catch (Exception ex)
            {

            }
        }

        [HttpGet]
        [ActionName("RegisRetailer")]
        public string RegisRetailer(string Name, string Mailid, string PhnNum, string lastName, string BuName, string Add1, string Add2, string City, string pincode, string State, int Country, Decimal Lati, Decimal Long)
        {

            string conStr = DbConName;
            String strjson = "", Query = "";
            string password = Membership.GeneratePassword(12, 1);
            DataSet ds = new DataSet();

            UserService userService = new UserService();
            RetailerUserDTO retailerUserDTO = new RetailerUserDTO();
            Seller newSeller = new Seller();

            UserModel userModel = new UserModel();


            retailerUserDTO.Email = Mailid;
            retailerUserDTO.FirstName = Name;
            retailerUserDTO.PhoneNumber1 = PhnNum;
            retailerUserDTO.Password = password;
            retailerUserDTO.ConfirmPassword = password;
            retailerUserDTO.LastName = lastName;
            retailerUserDTO.BusinessName = BuName;
            retailerUserDTO.Address1 = Add1;
            retailerUserDTO.Address2 = Add2;
            retailerUserDTO.City = City;
            retailerUserDTO.Pincode = pincode;
            retailerUserDTO.State = State;
            retailerUserDTO.Country = Country;
            retailerUserDTO.Latitude = Lati;
            retailerUserDTO.Longitude = Long;

            bool ValidateUserResult = userService.AddUser(retailerUserDTO);

            if (ValidateUserResult)
            {
                var user = userService.GetUser(retailerUserDTO.Email);
                AddSeller(retailerUserDTO, user.UserId);
            }

            if (Convert.ToBoolean(ConfigurationManager.AppSettings["AddUserEnableMail"]) == true)
            {
                try
                {
                    using (SqlConnection con = new SqlConnection(conStr))

                        try
                        {
                            if (ValidateUserResult)
                            {

                                string filename = System.Web.HttpContext.Current.Server.MapPath(@"~/" + @"EmailTemplates/GeneratePasswordRetailer.html");
                                string mailbody = System.IO.File.ReadAllText(filename);
                                mailbody = mailbody.Replace("$$UserName$$", retailerUserDTO.FirstName);
                                mailbody = mailbody.Replace("$$UserId$$", retailerUserDTO.Email);
                                mailbody = mailbody.Replace("$$Password$$", password);
                                string to = retailerUserDTO.Email;
                                string from = "info@vbuy.in";
                                using (MailMessage message = new MailMessage(from, to))
                                {
                                    message.Subject = "Password alert from Vbuy.in";
                                    message.Body = mailbody;
                                    message.BodyEncoding = Encoding.UTF8;
                                    message.IsBodyHtml = true;
                                    SmtpClient smtp = new SmtpClient();
                                    smtp.Host = "smtp.mandrillapp.com";
                                    smtp.EnableSsl = true;
                                    System.Net.NetworkCredential networkCredential = new System.Net.NetworkCredential("siva@vbuy.in", "XUHn_8GZFEv4uMYOvcMuXQ");

                                    smtp.Credentials = networkCredential;
                                    smtp.Port = 587;
                                    try
                                    {
                                        smtp.Send(message);

                                        if (ValidateUserResult)
                                        {
                                            strjson = "1";
                                        }
                                    }
                                    catch (Exception ex)
                                    {
                                        strjson = "0";
                                        //  throw new Exception(ex.Message);
                                    }

                                }
                            }
                            else
                            {
                                strjson = "0";

                            }
                        }
                        finally
                        {
                            con.Close();
                        }
                }
                catch (Exception Ex)
                {
                    throw new Exception(Ex.Message);
                }

            }
            else
            {
                if(ValidateUserResult)
                {
                    strjson = "1";
                }
                else
                {
                    strjson = "0";
                }
                
            }



            return strjson;

        }




    }
}
