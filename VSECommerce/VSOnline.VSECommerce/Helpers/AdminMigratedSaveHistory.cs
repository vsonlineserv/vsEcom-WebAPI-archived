////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce 
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Security.Claims;

namespace VSOnline.VSECommerce.Web.Controllers
{
    public static class AdminMigratedSaveHistory
    {
        public static string insertData(int modifyId, string NewValue, string oldValue, string tablename, string columnName)
        {            
            string conStr = ConfigurationManager.ConnectionStrings["VBuyContext"].ConnectionString;
            String LoginUser = ClaimsPrincipal.Current.Identity.Name;


            try
            {

                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {
                        con.Open();
                        string Query = "insert into  VbuyHistory (TableName,ColumnName,OldValue,newValue,ModifyValueID,modifiedDate,UserId)values('" + tablename + "','" + columnName + "','" + oldValue + "','" + NewValue + "'," + modifyId + ",getdate(),'" + LoginUser + "') ";
                        SqlCommand cmd = new SqlCommand(Query, con);
                        cmd.ExecuteNonQuery();
                    }

                    finally
                    {
                        con.Close();
                    }
                }


            }
            catch (Exception ex)
            {

            }
            return "0";
        }
    }
}
