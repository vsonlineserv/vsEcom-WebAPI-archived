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
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using VSOnline.VSECommerce.Utilities;

namespace VSOnline.VSECommerce.Domain.Helper
{
   public class OrderHelper
    {
       public static string getOrderDetails(int branchId, int PageSize, int PageNo)
       {
           var query = @"
                          WITH CTE AS
                         (
                          select OrderProductItem.Id Id, OrderProduct.Id OrderId, Product.ProductId,
						  OrderProduct.OrderDateUtc , OrderProductItem.OrderItemStatus, OrderProduct.OrderStatusId
						  ,OrderProduct.PaymentStatusId
                            ,OrderProduct.PaymentMethod
						  ,Product.Name,
						  OrderProductItem.UnitPriceInclTax,OrderProductItem.PriceInclTax,
						  OrderProductItem.Quantity, OrderProductItem.SelectedSize
						  ,OrderProductItem.ShippingCharges
						  ,[User].FirstName, 
						  BuyerAddress.Address1, BuyerAddress.Address2, BuyerAddress.[State], 
						  BuyerAddress.City, BuyerAddress.PostalCode, BuyerAddress.PhoneNumber
						  ,SellerBranch.BranchName
						  
						  From OrderProductItem
						  Inner Join OrderProduct ON OrderProduct.Id = OrderProductItem.OrderId
						   AND BranchId={branchId}
						  INNER Join Product ON Product.ProductId = OrderProductItem.ProductId
						  Inner Join SellerBranch ON SellerBranch.BranchId = OrderProductItem.BranchId
						  Inner Join [User] ON [User].UserId = OrderProduct.CustomerId
						  INNER JOIN BuyerAddress ON OrderProduct.ShippingAddressId = BuyerAddress.BuyerAddressId
						   
                        )
                             SELECT * FROM (
                             SELECT ROW_NUMBER() OVER(ORDER BY OrderId desc) AS orders,
                                   Id, OrderId, OrderDateUtc,Name, ProductId,
                                Quantity,FirstName,BranchName,
                                UnitPriceInclTax,PriceInclTax,
                                Address1,PhoneNumber,
                                PaymentStatusId,PaymentMethod, SelectedSize
                                ,OrderItemStatus AS OrderItemStatusId   FROM CTE
                               ) AS TBL
                WHERE orders BETWEEN (({PageNo} - 1) * {PageSize} + 1) AND ({PageNo} * {PageSize})
                
                        ".FormatWith(new { branchId,PageNo,PageSize });
           return query;
       }
       public static string getSearchOrders(int branchId, string order, int Status)
       {
           var query = "";

           query = @" WITH CTE AS
                         (
                          select OrderProductItem.Id Id, OrderProduct.Id OrderId, Product.ProductId,
						  OrderProduct.OrderDateUtc , OrderProductItem.OrderItemStatus, OrderProduct.OrderStatusId
						  ,OrderProduct.PaymentStatusId
                            ,OrderProduct.PaymentMethod
						  ,Product.Name, OrderProductItem.SelectedSize
						  ,OrderProductItem.UnitPriceInclTax,OrderProductItem.PriceInclTax,
						  OrderProductItem.Quantity
						  ,OrderProductItem.ShippingCharges
						  ,[User].FirstName, 
						  BuyerAddress.Address1, BuyerAddress.Address2, BuyerAddress.[State], 
						  BuyerAddress.City, BuyerAddress.PostalCode, BuyerAddress.PhoneNumber
						  ,SellerBranch.BranchName
						  
						  From OrderProductItem
						  Inner Join OrderProduct ON OrderProduct.Id = OrderProductItem.OrderId
						   AND BranchId={branchId} AND ( {OrderIDDetails} {StatusDetails})
						  INNER Join Product ON Product.ProductId = OrderProductItem.ProductId
						  Inner Join SellerBranch ON SellerBranch.BranchId = OrderProductItem.BranchId
						  Inner Join [User] ON [User].UserId = OrderProduct.CustomerId
						  INNER JOIN BuyerAddress ON OrderProduct.ShippingAddressId = BuyerAddress.BuyerAddressId
						   
                        )
                             SELECT * FROM (
                             SELECT ROW_NUMBER() OVER(ORDER BY OrderId desc) AS orders,
                                   Id, OrderId, OrderDateUtc,Name, ProductId,
                                Quantity,FirstName,BranchName,
                                UnitPriceInclTax,PriceInclTax,
                                Address1,PhoneNumber,
                                PaymentStatusId,PaymentMethod, SelectedSize
                                ,OrderItemStatus AS OrderItemStatusId   FROM CTE
                               ) AS TBL".FormatWith(new { branchId, OrderIDDetails = (!string.IsNullOrEmpty(order)  && order.Length>3) ? "OrderId={order}".FormatWith(new { order }): "",

                                                          StatusDetails = Status > 0 && (string.IsNullOrEmpty(order) || order.Length<=3 )? " OrderProductItem.OrderItemStatus = {Status}".FormatWith(new { Status }) : ""
                                        });       
           
