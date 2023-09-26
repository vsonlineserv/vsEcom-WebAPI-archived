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
using VSOnline.VSECommerce.Utilities;

namespace VSOnline.VSECommerce.Domain.Helper
{
    public class ProductFeaturesHelper
    {
        public static string GetKeyFeaturesQuery(int productId)
        {
            var query = @"SELECT Id, ProductId, Parameter, Keyfeature from ProductKeyFeatures
                        WHERE ProductId = {productId} ORDER BY DisplayOrder".FormatWith(new { productId = productId });
            return query;
        }

        public static string GetSpecificationQuery(int productId)
        {
            var query =@"SELECT  
       [ProductId]
       ,[SpecificationGroup]
       ,[SpecificationAttribute]
       ,[SpecificationDetails]
        FROM [dbo].[ProductSpecification] WHERE  ProductId ={productId}"
                .FormatWith(new { productId = productId });
            return query;
        }

        public static string GetProductComparisonQuery(List<int> productIds)
        {
             int productIdCount = productIds.Count;
            var query = "";
            switch (productIdCount)
            {
                case 4:
                    query = @"
						(Select 'ProductId' Parameter, '{productId1}' Product1Feature,'{productId2}' Product2Feature, 
						'{productId3}' Product3Feature,
						 '{productId4}' Product4Feature	
						)					
						Union ALL 
                        SELECT Parameter = Parameter, Product1Feature =  [{productId1}], Product2Feature = [{productId2}], 
                        Product3Feature = [{productId3}], Product4Feature = [{productId4}] FROM 
                        (
                        SELECT * FROM 
                        (
                        Select Parameter, ProductId, KeyFeature 
                        From ProductKeyFeatures
                        Where ProductId in ({productId1},{productId2}, {productId3}, {productId4})
                        ) AS CompareFeatures
                        PIVOT 
                        (
                        MAX(KEYFEATURE)  FOR 
                        [PRODUCTID] IN ([{productId1}] ,[{productId2}], [{productId3}], [{productId4}])
                        )
                        AS pvt 
                        )Pvt
                        ORDER BY Product1Feature desc"
                               .FormatWith(new { productId1 = productIds[0], productId2 = productIds[1], productId3 = productIds[2], productId4 = productIds[3] });
                    break;
                case 3:
                    query = @"
						(Select 'ProductId' Parameter, '{productId1}' Product1Feature,'{productId2}' Product2Feature, 
						'{productId3}' Product3Feature
						)					
						Union ALL 
                        SELECT Parameter = Parameter, Product1Feature =  [{productId1}], Product2Feature = [{productId2}], 
                        Product3Feature = [{productId3}] FROM 
                        (
                        SELECT * FROM 
                        (
                        Select Parameter, ProductId, KeyFeature 
                        From ProductKeyFeatures
                        Where ProductId in ({productId1},{productId2}, {productId3})
                        ) AS CompareFeatures
                        PIVOT 
                        (
                        MAX(KEYFEATURE)  FOR 
                        [PRODUCTID] IN ([{productId1}] ,[{productId2}], [{productId3}])
                        )
                        AS pvt 
                        )Pvt
                        ORDER BY Product1Feature desc"
                               .FormatWith(new { productId1 = productIds[0], productId2 = productIds[1], productId3 = productIds[2] });
                    break;
                case 2:
                    query = @"
						(Select 'ProductId' Parameter, '{productId1}' Product1Feature,'{productId2}' Product2Feature
						)					
						Union ALL 
                        SELECT Parameter = Parameter, Product1Feature =  [{productId1}], Product2Feature = [{productId2}] FROM 
                        (
                        SELECT * FROM 
                        (
                        Select Parameter, ProductId, KeyFeature 
                        From ProductKeyFeatures
                        Where ProductId in ({productId1},{productId2})
                        ) AS CompareFeatures
                        PIVOT 
                        (
                        MAX(KEYFEATURE)  FOR 
                        [PRODUCTID] IN ([{productId1}] ,[{productId2}])
                        )
                        AS pvt 
                        )Pvt
                        ORDER BY Product1Feature desc"
                               .FormatWith(new { productId1 = productIds[0], productId2 = productIds[1]});
                    break;
                case 1:
                    query = @"
						(Select 'ProductId' Parameter, '{productId1}' Product1Feature
						)					
						Union ALL 
                        SELECT Parameter = Parameter, Product1Feature =  [{productId1}] FROM 
                        (
                        SELECT * FROM 
                        (
                        Select Parameter, ProductId, KeyFeature 
                        From ProductKeyFeatures
                        Where ProductId in ({productId1})
                        ) AS CompareFeatures
                        PIVOT 
                        (
                        MAX(KEYFEATURE)  FOR 
                        [PRODUCTID] IN ([{productId1}])
                        )
                        AS pvt 
                        )Pvt
                        ORDER BY Product1Feature desc"
                               .FormatWith(new { productId1 = productIds[0] });
                    break; 
            }
            return query;
        }

