////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce 
///////////////////////////////////////////////////////////////////////////////////////////
using log4net;
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Net;
using System.Text;
using System.Web.Http;
using VSOnline.VSECommerce.Core;

namespace VSOnline.VSECommerce.Web.Controllers
{
    public class AndroidController : APIBaseController
    {
        private static readonly ILog logger =
              LogManager.GetLogger(typeof(AndroidController));

        [HttpGet]
        [ActionName("Register")]
        public string Register(string regid)
        {

            if (string.IsNullOrEmpty(regid))
                return "0";
            try
            {
                var message = InsertID(regid);
                return regid;
            }

            catch (Exception ex)
            {
                return "0";

            }
        }

        private static string strcon = ConfigurationManager.ConnectionStrings["VBuyContext"].ToString();
        private static SqlConnection con = null;
        private static SqlCommand cmd = null;
        private static SqlDataAdapter da = null;
        private static DataSet ds = null;
        string Sp_name = null;

        private string InsertID(string regid)
        {
            try
            {
                string query = "insert into [Android_PushNotification] ([RegisterDeviceId], [CreatedDateTimeUtc]) values('" + regid + "', GetUTCDate())";
                con = new SqlConnection(strcon);
                con.Open();
                cmd = new SqlCommand(query, con);
                int a = cmd.ExecuteNonQuery();
                con.Close();
                return a.ToString();
            }
            catch(Exception ex)
            {
                logger.Error("-------------------ERROR LOG -----------------");
                logger.Error(ex.Message + ex.InnerException + "--" + regid);
                logger.Error("-----------------END OF ERROR LOG-----------------");
            }
            return "0";
        }


        [HttpGet]
        [ActionName("SendNotification")]
        public string SendNotification(string NotifyText, string content, string Image, string secCode)
        {
            try
            {            
                     string strSecCode = ConfigurationManager.AppSettings["AndroidPushNotificationSecurityCode"].ToString();
                int count = 0;
                if(string.IsNullOrEmpty(NotifyText) && string.IsNullOrEmpty(content) && string.IsNullOrEmpty(Image))
                {
                    return "Either NotifyText or Content or image is mandatory";
                }
                     if (secCode == strSecCode)
                     {
                         DataSet dsregID = new DataSet();
                         dsregID = GetAndroidRegIds();
                         //StringBuilder message = new StringBuilder();
                         int regId = dsregID.Tables[0].Rows.Count;
                         
                         for (var id = 0; id < regId; id++)
                         {
                             var deviceId = dsregID.Tables[0].Rows[id]["RegisterDeviceId"].ToString();
                             var messageString = PushNotification(deviceId, NotifyText, content, Image);
                             //message.Append(messageString);
                             if(!string.IsNullOrEmpty(messageString))
                             {
                                 count = count + 1;
                             }
                             try
                             {
                                 logger.Info(messageString);
                             }
                             catch
                             {

                             }                           
                         }

                          return "success. No of messages sent " +  count.ToString();
                     }
                // applicationID means google Api key                                                                                                     
                     return "Wrong Security Code";
               
            }
            catch(Exception ex)
            {
                logger.Error("-------------------ERROR LOG -----------------");
                logger.Error(ex.Message + ex.InnerException + "--" + NotifyText);
                logger.Error("-----------------END OF ERROR LOG-----------------");

                return "false";
            }


        }
        
        
        private string PushNotification(string deviceId, string NotifyText, string content, string Image)
        {
            try
            {
                var applicationID = "YourApplicationId";
                // SENDER_ID is nothing but your ProjectID (from API Console- google code)//                                          
                var SENDER_ID = "YourSenderId";

                WebRequest tRequest;

                tRequest = WebRequest.Create("https://android.googleapis.com/gcm/send");

                tRequest.Method = "post";

                tRequest.ContentType = "application/x-www-form-urlencoded;charset=UTF-8";


                tRequest.Headers.Add(string.Format("Authorization: key={0}", applicationID));
                tRequest.Headers.Add(string.Format("Sender: id={0}", SENDER_ID));


                string postData =
               "collapse_key=score_update&time_to_live=108&delay_while_idle=1&data.message="
                + content + "&data.time=" + System.DateTime.Now.ToString() + "&registration_id=" + deviceId + "&data.title=" + NotifyText + "&data.url=" + Image + "";



                Byte[] byteArray = Encoding.UTF8.GetBytes(postData);

                tRequest.ContentLength = byteArray.Length;

                Stream dataStream = tRequest.GetRequestStream();

                dataStream.Write(byteArray, 0, byteArray.Length);

                dataStream.Close();

                WebResponse tResponse = tRequest.GetResponse();

                dataStream = tResponse.GetResponseStream();

                StreamReader tReader = new StreamReader(dataStream);

                String sResponseFromServer = tReader.ReadToEnd();   //Get response from GCM server.

                var message = sResponseFromServer;
                //Assigning GCM response to Label text          
                tReader.Close();

                dataStream.Close();
                tResponse.Close();
                return message;
            }
            catch
            {
                return "fails";
            }
        }


        private DataSet GetAndroidRegIds()
        {
            string query = "select DISTINCT RegisterDeviceId from [Android_PushNotification]";
            con = new SqlConnection(strcon);
            cmd = new SqlCommand(query, con);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds);
            return ds;
        }
  
    }
}