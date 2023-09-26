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
    public class Picture
    {
        public Picture()
        {
            this.Categories = new HashSet<Category>();
            this.Manufacturers = new HashSet<Manufacturer>();
            this.ProductPictureMappings = new HashSet<ProductPictureMapping>();
        }
    
        public int Id { get; set; }
        public byte[] PictureBinary { get; set; }
        public string MimeType { get; set; }
        public string SeoFilename { get; set; }
        public bool IsNew { get; set; }
    
        public virtual ICollection<Category> Categories { get; set; }
        public virtual ICollection<Manufacturer> Manufacturers { get; set; }
        public virtual ICollection<ProductPictureMapping> ProductPictureMappings { get; set; }
    }
}
