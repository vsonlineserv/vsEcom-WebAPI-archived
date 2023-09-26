////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce.Domain ResultSet
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VSOnline.VSECommerce.Domain;
using VSOnline.VSECommerce.Domain.ResultSet;
using VSOnline.VSECommerce.Persistence.Entity;
using System.Data.Entity;
using AutoMapper;

namespace VSOnline.VSECommerce.Domain.Specification
{
    public class ProductSpecificationRepository
    {
        private ProductSpecificationDataContext context;

        public ProductSpecificationRepository(ProductSpecificationDataContext context)
        {  
            this.context = context;
             
        }


        public bool AddFilter(List<ProductFilterValueResultSet> productFilterValueResultSetList)
        {
            try
            {

                foreach (ProductFilterValueResultSet filterResult in productFilterValueResultSetList)
                {
                    ProductFilterValue productFilterValue = this.context.ProductFilterValues.Where(x => x.ProductId == filterResult.ProductId
                        && x.Id == filterResult.Id).FirstOrDefault();

                    var productFilterValuesExists = this.context.ProductFilterValues.Where(x => x.ProductId == filterResult.ProductId && x.CategoryMasterFilter == filterResult.CategoryMasterFilterId &&
                        x.FilterValue == filterResult.FilterValue && x.FilterValueText == filterResult.FilterValueText).ToList();

                    if (productFilterValue!=null)
                    {
                        productFilterValue.CategoryMasterFilter = filterResult.CategoryMasterFilterId;
                        productFilterValue.FilterValue = filterResult.FilterValue;
                        productFilterValue.FilterValueText = filterResult.FilterValueText;
                        this.context.Entry(productFilterValue).State = EntityState.Modified;
                    }

                    else if (productFilterValuesExists.Count == 0 && filterResult.CategoryMasterFilterId>0
                        && !string.IsNullOrEmpty(filterResult.FilterValue) && !string.IsNullOrEmpty(filterResult.FilterValueText))
                    {
                        ProductFilterValue productFilterValueNew = new ProductFilterValue();
                        
                        productFilterValueNew.CategoryMasterFilter = filterResult.CategoryMasterFilterId;
                        productFilterValueNew.FilterValue = filterResult.FilterValue;
                        productFilterValueNew.FilterValueText = filterResult.FilterValueText;
                        productFilterValueNew.ProductId = filterResult.ProductId;
                        context.ProductFilterValues.Add(productFilterValueNew);
                        this.context.Entry(productFilterValueNew).State = EntityState.Added;
                    }

                }
                var changes = context.SaveChanges();
                if (changes > 0)
                {
                    return true;
                }
            }
            catch
            {

            }
            return false;
        }

        public bool AddKeyFeatures(List<ProductKeyFeaturesResultSet> keyFeatures)
        {
            try
            {

                foreach (ProductKeyFeaturesResultSet keyFeatureResult in keyFeatures)
                {
                    ProductKeyFeatures productKeyFeature = this.context.ProductKeyFeatures.Where(x => x.ProductId == keyFeatureResult.ProductId
                        && x.Id == keyFeatureResult.Id).FirstOrDefault();

                    var productKeyFeatureValuesExists = this.context.ProductKeyFeatures.Where(x => x.ProductId == keyFeatureResult.ProductId
                        && x.Parameter == keyFeatureResult.Parameter && x.KeyFeature == keyFeatureResult.KeyFeature).ToList();

                    if (productKeyFeature != null)
                    {
                        productKeyFeature.ProductId = keyFeatureResult.ProductId;
                        productKeyFeature.Parameter = keyFeatureResult.Parameter;
                        productKeyFeature.KeyFeature = keyFeatureResult.KeyFeature;

                        this.context.Entry(productKeyFeature).State = EntityState.Modified;
                    }

                    else if (productKeyFeatureValuesExists.Count == 0 && !string.IsNullOrEmpty(keyFeatureResult.Parameter)
                        && !string.IsNullOrEmpty(keyFeatureResult.KeyFeature))
                    {
                        ProductKeyFeatures productKeyFeatureNew = new ProductKeyFeatures();
                        productKeyFeatureNew.ProductId = keyFeatureResult.ProductId;
                        productKeyFeatureNew.Parameter = keyFeatureResult.Parameter;
                        productKeyFeatureNew.KeyFeature = keyFeatureResult.KeyFeature;

                        context.ProductKeyFeatures.Add(productKeyFeatureNew);
                        this.context.Entry(productKeyFeatureNew).State = EntityState.Added;
                    }

                }
                var changes = context.SaveChanges();
                if (changes > 0)
                {
                    return true;
                }
            }
            catch
            {

            }
            return false;
        }

