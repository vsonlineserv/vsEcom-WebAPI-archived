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
using VSOnline.VSECommerce.Domain.Helper;
using System.Net;
using System.Web.Script.Serialization;

namespace VSOnline.VSECommerce.Web.Controllers
{
     [Authorize(Roles = "Administrators")]
    public class AdminMigratedSellerController : ApiController
    {
         IUnitOfWork _unitOfWork = null;

         public AdminMigratedSellerController(IUnitOfWork unitOfWork)
          {
              _unitOfWork = unitOfWork;
          }

        private SqlConnection con;
        string DbConName = ConfigurationManager.ConnectionStrings["VBuyContext"].ConnectionString;
        GetJsonData Jsondata = new GetJsonData();

        [HttpGet]
        [ActionName("LoadSalesFromToDate")]
        public string LoadSalesFromToDate(string SalesFrDate, string SalesTDate, string reply, int day)
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
                        if (!string.IsNullOrEmpty(SalesFrDate) && !string.IsNullOrEmpty(SalesTDate) &&  (reply == "true") && (day == 0))
                        {
                            Query = @"
WITH cte AS
 (
 select pc.ProductId, p.Name,pc.Id,ContactName,pc.Mobile,pc.Email,pc.StoreId,pc.UpdatedOnUtc,pc.Subject,pc.Reply,pc.ReplyDate from Product p INNER JOIN ProductContact pc on p.ProductId=pc.ProductId
  ), cte2 AS
 (
 select pc.StoreId, s.StoreName,pc.ProductId,pc.Id from Seller s inner join ProductContact pc on s.StoreId =pc.StoreId
  ),
  cte3 AS
  (
  select c1.Id,
  c1.ContactName,
  c1.Mobile,
  c1.Email,
  c1.ProductId,
  c1.Name,
  c2.StoreId,
  c2.StoreName,
   c1.UpdatedOnUtc,
   c1.Subject,
   c1.Reply,
   c1.ReplyDate  from cte c1 inner join cte2 c2 on c1.Id=c2.Id
  )
    select * FROM cte3 where  UpdatedOnUtc >= '" + SalesFrDate + "' and UpdatedOnUtc <='" + SalesTDate + " 23:59:59.999' and Reply is null and ReplyDate is null order by UpdatedOnUtc desc  ";

                        }
                        if (!string.IsNullOrEmpty(SalesFrDate) && !string.IsNullOrEmpty(SalesTDate) && (reply == "false") && (day == 0))
                        {
                            Query = @"
                            
                          WITH cte AS
                         (
 select pc.ProductId, p.Name,pc.Id,ContactName,pc.Mobile,pc.Email,pc.StoreId,pc.UpdatedOnUtc,pc.Subject,pc.Reply,pc.ReplyDate from Product p INNER JOIN ProductContact pc on p.ProductId=pc.ProductId
  ), cte2 AS
 (
 select pc.StoreId, s.StoreName,pc.ProductId,pc.Id from Seller s inner join ProductContact pc on s.StoreId =pc.StoreId
  ),
  cte3 AS
  (
  select c1.Id,
  c1.ContactName,
  c1.Mobile,
  c1.Email,
  c1.ProductId,
  c1.Name,
  c2.StoreId,
  c2.StoreName,
   c1.UpdatedOnUtc,
   c1.Subject,
   c1.Reply,
   c1.ReplyDate  from cte c1 inner join cte2 c2 on c1.Id=c2.Id
  )
    select * FROM cte3 where  UpdatedOnUtc >= '" + SalesFrDate + "' and UpdatedOnUtc <='" + SalesTDate + " 23:59:59.999' and ReplyDate!='' order by UpdatedOnUtc desc";
                        }
                        if (string.IsNullOrEmpty(SalesFrDate) && string.IsNullOrEmpty(SalesTDate) && (reply == "true") && (day != 0))
                        {
                            Query = @"
WITH cte AS
 (
 select pc.ProductId, p.Name,pc.Id,ContactName,pc.Mobile,pc.Email,pc.StoreId,pc.UpdatedOnUtc,pc.Subject,pc.Reply,pc.ReplyDate from Product p INNER JOIN ProductContact pc on p.ProductId=pc.ProductId
  ), cte2 AS
 (
 select pc.StoreId, s.StoreName,pc.ProductId,pc.Id from Seller s inner join ProductContact pc on s.StoreId =pc.StoreId
  ),
  cte3 AS
  (
  select c1.Id,
  c1.ContactName,
  c1.Mobile,
  c1.Email,
  c1.ProductId,
  c1.Name,
  c2.StoreId,
  c2.StoreName,
   c1.UpdatedOnUtc,
   c1.Subject,
   c1.Reply,
   c1.ReplyDate  from cte c1 inner join cte2 c2 on c1.Id=c2.Id
  )
    select * FROM cte3 where UpdatedOnUtc > convert(varchar(8), dateadd(day, " + day + ", getdate()), 112) and Reply is null and ReplyDate is null order by UpdatedOnUtc desc  ";

                        }