        //TODO:Need to find better way for this method. 
        public static string GetProductDetailedComparisonQuery(List<int> productIds)
        {
            int productIdCount = productIds.Count;
            var query = "";
            switch (productIdCount)
            {
                case 4:
                    query = @"
                        (Select 'Detailed Comparison Group' SpecificationGroup,
						'ProductId' Parameter, '{productId1}' Product1Feature,'{productId2}' Product2Feature, 
						'{productId3}' Product3Feature,
						 '{productId4}' Product4Feature	
						)					
						Union ALL 
                        SELECT [SpecificationGroup] SpecificationGroup, Parameter = [SpecificationAttribute], 
						Product1Feature =  [{productId1}], Product2Feature = [{productId2}], 
                        Product3Feature = [{productId3}], Product4Feature = [{productId4}] FROM 
                        (
                        SELECT * FROM 
                        (
                        Select ProductId, [SpecificationGroup], [SpecificationAttribute],[SpecificationDetails]
                        From [ProductSpecification]
                        Where ProductId in ({productId1},{productId2}, {productId3}, {productId4})
                        ) AS CompareFeatures
                        PIVOT 
                        (
                        MAX([SpecificationDetails])  FOR 
                        [PRODUCTID] IN ([{productId1}] ,[{productId2}], [{productId3}], [{productId4}])
                        )
                        AS pvt 
                        )Pvt
                        ORDER BY SpecificationGroup,Parameter desc"
                                .FormatWith(new { productId1 = productIds[0], productId2 = productIds[1], productId3 = productIds[2], productId4 = productIds[3] });
                    break;
                case 3:
                    query = @"
                        (Select 'Detailed Comparison Group' SpecificationGroup,
						'ProductId' Parameter, '{productId1}' Product1Feature,'{productId2}' Product2Feature, 
						'{productId3}' Product3Feature
						)					
						Union ALL 
                        SELECT [SpecificationGroup] SpecificationGroup, Parameter = [SpecificationAttribute], 
						Product1Feature =  [{productId1}], Product2Feature = [{productId2}], 
                        Product3Feature = [{productId3}] FROM 
                        (
                        SELECT * FROM 
                        (
                        Select ProductId, [SpecificationGroup], [SpecificationAttribute],[SpecificationDetails]
                        From [ProductSpecification]
                        Where ProductId in ({productId1},{productId2}, {productId3})
                        ) AS CompareFeatures
                        PIVOT 
                        (
                        MAX([SpecificationDetails])  FOR 
                        [PRODUCTID] IN ([{productId1}] ,[{productId2}], [{productId3}])
                        )
                        AS pvt 
                        )Pvt
                        ORDER BY SpecificationGroup,Parameter desc"
                                .FormatWith(new { productId1 = productIds[0], productId2 = productIds[1], productId3 = productIds[2]});
                    break;
                case 2:
                    query = @"
                        (Select 'Detailed Comparison Group' SpecificationGroup,
						'ProductId' Parameter, '{productId1}' Product1Feature,'{productId2}' Product2Feature
						)					
						Union ALL 
                        SELECT [SpecificationGroup] SpecificationGroup, Parameter = [SpecificationAttribute], 
						Product1Feature =  [{productId1}], Product2Feature = [{productId2}] FROM 
                        (
                        SELECT * FROM 
                        (
                        Select ProductId, [SpecificationGroup], [SpecificationAttribute],[SpecificationDetails]
                        From [ProductSpecification]
                        Where ProductId in ({productId1},{productId2})
                        ) AS CompareFeatures
                        PIVOT 
                        (
                        MAX([SpecificationDetails])  FOR 
                        [PRODUCTID] IN ([{productId1}] ,[{productId2}])
                        )
                        AS pvt 
                        )Pvt
                        ORDER BY SpecificationGroup,Parameter desc"
                                .FormatWith(new { productId1 = productIds[0], productId2 = productIds[1]});
                    break;
                case 1:
                    query = @"
                        (Select 'Detailed Comparison Group' SpecificationGroup,
						'ProductId' Parameter, '{productId1}' Product1Feature
						)					
						Union ALL 
                        SELECT [SpecificationGroup] SpecificationGroup, Parameter = [SpecificationAttribute], 
						Product1Feature =  [{productId1}] FROM 
                        (
                        SELECT * FROM 
                        (
                        Select ProductId, [SpecificationGroup], [SpecificationAttribute],[SpecificationDetails]
                        From [ProductSpecification]
                        Where ProductId in ({productId1})
                        ) AS CompareFeatures
                        PIVOT 
                        (
                        MAX([SpecificationDetails])  FOR 
                        [PRODUCTID] IN ([{productId1}])
                        )
                        AS pvt 
                        )Pvt
                        ORDER BY SpecificationGroup,Parameter desc"
                                .FormatWith(new { productId1 = productIds[0] });
                    break;

            }
            return query;
        }


        public static string GetMasterFilterForCategory(int productId)
        {
          var query = @"Select Id, CategoryMasterFilter.Category, FilterParameter 
                    From CategoryMasterFilter
                    Inner Join Category ON Category.CategoryId = CategoryMasterFilter.Category
                    Inner Join Product ON Product.Category = Category.CategoryId
                    AND Product.ProductId = {productId}".FormatWith(new { productId = productId });
          return query;
        }
    }
}