        public bool AddSpecifications(List<ProductSpecificationResultSet> specifications)
        {
            try
            {

                foreach (ProductSpecificationResultSet specification in specifications)
                {
                    ProductSpecification productSpecification = this.context.ProductSpecifications.Where(x => x.ProductId == specification.ProductId
                        && x.SpecificationGroup == specification.SpecificationGroup && x.SpecificationAttribute == specification.SpecificationAttribute 
                        ).FirstOrDefault();

                    var productSpecificationExists = this.context.ProductSpecifications.Where(x => x.ProductId == specification.ProductId
                        && x.SpecificationGroup == specification.SpecificationGroup &&
                        x.SpecificationAttribute == specification.SpecificationAttribute
                        && x.SpecificationDetails == specification.SpecificationDetails).ToList();

                    if (productSpecification != null)
                    {
                        productSpecification.SpecificationGroup = specification.SpecificationGroup;
                        productSpecification.SpecificationAttribute = specification.SpecificationAttribute;
                        productSpecification.SpecificationDetails = specification.SpecificationDetails;
                        this.context.Entry(productSpecification).State = EntityState.Modified;
                    }

                    else if (productSpecificationExists.Count == 0 && !string.IsNullOrEmpty(specification.SpecificationGroup)
                        && !string.IsNullOrEmpty(specification.SpecificationAttribute) && !string.IsNullOrEmpty("specification.SpecificationDetails"))
                    {
                        ProductSpecification productSpecificationNew = new ProductSpecification();
                        productSpecificationNew.ProductId = specification.ProductId;
                        productSpecificationNew.SpecificationGroup = specification.SpecificationGroup;
                        productSpecificationNew.SpecificationAttribute = specification.SpecificationAttribute;
                        productSpecificationNew.SpecificationDetails = specification.SpecificationDetails;
                        context.ProductSpecifications.Add(productSpecificationNew);
                        this.context.Entry(productSpecificationNew).State = EntityState.Added;
                    }

                }
                var changes = context.SaveChanges();
                if (changes > 0)
                {
                    return true;
                }
            }
            catch
            {

            }
            return false;
        }

        public bool AddCategoryMasterFilter(List<CategoryMasterFilterResultSet> categoryMasterFilterResultSet)
        {
            try
            {

                foreach (CategoryMasterFilterResultSet filterResult in categoryMasterFilterResultSet)
                {
                    CategoryMasterFilter masterFilter = this.context.CategoryMasterFilters.Where(x => x.Id == filterResult.Id && x.Category == filterResult.CategoryId).FirstOrDefault();

                    var masterFilterValuesExists = this.context.CategoryMasterFilters.Where(x=>x.Category == filterResult.CategoryId && x.FilterParameter == filterResult.FilterParameter).ToList();

                    if (masterFilter != null)
                    {
                        masterFilter.FilterParameter = filterResult.FilterParameter;
                        this.context.Entry(masterFilter).State = EntityState.Modified;
                    }

                    else if (masterFilterValuesExists.Count == 0 && !string.IsNullOrEmpty(filterResult.FilterParameter) && filterResult.CategoryId>0)
                    {
                        CategoryMasterFilter categoryMasterFilterNew = new CategoryMasterFilter();
                        categoryMasterFilterNew.Category = filterResult.CategoryId;
                        categoryMasterFilterNew.FilterParameter = filterResult.FilterParameter;

                        context.CategoryMasterFilters.Add(categoryMasterFilterNew);
                        this.context.Entry(categoryMasterFilterNew).State = EntityState.Added;
                    }

                }
                var changes = context.SaveChanges();
                if (changes > 0)
                {
                    return true;
                }
            }
            catch
            {

            }
            return false;
        }

        public List<ProductSpecificationResultSet> GetProductSpecification(int productId)
        {
            var productSpecificationList = this.context.ProductSpecifications.Where(x => x.ProductId == productId).ToList();
            List<ProductSpecificationResultSet> specificationResultSet = new List<ProductSpecificationResultSet>();

            var resultSet = Mapper.Map<List<ProductSpecification>, List<ProductSpecificationResultSet>>(productSpecificationList, specificationResultSet);
            return resultSet;
        }

        public List<ProductFilterValueResultSet> GetProductFilterValues(int productId)
        {
            var productFilterValue = this.context.ProductFilterValues.Where(x => x.ProductId == productId).ToList();
            List<ProductFilterValueResultSet> filterResultSet = new List<ProductFilterValueResultSet>();

            var resultSet = Mapper.Map<List<ProductFilterValue>, List<ProductFilterValueResultSet>>(productFilterValue, filterResultSet);
            return resultSet;
        }

        public List<CategoryMasterFilter> GetCategoryMasterFilter(int categoryId)
        {
            var categoryMasterFilter = this.context.CategoryMasterFilters.Where(x => x.Category == categoryId).ToList();
            return categoryMasterFilter;
        }
    }
}
