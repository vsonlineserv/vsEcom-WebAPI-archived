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
    public class AdminMigratedManufacturerController : ApiController
    {

        IUnitOfWork _unitOfWork = null;

        public AdminMigratedManufacturerController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        private SqlConnection con;
        string DbConName = ConfigurationManager.ConnectionStrings["VBuyContext"].ConnectionString;
        GetJsonData Jsondata = new GetJsonData();

        [HttpGet]
        [ActionName("LoadManuId")]
        public string LoadManuId()
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
                        string Query = "select  ManufacturerId,Name from Manufacturer  order by ManufacturerId asc";
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
        [ActionName("LoadManuProductIdDetails")]
        public string LoadManuProductIdDetails(int Manuid)
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
                        string Query = "select * from Manufacturer where ManufacturerId=" + Manuid + " order by ManufacturerId asc";
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
        [ActionName("LoadManufacturerDetails")]
        public string LoadManufacturerDetails()
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
                        string Query = "select * from Manufacturer  order by ManufacturerId asc";
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
        [ActionName("SaveManufacturertDetails")]
        public string SaveManufacturertDetails(string Name, string Desc, string MeKey, string MeDesc, string MeTi, string Dis)
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
                        string Query = "insert into Manufacturer (Name,Description,MetaKeywords,MetaDescription,MetaTitle,DisplayOrder,CreatedOnUtc) values('" + Name + "','" + Desc + "','" + MeKey + "','" + MeDesc + "','" + MeTi + "','" + Dis + "',getdate())";
                        SqlCommand cmd = new SqlCommand(Query, con);
                        cmd.ExecuteNonQuery();
                        con.Close();

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
        [ActionName("UpdateManufacturertDetails")]
        public string UpdateManufacturertDetails(int Id, string Name, string Desc, string MeKey, string MeDesc, string MeTi, string Dis)
        {

            string conStr = DbConName;
            String strjson = "", tablename = "Manufacturer";
            string[] UpdateValue = { Name, Desc, MeKey, MeDesc, MeTi, Dis };
            string[] columnName = { "Name", "Description", "MetaKeywords", "MetaDescription", "MetaTitle", "DisplayOrder" };
            DataSet ds = new DataSet();


            try
            {

                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {
                        con.Open();
                        string oldQuery = "select * from Manufacturer where ManufacturerId=" + Id + " ";
                        SqlCommand cmd1 = new SqlCommand(oldQuery, con);
                        SqlDataAdapter sda = new SqlDataAdapter(cmd1);
                        sda.Fill(ds);
                        string[] oldValue = { ds.Tables[0].Rows[0]["Name"].ToString(), ds.Tables[0].Rows[0]["Description"].ToString(), ds.Tables[0].Rows[0]["MetaKeywords"].ToString(), ds.Tables[0].Rows[0]["MetaDescription"].ToString(), ds.Tables[0].Rows[0]["MetaTitle"].ToString(), ds.Tables[0].Rows[0]["LimitedToStores"].ToString(), ds.Tables[0].Rows[0]["DisplayOrder"].ToString() };
                        string Query = "update Manufacturer set Manufacturer.Name='" + Name + "',Manufacturer.Description='" + Desc + "',Manufacturer.MetaKeywords='" + MeKey + "',Manufacturer.MetaDescription='" + MeDesc + "',Manufacturer.MetaTitle='" + MeTi + "',Manufacturer.DisplayOrder='" + Dis + "',Manufacturer.UpdatedOnUtc=getdate() where Manufacturer.ManufacturerId=" + Id + "";
                        SqlCommand cmd = new SqlCommand(Query, con);
                        cmd.ExecuteNonQuery();
                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected == 1)
                        {

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


    }
}
