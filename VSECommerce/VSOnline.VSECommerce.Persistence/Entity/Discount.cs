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
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VSOnline.VSECommerce.Utilities;

namespace VSOnline.VSECommerce.Persistence.Entity
{
    public class Discount
    {
        public int Id {get; set; }
      public string Name {get; set; }
      public Enums.DiscountType DiscountTypeId {get; set; }
     public bool  UsePercentage {get; set; }
      public decimal DiscountPercentage {get; set; }
      public decimal DiscountAmount {get; set; }
      public DateTime  StartDateUtc {get; set; }
      public DateTime EndDateUtc {get; set; }
      public bool RequiresCouponCode {get; set; }
       public string CouponCode {get; set; }
       public decimal MinOrderValue { get; set; }
       public decimal MaxDiscountAmount { get; set; }
    }
}
