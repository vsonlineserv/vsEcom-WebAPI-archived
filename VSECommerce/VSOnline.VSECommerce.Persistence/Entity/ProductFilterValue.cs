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

namespace VSOnline.VSECommerce.Persistence.Entity
{
    public class ProductFilterValue
    {
        public int Id { get;set;}
        public int ProductId { get; set; }
        public int CategoryMasterFilter { get; set; }
        public string FilterValue { get; set; }
        public string FilterValueText { get; set; }
    }

    public class ProductKeyFeatures
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Parameter { get; set; }
        public string KeyFeature { get; set; }
        public int? DisplayOrder { get; set; }
    }

    public class ProductSpecification
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string SpecificationGroup { get; set; }
        public string SpecificationAttribute { get; set; }
        public string SpecificationDetails { get; set; }
        public int? DisplayOrder { get; set; }
    }
}
