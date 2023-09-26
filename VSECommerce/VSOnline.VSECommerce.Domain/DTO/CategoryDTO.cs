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
    public class CategoryDTO
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string MetaTitle { get; set; }
        public Nullable<int> ParentCategoryId { get; set; }
        public string CategoryGroupTag { get; set; }
        public Nullable<int> GroupDisplayOrder { get; set; }
        public Nullable<bool> Published { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int? DisplayOrder { get; set; }
        public bool? FlagShowBuy { get; set; }
        public bool? ShowOnHomePage { get; set; }
        public Nullable<System.DateTime> CreatedOnUtc { get; set; }
        public Nullable<System.DateTime> UpdatedOnUtc { get; set; }
    }

    public class CategoryModel
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string CategoryGroupTag { get; set; }
        public Nullable<int> GroupDisplayOrder { get; set; }
        public Nullable<int> SelectedCategory { get; set; }
        public bool? FlagShowBuy { get; set; }
    }

    public class CategoryHomePageModel
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string CategoryGroupTag { get; set; }
    }

    public class CategoryFilterDTO
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
    }

    public class SubCategoryFilterDTO
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public Nullable<int> ParentCategoryId { get; set; }
    }
}
