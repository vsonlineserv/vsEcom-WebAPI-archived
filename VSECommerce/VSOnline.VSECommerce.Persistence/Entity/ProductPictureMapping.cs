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
    public class ProductPictureMapping
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int PictureId { get; set; }
        public int DisplayOrder { get; set; }
    
        public virtual Picture Picture { get; set; }
        public virtual Product Product { get; set; }
    }
}
