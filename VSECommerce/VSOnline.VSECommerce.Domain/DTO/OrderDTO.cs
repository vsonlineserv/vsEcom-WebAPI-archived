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
using VSOnline.VSECommerce.Utilities;
using VSOnline.VSECommerce.Domain.Helper;

namespace VSOnline.VSECommerce.Domain.DTO
{
    public class OrderDTO
    {
            public int Id { get; set; }            
            public Guid OrderGuid { get; set; }
            public int CustomerId { get; set; }
            public int BillingAddressId { get; set; }
            public int ShippingAddressId { get; set; }
            public int OrderStatusId { get; set; }
            public string OrderStatus { get; set; }
            public int ShippingStatusId { get; set; }
            public int PaymentStatusId { get; set; }
            public int PaymentMethod { get; set; }
            public string VatNumber { get; set; }
            public decimal OrderSubtotalInclTax { get; set; }
            public decimal OrderShippingCharges { get; set; }
            public decimal PaymentMethodAdditionalFee { get; set; }
            public decimal OrderDiscount { get; set; }
            public decimal OrderTotal { get; set; }
            public decimal RefundedAmount { get; set; }
            public string CustomerIp { get; set; }
            public string TransactionId { get; set; }
            public string TransactionResult { get; set; }
            public string TransactionResultDetails { get; set; }
            public DateTime OrderDateUtc { get; set; }
            public int DeliveryMethod { get; set; }
            public bool Deleted { get; set; }
            public DateTime UpdatedOnUtc { get; set; }
            public int PurchaseOrderStatus { get; set; }        
    }
    public class OrderSummaryResultSet
    {
        public string days { get; set; }
        public int? quantity { get; set; }
        public decimal? SalesValue { get; set; }
    }


    

    public class OrderItemDTO
    {
         
     public Guid OrderItemGuid {get;set;}
     public int  OrderId {get;set;}
     public int  ProductId {get;set;}
     public int  BranchId {get;set;}
     public int  Quantity {get;set;}
     public decimal UnitPriceInclTax {get;set;}
     public decimal PriceInclTax {get;set;}
     public string SelectedSize { get; set; }
   
    }
    public class OrderTrackingResultSet
    {
        public int Orders { get; set; }
        public int Id { get; set; }  
        public DateTime OrderDateUtc { get; set; }
        public decimal? OrderTotal { get; set; }
        public int Quantity { get; set; }
        public int NumberOfProducts { get; set; }
        public int OrderStatusId { get; set; }
        public string OrderStatus { get; set; } 

        public string OrderItemStatus { get; set; }
        public int? OrderItemStatusId { get; set; }

        public int? PaymentMethod { get; set; }
        public string PaymentMethodString { get; set; }

        public string PaymentStatus { get; set; }
        public int? PaymentStatusId { get; set; }

        public string Name { get; set; }    
        public string BranchName { get; set; }
        public decimal? PriceInclTax { get; set; }
        public decimal? ShippingCharges { get; set; }
        public string SelectedSize { get; set; }
    }
    public class OrderWithIdDTO
    {
        public int OrderId { get; set; }
        public int StoreId { get; set; }
        public string CustomerIP { get; set; }

    }
    public class TotalOrdersDTO
    {
        public int TotalOrders { get; set; }
    }

    public class CategorySummaryOrdersDTO
    {
        public string CategoryName { get; set; }
        public int? quantity { get; set; }
        public decimal? Total { get; set; }
    }


    public class ProductSummaryOrdersDTO
    {
        public string ProductName { get; set; }
        public int? quantity { get; set; }
        public decimal? Total { get; set; }
    }
   
    public class ProductSummaryDashboardResultSet
    {
        public string ProductStatus { get; set; }
        public int? TotalProducts { get; set; }
        
    }
    public class MOMSalesChartResultSet
    {
        public string Period { get; set; }
        public decimal? Total { get; set; }
    }

    public class EnquirySummaryDashboardResultSet
    {
        public string Status { get; set; }
        public int? EnquiryCount { get; set; }

    }

    //Actually these are result set and not DTO. Change later. 
    public class StatusSummaryOrdersDTO
    {
       
        public string OrderStatus{ get; set; }

        public string PaymentStatus { get; set; }