           return query;
       }
       public static string getOrdersSummary(int branchId)
       {
           var query = @"
with OrderCte As
(
  select OrderId,OrderDateUtc,quantity,BranchId,OrderTotal SalesValue from OrderProductItem 
    inner join OrderProduct on OrderProductItem.OrderId=OrderProduct.Id
    Where BranchId = {branchId}
),
cteOrder AS
(
 select 1 slNo, '7 days'  as days, sum(quantity)as quantity,sum(SalesValue)as SalesValue from OrderCte where OrderCte.BranchId={branchId} and (OrderCte.OrderDateUtc>convert(varchar(8), dateadd(day,-7, getutcdate()), 112))
   union
    select 2 slNo, '15 days'  as days, sum(quantity)as quantity,sum(SalesValue)as SalesValue from OrderCte where OrderCte.BranchId={branchId} and (OrderCte.OrderDateUtc>convert(varchar(8), dateadd(day,-15, getutcdate()), 112))
	union
	 select 3 slNo, '30 days'  as days, sum(quantity)as quantity,sum(SalesValue)as SalesValue from OrderCte where OrderCte.BranchId={branchId} and (OrderCte.OrderDateUtc>convert(varchar(8), dateadd(day,-30, getutcdate()), 112))
	union
	 select 4 slNo, '3 Months'  as days, sum(quantity)as quantity,sum(SalesValue)as SalesValue from OrderCte where OrderCte.BranchId={branchId} and (OrderCte.OrderDateUtc>convert(varchar(8), dateadd(day,-90, getutcdate()), 112))
 
)
select days,quantity,SalesValue from cteOrder order by slNo".FormatWith(new { branchId });
           return query;
       }
       public static string GetTotalOrders(int branchId)
       {
           var query = "select *from OrderProductItem where BranchId={branchId}".FormatWith(new { branchId });

           return query;

       }

       public static string GetOrderSummaryByCategoryQuery(int branchId)
       {
           string query = @"select Category.Name CategoryName, Sum(quantity) Quantity, Sum(OrderTotal) Total from OrderProductItem 
                              inner join OrderProduct on OrderProductItem.OrderId=OrderProduct.Id
                              Inner Join Product ON OrderProductItem.ProductId = Product.ProductId
                              Inner Join Category ON Product.Category = Category.CategoryId
                              Where BranchId = {branchId}
                              Group By Category.Name
                              Order By Sum(OrderTotal) desc".FormatWith(new { branchId });
           return query;
       }

       public static string GetOrderSummaryByProductQuery(int branchId)
       {
           string query = @" select Top 5 Product.Name ProductName, Sum(quantity) Quantity, Sum(OrderTotal) Total from OrderProductItem 
                  inner join OrderProduct on OrderProductItem.OrderId=OrderProduct.Id
                  Inner Join Product ON OrderProductItem.ProductId = Product.ProductId
                   Where BranchId = {branchId}
                  Group By Product.Name
                  Order By Sum(OrderTotal) desc, Sum(Quantity) desc".FormatWith(new { branchId });

           return query;
       }

       public static string GetOrderCountSplitByStatusQuery(int branchId)
       {
           string query = @"Select OrderStatusId , PaymentMethod, PaymentStatusId, Count(OrderProduct.Id) OrderCount from OrderProduct 
            Inner Join OrderProductItem ON OrderProduct.Id = OrderProductItem.OrderId
             Where BranchId = {branchId}
            Group By OrderStatusId , PaymentMethod, PaymentStatusId".FormatWith(new { branchId });
           return query;
       }
       
       public static string GetBranchProductSummaryQuery(int branchId)
       {
           string query = @"With cte as (Select CASE WHEN(Pricing.IsDeleted IS NULL OR Pricing.IsDeleted =0) THEN 'Active'
                            ELSE 'Inactive'
                             END ProductStatus,Count(Product.ProductId) TotalProducts from Pricing 
                            Inner Join Product ON Product.ProductId = Pricing.Product
                            Where Branch = {branchId}
                            AND (Product.IsDeleted is NULL OR Product.IsDeleted =0)  AND Product.Published = 1
                            GROUP BY Pricing.IsDeleted
                            Union
                            select 'Pending', Count(Product.ProductId) TotalProducts from Pricing 
                            Inner Join Product ON Product.ProductId = Pricing.Product
                            Where Branch = {branchId}
                            AND (Product.IsDeleted is NULL OR Product.IsDeleted =0)  AND Product.Published !=1
                            )Select ProductStatus, Sum(TotalProducts) TotalProducts from cte 
			                Group By ProductStatus
                             ".FormatWith(new { branchId });
           return query;

       }

       public static string GetBranchEnquirySummaryQuery(int branchId)
       {
           string query = @"select 'Unanswered' Status, Count(Id) EnquiryCount from [dbo].[ProductContact]
                                Where StoreId = 1 AND Reply is NULL and ReplyDate is NULL 
                                Union
                                select 'Replied' Status, Count(Id) EnquiryCount from [dbo].[ProductContact]
                                Where StoreId = 1 AND Reply is NOT NULL and ReplyDate is NOT NULL 
                             ".FormatWith(new { branchId });
           return query;

       }
       
       public static string GetLast6MonthsSalesChartQuery(int branchId)
       {
           string query = @"Select DateName(month, OrderDateUtc) Period, SUM((OrderTotal - OrderDiscount)) Total from OrderProduct
                Inner Join OrderProductItem ON OrderProduct.Id = OrderProductItem.OrderId
                         Where BranchId = {branchId}
                            AND OrderProduct.OrderStatusId in ( {orderStatus})
                            AND OrderProduct.OrderDateUtc> DATEADD(month, DATEDIFF(month, 0, GETUTCDATE()-90), 0)
                            GROUP BY DatePart(Month, OrderDateUtc), DateName(month, OrderDateUtc)
                            Order By DatePart(Month, OrderDateUtc)
                             ".FormatWith(new { branchId, orderStatus = Convert.ToInt32(Enums.OrderStatus.Delivered)});
           return query;
       }

       public static string GetLast7DaysSalesChartQuery(int branchId)
       {
           string query = @"
                        Select DateName(weekday, OrderDateUtc) Period, SUM((OrderTotal - OrderDiscount)) Total from OrderProduct
                             Inner Join OrderProductItem ON OrderProduct.Id = OrderProductItem.OrderId
                                         Where BranchId = {branchId}
                            AND OrderProduct.OrderStatusId in ( {orderStatus})
                            AND OrderProduct.OrderDateUtc> GETUTCDATE() -7
                            GROUP BY DatePart(weekday, OrderDateUtc), DateName(weekday, OrderDateUtc)
                            Order By DatePart(weekday, OrderDateUtc)
                             ".FormatWith(new { branchId, orderStatus = Convert.ToInt32(Enums.OrderStatus.Delivered)});
           return query;
       }

       public static string GetEnumDescription(Enum value)
       {
           try
           {
               FieldInfo fi = value.GetType().GetField(value.ToString());

               DescriptionAttribute[] attributes =
                   (DescriptionAttribute[])fi.GetCustomAttributes(
                   typeof(DescriptionAttribute),
                   false);

               if (attributes != null &&
                   attributes.Length > 0)
                   return attributes[0].Description;
               else
                   return value.ToString();
           }
           catch
           {

           }
           return string.Empty;
       }
    }
    
}
