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

namespace VSOnline.VSECommerce.Domain.DTO
{
    public class RetailerProductDTO
    {       
            public int ProductId { get; set; }
            public string Name { get; set; }
            public decimal RetailPrice { get; set; }
            public decimal SpecialPrice { get; set; }
            public int StoreId { get; set; }
            public List<int> BranchIdList { get; set; }
    }

    public class RetailerCreateProductDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public decimal RetailPrice { get; set; }
        public decimal SpecialPrice { get; set; }
        public int StoreId { get; set; }
        public List<int> BranchIdList { get; set; }
    }

    public class RetailerAddProductDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public decimal NewPrice { get; set; }
        public decimal NewSpecialPrice { get; set; }
        public string NewSpecialPriceDescription { get; set; }
        public DateTime NewPriceStartTime { get; set; }
        public DateTime NewPriceEndTime { get; set; }
        public decimal NewAdditionalTax { get; set; }
        public int StoreId { get; set; }
        public List<int> BranchIdList { get; set; }
    }

    public class RetailerUpdateProductDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public decimal SpecialPrice { get; set; }
        public decimal NewPrice { get; set; }

        public string SpecialPriceDescription { get; set; }
        public string NewSpecialPriceDescription { get; set; }
        public decimal NewSpecialPrice { get; set; }
        public DateTime PriceStartTime { get; set; }
        public DateTime PriceEndTime { get; set; }
        public DateTime NewPriceStartTime { get; set; }
        public DateTime NewPriceEndTime { get; set; }

        public decimal AdditionalTax { get; set; }
        public decimal NewAdditionalTax { get; set; }

     //   public bool NewIsShipEnabled{get;set;}
        public decimal NewShippingCharge {get;set;}
      //  public bool NewIsFreeShipping{get;set;}
        public int NewDeliveryTime { get; set; }

     //   public bool IsShipEnabled { get; set; }
        public decimal ShippingCharge { get; set; }
        public bool IsFreeShipping { get; set; }
        public int DeliveryTime { get; set; }

        public int StoreId { get; set; }
        public List<int> BranchIdList { get; set; }
    }
}
