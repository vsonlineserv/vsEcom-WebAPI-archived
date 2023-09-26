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
using VSOnline.VSECommerce.Domain.DTO;
using VSOnline.VSECommerce.Domain.SearchDTO;
using VSOnline.VSECommerce.Persistence.Entity;
using System.Configuration;
using Nest;

namespace VSOnline.VSECommerce.Domain.Search
{
    public static class SearchClient
    {
        //public static List<ProductModel> SearchIndex(string searchKeywords, int maxResultCount)
        //{
        //    string indexNameGet = ConfigurationManager.AppSettings["GetIndexName"].ToString();
        //    List<ProductModel> resultProductModelList = new List<ProductModel>();
        //    if (searchKeywords.Length > 0)
        //    {
        //        var result = SearchConfiguration.GetSearchClient.Search<productmodelelasticsearch>(s => s
        //           .Index(indexNameGet)
        //           .Skip(0)
        //           .Take(maxResultCount)
        //             .Query(q =>
        //                 q.MultiMatch(z =>
        //                     z.OnFieldsWithBoost(d => d.Add("Name", 50.0).Add("BrandName", 20.0)
        //                         .Add("CategoryGroupTag", 20.0).Add("SubCategoryName", 25.0).Add("MetaKeywords", 5.0)
        //                     )
        //                     .Fuzziness(0)
        //                     .Type(TextQueryType.BestFields)
        //                      .Query(searchKeywords)
        //                 )
        //                 )
        //            .Highlight(x => x.OnFields(f => f.OnField(d => d.Name)))
        //             );
                
        //     if(result!=null)
        //     {
        //         return SearchHelper.GetProductModelFromSearchProductModelResult(result);
        //     }
                   
        //    }
        //    return resultProductModelList;
        //}

        public static bool LoadIndex()
        {
            bool indexed = false;
            string message = "";
            string indexNameCreate = ConfigurationManager.AppSettings["CreateIndexName"].ToString();
            //better to have a seperate UOW for this instance.Will help for scheduling the same
            IUnitOfWork efUnitOfWork = new EfUnitOfWork();
            List<productmodelelasticsearch> prodModelList = new List<productmodelelasticsearch>();
            //Here only last updated products should be indexed
            //Remove any product that got recently removed or changed the published status.
            var products = efUnitOfWork.ProductRepository.Find(x => x.IsDeleted != true && x.Published == true, y => y.ManufacturerDetails,
                z => z.CategoryDetails).ToList();
            if (products != null)
            {
                Parallel.ForEach(products, elem =>
                {
                    productmodelelasticsearch productModel = new productmodelelasticsearch();
                    productModel.Id = elem.ProductId;
                    productModel.CategoryId = elem.Category;
                    productModel.SubCategoryName = elem.CategoryDetails.Name;
                    productModel.Name = elem.Name;
                    productModel.MetaKeywords = elem.MetaKeywords;
                    productModel.CategoryGroupTag = elem.CategoryDetails.CategoryGroupTag;
                    productModel.BrandName = elem.ManufacturerDetails.Name;
                    productModel.BrandMetaKeywords = elem.ManufacturerDetails.MetaKeywords;

                    lock (prodModelList)
                    {
                        prodModelList.Add(productModel);
                    }
                });
               
                try
                {
                    //SearchConfiguration.GetSearchClient.IndexMany<productmodelelasticsearch>(prodModelList, indexNameCreate, "productmodelelasticsearch");
                    //indexed = true;
                    //message = indexed.ToString();
                }
                catch(Exception ex)
                {
                    indexed = false;
                    message = indexed.ToString() + ex.InnerException;
                }

                string toEmail = ConfigurationManager.AppSettings["AdminEmail"].ToString();
                VSOnline.VSECommerce.Domain.Helper.MailHelper.SendMailToSiteAdmin(toEmail, message);               
            }
            return indexed;
        }
    }
}