                        if (string.IsNullOrEmpty(SalesFrDate) && string.IsNullOrEmpty(SalesTDate) && (reply == "false") && (day != 0))
                        {
                            Query = @"
                            
                          WITH cte AS
                         (
 select pc.ProductId, p.Name,pc.Id,ContactName,pc.Mobile,pc.Email,pc.StoreId,pc.UpdatedOnUtc,pc.Subject,pc.Reply,pc.ReplyDate from Product p INNER JOIN ProductContact pc on p.ProductId=pc.ProductId
  ), cte2 AS
 (
 select pc.StoreId, s.StoreName,pc.ProductId,pc.Id from Seller s inner join ProductContact pc on s.StoreId =pc.StoreId
  ),
  cte3 AS
  (
  select c1.Id,
  c1.ContactName,
  c1.Mobile,
  c1.Email,
  c1.ProductId,
  c1.Name,
  c2.StoreId,
  c2.StoreName,
   c1.UpdatedOnUtc,
   c1.Subject,
   c1.Reply,
   c1.ReplyDate  from cte c1 inner join cte2 c2 on c1.Id=c2.Id
  )
    select * FROM cte3 where UpdatedOnUtc > convert(varchar(8), dateadd(day, " + day + ", getdate()), 112) and ReplyDate!='' order by UpdatedOnUtc desc";

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
        [ActionName("LoadSales")]
        public string LoadSales(string reply, int day)
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
                        if (reply == "true")
                        {
                            Query = @"
WITH cte AS
 (
 select pc.ProductId, p.Name,pc.Id,ContactName,pc.Mobile,pc.Email,pc.StoreId,pc.UpdatedOnUtc,pc.Subject,pc.Reply,pc.ReplyDate from Product p INNER JOIN ProductContact pc on p.ProductId=pc.ProductId
  ), cte2 AS
 (
 select pc.StoreId, s.StoreName,pc.ProductId,pc.Id from Seller s inner join ProductContact pc on s.StoreId =pc.StoreId
  ),
  cte3 AS
  (
  select c1.Id,
  c1.ContactName,
  c1.Mobile,
  c1.Email,
  c1.ProductId,
  c1.Name,
  c2.StoreId,
  c2.StoreName,
   c1.UpdatedOnUtc,
   c1.Subject,
   c1.Reply,
   c1.ReplyDate  from cte c1 inner join cte2 c2 on c1.Id=c2.Id
  )
    select * FROM cte3 where UpdatedOnUtc > convert(varchar(8), dateadd(day, " + day + ", getdate()), 112) and Reply is null and ReplyDate is null order by UpdatedOnUtc desc  ";
                        }
                        else
                        {
                            Query = @"
                            
                          WITH cte AS
                         (
 select pc.ProductId, p.Name,pc.Id,ContactName,pc.Mobile,pc.Email,pc.StoreId,pc.UpdatedOnUtc,pc.Subject,pc.Reply,pc.ReplyDate from Product p INNER JOIN ProductContact pc on p.ProductId=pc.ProductId
  ), cte2 AS
 (
 select pc.StoreId, s.StoreName,pc.ProductId,pc.Id from Seller s inner join ProductContact pc on s.StoreId =pc.StoreId
  ),
  cte3 AS
  (
  select c1.Id,
  c1.ContactName,
  c1.Mobile,
  c1.Email,
  c1.ProductId,
  c1.Name,
  c2.StoreId,
  c2.StoreName,
   c1.UpdatedOnUtc,
   c1.Subject,
   c1.Reply,
   c1.ReplyDate  from cte c1 inner join cte2 c2 on c1.Id=c2.Id
  )
    select * FROM cte3 where UpdatedOnUtc > convert(varchar(8), dateadd(day, " + day + ", getdate()), 112) order by UpdatedOnUtc desc";
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
        [ActionName("modifySales")]
        public IHttpActionResult modifySales(int id, string replies)
        {
            try
            {
                var query = SellerContactHelper.UpdateReply(id, replies);
                var result = _unitOfWork.ExecuteCommand(query, new SqlParameter("@mailId", id));

                try
                {
                    var contactDetailsQuery = SellerContactHelper.GetContactInformation(id);
                    var contactResult = _unitOfWork.ExecuteQuery<SellerContactInfo>(contactDetailsQuery).FirstOrDefault();
                    var productDetails = _unitOfWork.ProductRepository.Find(x => x.ProductId == contactResult.ProductId).FirstOrDefault();
                    var branchinfo = _unitOfWork.SellerBranchRepository.Find(x => x.BranchId == contactResult.StoreId).FirstOrDefault();

                    if (!string.IsNullOrEmpty(contactResult.Email))
                    {
                        MailHelper.SendProductReplyMail(contactResult.Email, productDetails.Name, branchinfo.BranchName, replies);
                    }
                    if (!string.IsNullOrEmpty(contactResult.Mobile))
                    {
                        MessageHelper.SendProductReplyMessage(contactResult.Mobile, productDetails.Name, branchinfo.BranchName, replies);
                    }
                }
                catch (Exception ex)
                {

                }
                return Ok();
            }
            catch
            {
                return StatusCode(HttpStatusCode.ExpectationFailed);
            }           




        }
     

         ///Orders
         ///
        [HttpGet]
        [ActionName("ModifyOrderDetailsStatusBasedOrderItem")]
        public string ModifyOrderDetailsStatusBasedOrderItem(string OrderProductStatus, int OrderId)
        {


            string conStr = DbConName;
            String strjson = "", tablename = "OrderProduct";
            string[] UpdateValue = { OrderProductStatus };
            string[] columnName = { "OrderStatusId" };


            DataSet ds = new DataSet();


            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {

                        con.Open();
                        string oldQuery = "select OrderProduct.OrderStatusId,OrderProduct.id from OrderProduct where id=" + OrderId + " ";
                        SqlCommand cmd1 = new SqlCommand(oldQuery, con);
                        SqlDataAdapter sda = new SqlDataAdapter(cmd1);
                        sda.Fill(ds);
                        string[] oldValue = { ds.Tables[0].Rows[0]["OrderStatusId"].ToString() };
                        string Query = "update OrderProduct set OrderStatusId=" + OrderProductStatus + " where id=" + OrderId + "";
                        SqlCommand cmd = new SqlCommand(Query, con);
                        cmd.ExecuteNonQuery();
                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected == 1)
                        {

                            for (var Update = 0; Update <= UpdateValue.Length - 1; Update++)
                            {
                                AdminMigratedSaveHistory.insertData(OrderId, UpdateValue[Update], oldValue[Update], tablename, columnName[Update]);
                            }

                        }
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
        [ActionName("ModifyOrderitemDetailsStatus")]
        public string ModifyOrderitemDetailsStatus(string OrderitemStatus, int OrderitemId)
        {

            string conStr = DbConName;
            String strjson = "", tablename = "OrderProductItem";
            string[] UpdateValue = { OrderitemStatus };
            string[] columnName = { "OrderItemStatus" };
            DataSet ds = new DataSet();


            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {

                        con.Open();
                        string oldQuery = "select OrderProductItem.OrderItemStatus from OrderProductItem where Id=" + OrderitemId + " ";
                        SqlCommand cmd1 = new SqlCommand(oldQuery, con);
                        SqlDataAdapter sda = new SqlDataAdapter(cmd1);
                        sda.Fill(ds);
                        string[] oldValue = { ds.Tables[0].Rows[0]["OrderItemStatus"].ToString() };
                        string Query = "update OrderProductItem set OrderItemStatus=" + OrderitemStatus + " where Id=" + OrderitemId + " ";
                        SqlCommand cmd = new SqlCommand(Query, con);
                        cmd.ExecuteNonQuery();
                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected == 1)
                        {

                            for (var Update = 0; Update <= UpdateValue.Length - 1; Update++)
                            {
                                AdminMigratedSaveHistory.insertData(OrderitemId, UpdateValue[Update], oldValue[Update], tablename, columnName[Update]);
                            }

                        }
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
        [ActionName("ModifyOrderDetailsStatus")]
        public string ModifyOrderDetailsStatus(string OrderStatus, int OrderId, string OrderProductStatus)
        {

            string conStr = DbConName;
            String strjson = "", tablename = "OrderProduct", OrderStatausTableName = "OrderProductItem", Cancelled = "Cancelled", Delivered = "Delivered";
            string[] UpdateValue = { OrderStatus };
            string[] columnName = { "OrderStatusId" };
            string[] UpdateValued = { OrderStatus };
            string[] colName = { "OrderItemStatus" };

            DataSet ds = new DataSet();


            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    try
                    {
                        if (OrderProductStatus == Cancelled || OrderProductStatus == Delivered)
                        {
                            con.Open();
                            string oldQuery1 = "select OrderProductItem.OrderItemStatus from OrderProductItem where OrderId=" + OrderId + " ";
                            SqlCommand cmd2 = new SqlCommand(oldQuery1, con);
                            SqlDataAdapter sdas = new SqlDataAdapter(cmd2);
                            sdas.Fill(ds);
                            string[] oldOrderStatusValue = { ds.Tables[0].Rows[0]["OrderItemStatus"].ToString() };
                            string Query1 = "update OrderProductItem set OrderItemStatus=" + OrderStatus + " where OrderId=" + OrderId + "";
                            SqlCommand cmd3 = new SqlCommand(Query1, con);
                            cmd3.ExecuteNonQuery();
                            int rowsAffected1 = cmd3.ExecuteNonQuery();
                            if (rowsAffected1 > 0)
                            {


                                for (var Updates = 0; Updates <= UpdateValued.Length - 1; Updates++)
                                {
                                    AdminMigratedSaveHistory.insertData(OrderId, UpdateValued[Updates], oldOrderStatusValue[Updates], OrderStatausTableName, colName[Updates]);

                                }

                            }
                            con.Close();
                        }

                        con.Open();
                        string oldQuery = "select OrderProduct.OrderStatusId,OrderProduct.id from OrderProduct where id=" + OrderId + " ";
                        SqlCommand cmd1 = new SqlCommand(oldQuery, con);
                        SqlDataAdapter sda = new SqlDataAdapter(cmd1);
                        sda.Fill(ds);
                        string[] oldValue = { ds.Tables[0].Rows[0]["OrderStatusId"].ToString() };
                        string Query = "update OrderProduct set OrderStatusId=" + OrderStatus + " where id=" + OrderId + "";
                        SqlCommand cmd = new SqlCommand(Query, con);
                        cmd.ExecuteNonQuery();
                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected == 1)
                        {

                            for (var Update = 0; Update <= UpdateValue.Length - 1; Update++)
                            {
                                AdminMigratedSaveHistory.insertData(OrderId, UpdateValue[Update], oldValue[Update], tablename, columnName[Update]);
                            }

                        }
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
                        string Query = "SELECT COLUMN_NAME as ColumnName FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'OrderProductItem'";
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
        public string LoadOrderDetailsColumnList(int Id, string selected)
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
                        string Query = "select " + selected + " from OrderProductItem where OrderProductItem.OrderId=" + Id + "";
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
        [ActionName("LoadOrderDetailsList")]
        public string LoadOrderDetailsList(int Id)
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
                        string Query = "with cte as ( select distinct OrderProductItem.Id as SubproductId,OrderProductItem.OrderItemStatus,OrderProductItem.OrderItemStatus as ItemStatus,OrderProductItem.OrderId ,OrderProductItem.ProductId,Product.Name,OrderProductItem.BranchId,SellerBranch.BranchName,OrderProductItem.Quantity,OrderProductItem.UnitPriceInclTax,OrderProductItem.PriceInclTax from OrderProductItem inner join Product on OrderProductItem.ProductId=Product.ProductId inner join SellerBranch on OrderProductItem.BranchId=SellerBranch.BranchId where OrderProductItem.OrderId=" + Id + "), cte1 as (select sum(PriceInclTax) as TotalRupees,min(OrderItemStatus) as WholeOrderProductStatus  from cte ) select  * from cte,cte1";
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
        [ActionName("LoadOrderDetails")]
        public string LoadOrderDetails(int day, string OrderId, string FromDate, string ToDate)
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
                        if (!string.IsNullOrEmpty(FromDate)  && !string.IsNullOrEmpty(ToDate) && string.IsNullOrEmpty(OrderId) && day == 0)
                        {
                            Query = @"
                            select  OrderProduct.BillingAddressId,OrderProduct.OrderStatusId,OrderProduct.OrderStatusId 
                            as OrderStatus,OrderProduct.Id,OrderProduct.DeliveryMethod,OrderProduct.DeliveryMethod 
                            as DeliveryOption,OrderProduct.PaymentMethod,OrderProduct.PaymentMethod as PaymentType,OrderProduct.CustomerId ,
                            CAST(BuyerAddress.Address1 as nvarchar(max)) + '' +
                            CAST (BuyerAddress.Address2 as nvarchar(max)) +''+CAST(BuyerAddress.State as nvarchar(max))+''+
                            CAST(BuyerAddress.City as nvarchar(max)) as Address,BuyerAddress.PhoneNumber,BuyerAddress.[User], [User].FirstName  
                            from OrderProduct inner join BuyerAddress on  BuyerAddress.BuyerAddressId=OrderProduct.BillingAddressId 
                             inner join [User] on [User].UserId=BuyerAddress.[User] 
                            where OrderDateUtc >= '{FromDate}' and OrderDateUtc <='{ToDate} 23:59:59.999' order by OrderDateUtc desc".FormatWith(new { FromDate = FromDate, ToDate = ToDate });


                        }
                        if (string.IsNullOrEmpty(FromDate) && string.IsNullOrEmpty(ToDate) && !string.IsNullOrEmpty(OrderId) && day == 0)
                        {
                            Query = @"
      select  OrderProduct.BillingAddressId,OrderProduct.OrderStatusId,OrderProduct.OrderStatusId 
as OrderStatus,OrderProduct.Id,OrderProduct.DeliveryMethod,OrderProduct.DeliveryMethod 
as DeliveryOption,OrderProduct.PaymentMethod,OrderProduct.PaymentMethod as PaymentType,OrderProduct.CustomerId ,
CAST(BuyerAddress.Address1 as nvarchar(max)) + '' +
CAST (BuyerAddress.Address2 as nvarchar(max)) +''+CAST(BuyerAddress.State as nvarchar(max))+''+
CAST(BuyerAddress.City as nvarchar(max)) as Address,BuyerAddress.PhoneNumber,BuyerAddress.[User], [User].FirstName  
from OrderProduct inner join BuyerAddress on  BuyerAddress.BuyerAddressId=OrderProduct.BillingAddressId 
 inner join [User] on [User].UserId=BuyerAddress.[User]
where  OrderProduct.Id= {OrderId}
order by OrderDateUtc desc".FormatWith(new { OrderId = OrderId });


                        }
                        if (string.IsNullOrEmpty(FromDate) && string.IsNullOrEmpty(ToDate) && string.IsNullOrEmpty(OrderId) && day != 0)
                        {
                            Query =
                                @"
      select  OrderProduct.BillingAddressId,OrderProduct.OrderStatusId,OrderProduct.OrderStatusId 
as OrderStatus,OrderProduct.Id,OrderProduct.DeliveryMethod,OrderProduct.DeliveryMethod 
as DeliveryOption,OrderProduct.PaymentMethod,OrderProduct.PaymentMethod as PaymentType,OrderProduct.CustomerId ,
CAST(BuyerAddress.Address1 as nvarchar(max)) + '' +
CAST (BuyerAddress.Address2 as nvarchar(max)) +''+CAST(BuyerAddress.State as nvarchar(max))+''+
CAST(BuyerAddress.City as nvarchar(max)) as Address,BuyerAddress.PhoneNumber,BuyerAddress.[User], [User].FirstName  
from OrderProduct inner join BuyerAddress on  BuyerAddress.BuyerAddressId=OrderProduct.BillingAddressId 
 inner join [User] on [User].UserId=BuyerAddress.[User] 
where  OrderDateUtc >= DATEADD(day, {day}, GetDate())
order by OrderDateUtc desc".FormatWith(new { day = day });

                        }
                        if (!string.IsNullOrEmpty(FromDate) && !string.IsNullOrEmpty(ToDate) && !string.IsNullOrEmpty(OrderId) && day == 0)
                        {
                            Query = @"
                            select  OrderProduct.BillingAddressId,OrderProduct.OrderStatusId,OrderProduct.OrderStatusId 
as OrderStatus,OrderProduct.Id,OrderProduct.DeliveryMethod,OrderProduct.DeliveryMethod 
as DeliveryOption,OrderProduct.PaymentMethod,OrderProduct.PaymentMethod as PaymentType,OrderProduct.CustomerId ,
CAST(BuyerAddress.Address1 as nvarchar(max)) + '' +
CAST (BuyerAddress.Address2 as nvarchar(max)) +''+CAST(BuyerAddress.State as nvarchar(max))+''+
CAST(BuyerAddress.City as nvarchar(max)) as Address,BuyerAddress.PhoneNumber,BuyerAddress.[User], [User].FirstName  
from OrderProduct inner join BuyerAddress on  BuyerAddress.BuyerAddressId=OrderProduct.BillingAddressId 
 inner join [User] on [User].UserId=BuyerAddress.[User] 
where  OrderDateUtc >= '{FromDate}' and OrderDateUtc <='{ToDate} 23:59:59.999' and  OrderProduct.Id= {OrderId}
order by OrderDateUtc desc".FormatWith(new { FromDate = FromDate, ToDate = ToDate, OrderId = OrderId });

                        }
                        if (string.IsNullOrEmpty(FromDate) && string.IsNullOrEmpty(ToDate) && !string.IsNullOrEmpty(OrderId) && day != 0)
                        {
                            Query =
                                  @"
      select  OrderProduct.BillingAddressId,OrderProduct.OrderStatusId,OrderProduct.OrderStatusId 
as OrderStatus,OrderProduct.Id,OrderProduct.DeliveryMethod,OrderProduct.DeliveryMethod 
as DeliveryOption,OrderProduct.PaymentMethod,OrderProduct.PaymentMethod as PaymentType,OrderProduct.CustomerId ,
CAST(BuyerAddress.Address1 as nvarchar(max)) + '' +
CAST (BuyerAddress.Address2 as nvarchar(max)) +''+CAST(BuyerAddress.State as nvarchar(max))+''+
CAST(BuyerAddress.City as nvarchar(max)) as Address,BuyerAddress.PhoneNumber,BuyerAddress.[User], [User].FirstName  
from OrderProduct inner join BuyerAddress on  BuyerAddress.BuyerAddressId=OrderProduct.BillingAddressId 
 inner join [User] on [User].UserId=BuyerAddress.[User]
where OrderDateUtc >= DATEADD(day, {day}, GetDate()) and  OrderProduct.Id= {OrderId}
order by OrderDateUtc desc".FormatWith(new { day = day, OrderId = OrderId });

                        }
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
        [ActionName("loadOrderStatus")]
        public String loadOrderStatus()
        {
            var orderStatus = new List<object>();
            JavaScriptSerializer jss = new JavaScriptSerializer();
            string output = "";

            try
            {


                foreach (var item in Enum.GetValues(typeof(VSOnline.VSECommerce.Utilities.Enums.OrderStatus)))
                {

                    orderStatus.Add(new
                    {
                        id = (int)item,
                        name = item.ToString()


                    });
                }



                output = jss.Serialize(orderStatus);

            }
            catch (Exception Ex)
            {

            }
            return output;

        }

        [HttpGet]
        [ActionName("loadDeliveryOption")]
        public String loadDeliveryOption()
        {
            var DeliveryOption = new List<object>();
            JavaScriptSerializer jss = new JavaScriptSerializer();
            string output = "";
            try
            {

                foreach (var item in Enum.GetValues(typeof(VSOnline.VSECommerce.Utilities.Enums.DeliveryOption)))
                {

                    DeliveryOption.Add(new
                    {
                        id = (int)item,
                        name = item.ToString()
                    });
                }

                output = jss.Serialize(DeliveryOption);

            }
            catch (Exception Ex)
            {

            }
            return output;

        }
        [HttpGet]
        [ActionName("loadPaymentOption")]
        public String loadPaymentOption()
        {
            var PaymentOption = new List<object>();
            JavaScriptSerializer jss = new JavaScriptSerializer();
            string output = "";
            try
            {


                foreach (var item in Enum.GetValues(typeof(VSOnline.VSECommerce.Utilities.Enums.PaymentOption)))
                {

                    PaymentOption.Add(new
                    {
                        id = (int)item,
                        name = item.ToString()
                    });
                }

                output = jss.Serialize(PaymentOption);

            }
            catch (Exception Ex)
            {

            }
            return output;

        }
        
    }
}
