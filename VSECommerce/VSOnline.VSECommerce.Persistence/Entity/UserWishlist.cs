////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce.Persistence.Entity
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VSOnline.VSECommerce.Persistence.Entity
{
    public class UserWishlist
    {
        [Key]
        public int Id { get; set; }
        public int User { get; set; }
        public int Product { get; set; }
        public System.DateTime CreatedOnUtc { get; set; }
        [ForeignKey("Product")]
        public virtual Product ProductDetails { get; set; }
        [ForeignKey("User")]
        public virtual User UserDetails { get; set; }
    }
}
