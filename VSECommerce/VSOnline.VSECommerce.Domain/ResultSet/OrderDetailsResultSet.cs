////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce.Domain Repository
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VSOnline.VSECommerce.Domain.DTO;

namespace VSOnline.VSECommerce.Domain.ResultSet
{
    public class OrderDetailsResultSet
    {
        public int OrderNumber { get; set; }

        public DateTime OrderDateUtc { get; set; }
        public DateTime CreatedOnDateUtc { get; set; }

        public string CustomerId { get; set; }
        public string CustomerIp { get; set; }

        public BillingAddressDTO BillingAddress { get; set; }
        public BillingAddressDTO ShippingAddress { get; set; }

        public string PaymentMethod { get; set; }
        public int PaymentStatusId { get; set; }
        public int OrderStatusId { get; set; }
        public int ShippingStatusId { get; set; }

        public decimal OrderSubTotalInclTax { get; set; }
        public decimal OrderSubTotalExcludingTax { get; set; }
        public decimal PaymentMethodAdditionalFee { get; set; }

        public decimal OrderTotal { get; set; }
        public decimal OrderDiscount { get; set; }
        public decimal OrderTax { get; set; }
        public decimal OrderShippingChargesv { get; set; }

        public decimal RefundedAmount { get; set; }
        public string ShippingMethod { get; set; }

        public string TransactionId { get; set; }
        public string TransactionResult { get; set; }
        public string TransactionResultDetails { get; set; }


        public List<OrderItem> OrderItemList { get; set; }

    }


    public class OrderItem
    {
        public int OrderId{get;set;}
        public int ProductId { get; set; }
        public int StoreId { get; set; }

        public int Quantity { get; set; }

        public decimal UnitPriceInclTax { get; set; }
        public decimal PriceInclTax { get; set; }
        public decimal DiscountAmount { get; set; }

    }
}
