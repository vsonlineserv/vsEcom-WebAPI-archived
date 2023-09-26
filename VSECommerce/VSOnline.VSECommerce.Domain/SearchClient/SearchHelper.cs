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
using VSOnline.VSECommerce.Domain.SearchDTO;
using VSOnline.VSECommerce.Domain.DTO;
using Elasticsearch.Net;
using Nest;
namespace VSOnline.VSECommerce.Domain.Search
{
    public static class SearchHelper
    {

        public static List<ProductModel> GetProductModelFromSearchProductModelResult(ISearchResponse<productmodelelasticsearch> result)
        {
            List<ProductModel> resultProductModelList = new List<ProductModel>();

            if (result.Hits.Any())
            {
                foreach (var hit in result.Hits)
                {
                    ProductModel productModel = new ProductModel();
                    productModel.ProductId = hit.Source.Id;
                    productModel.Name = hit.Source.Name;                 

                    resultProductModelList.Add(productModel);

                    if (!hit.Highlights.Any()) continue;
                    foreach (var highlight in hit.Highlights.SelectMany(highlight => highlight.Value.Highlights))
                    {
                        //TODO:
                    }

                    
                }
            }
            return resultProductModelList;
        }
    }
}
