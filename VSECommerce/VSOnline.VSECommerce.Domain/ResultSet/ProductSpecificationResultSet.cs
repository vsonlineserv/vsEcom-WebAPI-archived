////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce.Domain Repository
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VSOnline.VSECommerce.Domain.ResultSet
{
    public class ProductSpecificationResultSet
    {
      public int ProductId {get; set;}
      public string SpecificationGroup {get; set;}
      public string SpecificationAttribute{get; set;}
      public string SpecificationDetails { get; set; }
    }

    public class ProductKeyFeaturesResultSet
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Parameter { get; set; }
        public string KeyFeature { get; set; }
    }

    public class ProductComparisonResultSet
    {
        public string Parameter { get; set; }
        public string Product1Feature { get; set; }
        public string Product2Feature { get; set; }
        public string Product3Feature { get; set; }
        public string Product4Feature { get; set; }
    }


    public class ProductDetailedComparisonResultSet
    {
        public string Parameter { get; set; }
        public string SpecificationGroup { get; set; }
        public string Product1Feature { get; set; }
        public string Product2Feature { get; set; }
        public string Product3Feature { get; set; }
        public string Product4Feature { get; set; }
    }

    public class CategoryMasterFilterResultSet
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string FilterParameter { get; set; }
    }

    public class ProductFilterValueResultSet
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int CategoryMasterFilterId { get; set; }
        public string FilterValue { get; set; }
        public string FilterValueText { get; set; }
    }

    public class ProductSpecificationsAllDTO
    {
        public List<ProductFilterValueResultSet> productFilters {get; set;}
        public List<ProductKeyFeaturesResultSet> productKeyFeatures {get; set;}
        public List<ProductSpecificationResultSet> productSpecifications {get; set;}
    }
}