        public string PaymentMethodString { get; set; }
        public int OrderStatusId { get; set; }
        public int PaymentStatusId { get; set; }
        public int PaymentMethod { get; set; }
        public int? OrderCount { get; set; }
    }

    public class BillingAddressDTO
    {
     public string User { get; set; }
	public string State {get; set;}
	public string City{get; set;}
	public string Address1{get; set;}
	public string Address2 {get; set;}
    public int PostalCode { get; set; }
	public string PhoneNumber   {get; set;}
    }

    public class ShoppingCartDTO
    {
        public int BranchId { get; set; }
        public int CustomerId { get; set; }
        public string UserName { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal? AdditionalShippingCharge { get; set; }
        public string SelectedSize { get; set; }
    }
    public class OrderResultSet
    {
        public int Id { get; set;}
        public int OrderId { get; set; }
        public DateTime OrderDateUtc { get; set; }
        public int ProductId { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public decimal? UnitPriceInclTax { get; set; }
        public decimal? PriceInclTax { get; set; }
        public int CustomerId { get; set; }
        public string FirstName { get; set; }
        public string Address1 { get; set; }
        public string City { get; set; }
        public int BranchId { get; set; }
        public string BranchName { get; set; }
        public int?  OrderStatus { get; set; }
        public int? ShippingStatusId { get; set; }
        public int? PaymentStatusId { get; set; }
        public string PaymentStatus { get; set; }
        public int? OrderItemStatusId { get; set; }
        public string OrderItemStatus { get; set; }
        public decimal? OrderTotal { get; set; }
        public string PhoneNumber { get; set; }

        public int? PaymentMethod { get; set; }
        public string PaymentMethodString { get; set; }

    }
    public class ShoppingCartItemListDTO
    {
        public List<ShoppingCartResultSet> shoppingCartDTOList { get; set; }
        public string UserName { get; set; }        
        public string couponCode { get; set; }
    }

    public class CreateOrderItemListDTO
    {
        public List<ShoppingCartResultSet> shoppingCartDTOList { get; set; }
        public string UserName { get; set; }
        public Utilities.Enums.PaymentOption PaymentMethod { get; set; }
        public Utilities.Enums.DeliveryOption DeliveryMethod { get; set; }
        public string CouponCode { get; set; }

    }

    public class BuyerAddressDTO
    {        
        public string UserName { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string PostalCode { get; set; }
        public string PhoneNumber { get; set; }      
    }

    public class BuyerAddressResult
    {
        public int AddressId { get; set; }
        public string UserName { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string PostalCode { get; set; }
        public string PhoneNumber { get; set; }
    }

    public class ShoppingCartResultSet
    {
        public int Id { get; set; }
        public int StoreId { get; set; }
        public int CustomerId { get; set; }         
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal SpecialPrice { get; set; }
        public int? DeliveryTime { get; set; }
        public decimal? AdditionalShippingCharge { get; set; }
        public string SelectedSize { get; set; }
        public string Name { get; set; }
        public string PictureName { get; set; }
	    public int BranchId {get; set;}
        public string Branch { get; set; }
    }

    public class OrderItemResultSet
    {
        public int Id { get; set; }
        public int StoreId { get; set; }
        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public string Name { get; set; }
        public string PictureName { get; set; }
        public decimal SpecialPrice { get; set; }
        public decimal Price { get; set; }
        public decimal ShippingCharges { get; set; }
        public int BranchId { get; set; }
        public string Branch { get; set; }
        public string SelectedSize { get; set; }
    }

    public class ShoppingCartWithId
    {
        public int Id { get; set; }
        public int BranchId { get; set; }
        public int CustomerId { get; set; }
        public string UserName { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public int UnitPrice { get; set; }
    }

    public class OrderConfirmationDTO
    {
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public OrderDTO OrderDetails { get; set; }
        public BuyerAddressResult ShippingAddress { get; set; }
        public List<OrderItemResultSet> OrderItemDetails { get; set; }
    }

    public class OrderConfirmationDTOAllDetails
    {
        public int OrderId { get; set; }

    }

    public class OrderConfirmationDTOTransactionDetails
    {
        public int OrderId { get; set; }

    }

    public class OrderConfirmationDTOShippingDetails
    {
        public int OrderId { get; set; }


    }
 
}
