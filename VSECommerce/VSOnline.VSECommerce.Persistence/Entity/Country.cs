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

namespace VSOnline.VSECommerce.Persistence.Entity
{    
    public class Country
    {
        public Country()
        {
            this.BuyerAddresses = new HashSet<BuyerAddress>();
            this.SellerAddresses = new HashSet<SellerBranch>();
        }
    
        public int CountryId { get; set; }
        public string Name { get; set; }
        public bool AllowsBilling { get; set; }
        public bool AllowsShipping { get; set; }
        public string TwoLetterIsoCode { get; set; }
        public string ThreeLetterIsoCode { get; set; }
        public int NumericIsoCode { get; set; }
        public bool SubjectToVat { get; set; }
        public bool Published { get; set; }
        public int DisplayOrder { get; set; }
    
        public virtual ICollection<BuyerAddress> BuyerAddresses { get; set; }
        public virtual ICollection<SellerBranch> SellerAddresses { get; set; }
    }
}
