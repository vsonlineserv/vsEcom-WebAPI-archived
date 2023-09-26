////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce.Persistence.Entity
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace VSOnline.VSECommerce.Persistence.Entity
{   
    public class Pricing
    {
        public int PricingId { get; set; }
        public int Product { get; set; }
        public int Store { get; set; }
        public int Branch { get; set; }
        public bool CallForPrice { get; set; }
        public Nullable<decimal> Price { get; set; }
        public decimal OldPrice { get; set; }
        public decimal ProductCost { get; set; }
        public Nullable<decimal> SpecialPrice { get; set; }
        public string SpecialPriceDescription { get; set; }

        public Nullable<System.DateTime> SpecialPriceStartDateTimeUtc { get; set; }
        public Nullable<System.DateTime> SpecialPriceEndDateTimeUtc { get; set; }
        public Nullable<decimal> AdditionalShippingCharge { get; set; }
        public Nullable<int> DeliveryTime { get; set; }
      //  public Nullable<bool> IsShipEnabled { get; set; }
        public Nullable<bool> IsFreeShipping { get; set; }
        public Nullable<decimal> AdditionalTax { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public  string CreatedUser { get; set; }
        public  string UpdatedUser { get; set; }

        public System.DateTime? CreatedOnUtc { get; set; }
        public System.DateTime? UpdatedOnUtc { get; set; }


        [ForeignKey("Product")]
        public virtual Product ProductDetails { get; set; }
        [ForeignKey("Branch")]
        public virtual SellerBranch BranchDetails { get; set; }
    }
}
