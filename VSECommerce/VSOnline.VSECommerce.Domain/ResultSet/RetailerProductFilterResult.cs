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
using VSOnline.VSECommerce.Utilities;
using VSOnline.VSECommerce.Domain.ResultSet;

namespace VSOnline.VSECommerce.Domain.DTO
{
    public class RetailerProductFilterResult
    {
        public List<CategoryFilterDTO> CategoryFilter{ get; set; }
        public List<SubCategoryFilterDTO> SubCategoryFilter { get; set; }
        public List<KeyValuePair<int, string>> Brands { get; set; }
        public RetailerProductSelectedFilter SelectedFilters { get; set; }

    }

    public class RetailerProductSelectedFilter
    {
        public int? SelectedCategory { get; set; }
        public int? SelectedSubCategory { get; set; }
        public int? SelectedBrand { get; set; }
    }

    public class SelectedFilter
    {
        public List<BrandListFilter> SelectedBrandList { get; set; }
        public int[] SelectedBrandIdList { get; set; }
        public int SortById { get; set; }
    }

    public class BrandListFilter
    {
        public int Id;
    }

    public class ProductParameterFilterSet
    {
        public int id { get; set; }
        public SelectedFilter filter { get; set; }
        public List<SelectedProductFilterList> selectedProductFilter { get; set; }
        
        public decimal lat { get; set; } 
        public decimal lng { get; set; }
        public int mapRadius { get; set; }
        public int priceRangeFrom { get; set; }
        public int PriceRangeTo { get; set; }
        public int? pageStart { get; set; }
        public int? pageSize { get; set; }
    }

    //lets not try for base filter class and complicate.
    public class ProductSearchFilterSet
    {
        public string productFilter { get; set; }
        public SelectedFilter filter { get; set; }
        public decimal lat { get; set; }
        public decimal lng { get; set; }
        public int mapRadius { get; set; }
        public int priceRangeFrom { get; set; }
        public int PriceRangeTo { get; set; }
        public int? pageStart { get; set; }
        public int? pageSize { get; set; }
    }
    

}
