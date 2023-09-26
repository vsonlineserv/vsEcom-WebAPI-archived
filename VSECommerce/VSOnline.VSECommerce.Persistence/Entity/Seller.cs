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
using System.ComponentModel.DataAnnotations;

namespace VSOnline.VSECommerce.Persistence.Entity
{
    public class Seller
    {
        public Seller()
        {
            //this.Pricings = new HashSet<Pricing>();
            //this.Stocks = new HashSet<Stock>();
            this.Branches = new HashSet<SellerBranch>();
        }
        [Key]
        public int StoreId { get; set; }
        public string StoreName { get; set; }
        public string LogoPicture { get; set; }
        public string Description { get; set; }
        public int PrimaryContact { get; set; }
        public System.DateTime CreatedOnUtc { get; set; }
        public Nullable<System.DateTime> UpdatedOnUtc { get; set; }
        public int CreatedUser { get; set; }
    
       // public virtual ICollection<Pricing> Pricings { get; set; }
      //  public virtual User UserMap { get; set; }
       // public virtual User CreatedUserMap { get; set; }
        public virtual ICollection<SellerBranch> Branches { get; set; }
    }
}
