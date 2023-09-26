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
    public class ProductCategoryMapping
    {
        public int Id { get; set; }
        public int Product { get; set; }
        public int Category { get; set; }
        public bool IsFeaturedProduct { get; set; }
        public int DisplayOrder { get; set; }
    
        public virtual Category CategoryMap { get; set; }
        public virtual Product ProductMap { get; set; }
    }
}
