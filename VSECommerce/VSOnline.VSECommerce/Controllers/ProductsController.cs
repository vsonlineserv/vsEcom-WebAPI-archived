////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce 
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VSOnline.VSECommerce.Domain.ResultSet;
using VSOnline.VSECommerce.Domain.DTO;
using VSOnline.VSECommerce.Domain;
using VSOnline.VSECommerce.Domain.Helper;
using VSOnline.VSECommerce.Persistence.Entity;
using System.Data.SqlClient;
using System.Security.Claims;
using System.Collections;
using VSOnline.VSECommerce.Core;
    
namespace VSOnline.VSECommerce.Web.Controllers
{
    public class ProductsController : APIBaseController
    {
        IUnitOfWork _unitOfWork = null;

        public ProductsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [ActionName("GetProducts")]
        public List<ProductModelWithCategory> GetProducts(int id, decimal lat, decimal lng, int mapRadius)
        {
            var catIdList = _unitOfWork.CategoryRepository.Find(x => x.ParentCategoryId == id || x.CategoryId == id)
                .Select(x => x.CategoryId)
                .ToList<int>();

            var query = _unitOfWork.SellerBranchRepository.GetStoresWithinAreaQuery(lat, lng, mapRadius);
            var branchIdListLocation = _unitOfWork.ExecuteQuery<LocationBoundaryResultSet>(query)
                .Distinct()
                .Select(x => x.BranchId)
                .ToList<int>();

            var partnerStoreList = _unitOfWork.SellerBranchRepository.Find(x => x.FlagPartner == true).Select(x => x.BranchId).ToList<int>();

            foreach (var partnerStore in partnerStoreList)
            {
                branchIdListLocation.Add(partnerStore);
            }

 
            return _unitOfWork.ProductRepository.GetProducts(catIdList.ToArray(), branchIdListLocation);
        }

            
        [HttpGet]
        [ActionName("GetProducts")]
        public List<ProductModelWithCategory> GetProducts(int id, decimal lat, decimal lng, int mapRadius, int priceRangeFrom, int PriceRangeTo, int? pageStart, int? pageSize)
        {
            var catIdList = _unitOfWork.CategoryRepository.Find(x => x.ParentCategoryId == id || x.CategoryId == id)
                .Select(x=>x.CategoryId)
                .ToList<int>();
          
            var query = _unitOfWork.SellerBranchRepository.GetStoresWithinAreaQuery(lat, lng, mapRadius);
            var branchIdListLocation = _unitOfWork.ExecuteQuery<LocationBoundaryResultSet>(query)
                .Distinct()
                .Select(x => x.BranchId)
                .ToList<int>();


            var curUserId = 0;
            UserService userService = new UserService();
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            if (!string.IsNullOrEmpty(currentUser))
            {
                var user = userService.GetUser(currentUser);
                if(user!=null)
                {
                    curUserId = user.UserId;
                }
            }
            
            if (catIdList.Count > 0)
            {
                var productquery = _unitOfWork.ProductRepository.GetProductsQuery(null,catIdList.ToArray(), branchIdListLocation, priceRangeFrom, PriceRangeTo, pageStart, pageSize, curUserId);
                return _unitOfWork.ExecuteQuery<ProductModelWithCategory>(productquery);
            }
            return new List<ProductModelWithCategory>();
        }


        [HttpPost]
        [ActionName("GetProducts_N")]
        public List<ProductModelWithCategory> GetProducts_N(ProductParameterFilterSet productParameterFilterSet)
        {
            var catIdList = _unitOfWork.CategoryRepository.Find(x => x.ParentCategoryId == productParameterFilterSet.id || x.CategoryId == productParameterFilterSet.id)
                .Select(x => x.CategoryId)
                .ToList<int>();

            var query = _unitOfWork.SellerBranchRepository.GetStoresWithinAreaQuery(productParameterFilterSet.lat, productParameterFilterSet.lng, productParameterFilterSet.mapRadius);
            var branchIdListLocation = _unitOfWork.ExecuteQuery<LocationBoundaryResultSet>(query)
                .Distinct()
                .Select(x => x.BranchId)
                .ToList<int>();

            var curUserId = 0;
            UserService userService = new UserService();
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            if (!string.IsNullOrEmpty(currentUser))
            {
                var user = userService.GetUser(currentUser);
                if (user != null)
                {
                    curUserId = user.UserId;
                }
            }

            if (catIdList.Count > 0)
            {
                var productquery = _unitOfWork.ProductRepository.GetProductsQuery(productParameterFilterSet.filter, catIdList.ToArray(), branchIdListLocation, productParameterFilterSet.priceRangeFrom, productParameterFilterSet.PriceRangeTo, productParameterFilterSet.pageStart,
                    productParameterFilterSet.pageSize, curUserId);
                return _unitOfWork.ExecuteQuery<ProductModelWithCategory>(productquery);
            }
            return new List<ProductModelWithCategory>();
        }

        [HttpPost]
        [ActionName("GetProducts_D")]
        public List<ProductModelWithCategory> GetProducts_D(ProductParameterFilterSet productParameterFilterSet)
        {
             
            var catIdList = _unitOfWork.CategoryRepository.Find(x => x.ParentCategoryId == productParameterFilterSet.id || x.CategoryId == productParameterFilterSet.id)
                .Select(x => x.CategoryId)
                .ToList<int>();

            var query = _unitOfWork.SellerBranchRepository.GetStoresWithinAreaQuery(productParameterFilterSet.lat, productParameterFilterSet.lng, productParameterFilterSet.mapRadius);
            var branchIdListLocation = _unitOfWork.ExecuteQuery<LocationBoundaryResultSet>(query)
                .Distinct()
                .Select(x => x.BranchId)
                .ToList<int>();
            var partnerStoreList = _unitOfWork.SellerBranchRepository.Find(x => x.FlagPartner == true).Select(x => x.BranchId).ToList<int>();

            foreach (var partnerStore in partnerStoreList)
            {
                branchIdListLocation.Add(partnerStore);
            }

            var curUserId = 0;
            UserService userService = new UserService();
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            if (!string.IsNullOrEmpty(currentUser))
            {
                var user = userService.GetUser(currentUser);
                if (user != null)
                {
                    curUserId = user.UserId;
                }
            }

            if (catIdList.Count > 0)
            {
                var productquery = _unitOfWork.ProductRepository.GetProductsQuery_WithFilter(productParameterFilterSet.filter, productParameterFilterSet.selectedProductFilter,
                    catIdList.ToArray(), branchIdListLocation, productParameterFilterSet.priceRangeFrom, productParameterFilterSet.PriceRangeTo, 
                    productParameterFilterSet.pageStart,
                    productParameterFilterSet.pageSize, curUserId);
                return _unitOfWork.ExecuteQuery<ProductModelWithCategory>(productquery);
            }
            return new List<ProductModelWithCategory>();
        }

        [HttpPost]
        [ActionName("GetProducts_J")]
        public List<ProductModelWithCategoryBuy> GetProducts_J(ProductParameterFilterSet productParameterFilterSet)
        {

            var catIdList = _unitOfWork.CategoryRepository.Find(x => x.ParentCategoryId == productParameterFilterSet.id || x.CategoryId == productParameterFilterSet.id)
                .Select(x => x.CategoryId)
                .ToList<int>();

            var query = _unitOfWork.SellerBranchRepository.GetStoresWithinAreaQuery(productParameterFilterSet.lat, productParameterFilterSet.lng, productParameterFilterSet.mapRadius);
            var branchIdListLocation = _unitOfWork.ExecuteQuery<LocationBoundaryResultSet>(query)
                .Distinct()
                .Select(x => x.BranchId)
                .ToList<int>();
            var partnerStoreList = _unitOfWork.SellerBranchRepository.Find(x => x.FlagPartner == true).Select(x => x.BranchId).ToList<int>();

            foreach (var partnerStore in partnerStoreList)
            {
                branchIdListLocation.Add(partnerStore);
            }

            var curUserId = 0;
            UserService userService = new UserService();
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            if (!string.IsNullOrEmpty(currentUser))
            {
                var user = userService.GetUser(currentUser);
                if (user != null)
                {
                    curUserId = user.UserId;
                }
            }

            if (catIdList.Count > 0)
            {
                var productquery = _unitOfWork.ProductRepository.GetProductsQuery_WithFilterAndBuy(productParameterFilterSet.filter, productParameterFilterSet.selectedProductFilter,
                    catIdList.ToArray(), branchIdListLocation, productParameterFilterSet.priceRangeFrom, productParameterFilterSet.PriceRangeTo,
                    productParameterFilterSet.pageStart,
                    productParameterFilterSet.pageSize, curUserId);
                return _unitOfWork.ExecuteQuery<ProductModelWithCategoryBuy>(productquery);
            }
            return new List<ProductModelWithCategoryBuy>();
        }
        

        [HttpGet]
        [ActionName("GetUserWishlistProducts")]
        [Authorize(Roles = "Administrators , StoreAdmin , StoreModerator, Registered, SalesSupport, Support, Marketing")]
        public List<ProductModelWithCategory> GetUserWishlistProducts(decimal lat, decimal lng, int mapRadius, int? pageStart, int? pageSize)
        {
             
            var query = _unitOfWork.SellerBranchRepository.GetStoresWithinAreaQuery(lat, lng, mapRadius);
            var branchIdListLocation = _unitOfWork.ExecuteQuery<LocationBoundaryResultSet>(query)
                .Distinct()
                .Select(x => x.BranchId)
                .ToList<int>();
            var partnerStoreList = _unitOfWork.SellerBranchRepository.Find(x => x.FlagPartner == true).Select(x => x.BranchId).ToList<int>();

            foreach (var partnerStore in partnerStoreList)
            {
                branchIdListLocation.Add(partnerStore);
            }

            var curUserId = 0;
            UserService userService = new UserService();
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            if (!string.IsNullOrEmpty(currentUser))
            {
                var user = userService.GetUser(currentUser);
                if(user!=null)
                {
                    curUserId = user.UserId;
                }
            }           
           
                var productquery = _unitOfWork.ProductRepository.GetUserWishlistProductsQuery(branchIdListLocation, pageStart, pageSize, curUserId);
                return _unitOfWork.ExecuteQuery<ProductModelWithCategory>(productquery);
           
        }



        [HttpGet]
        [ActionName("GetProductKeyFeatures")]
        public List<ProductKeyFeaturesResultSet> GetProductKeyFeatures(int id)
        {
            var query = ProductFeaturesHelper.GetKeyFeaturesQuery(id);
            return _unitOfWork.ExecuteQuery<ProductKeyFeaturesResultSet>(query);
        }


        [HttpGet]
        [ActionName("GetProductSpecification")]
        public List<ProductSpecificationResultSet> GetProductSpecification(int id)
        {
            var query = ProductFeaturesHelper.GetSpecificationQuery(id);
            return _unitOfWork.ExecuteQuery<ProductSpecificationResultSet>(query);
        }

        [HttpGet]
        [ActionName("GetProductDetails")]
        public ProductDetailModel GetProductDetails(int id, bool flagLocation, decimal lat, decimal lng, int mapRadius)
        {
            if(!flagLocation)
            {
               return GetProductDetails(id, flagLocation, null);
            }

            var branchIdListLocation = GetBranchIdListBasedOnLocation(lat, lng, mapRadius);
            var productDetailModel = GetProductDetails(id, flagLocation, branchIdListLocation);
            productDetailModel.RelatedProductList = GetRelatedProducts(id, flagLocation, lat, lng, mapRadius);
            return productDetailModel;           
        }

        private ProductDetailModel GetProductDetails(int id, bool flagLocation, List<int> branchIdList)
        {
            var productDetailModel = _unitOfWork.ProductRepository.GetProductDetails(id);
            productDetailModel.StorePricingModel = new List<StorePricingModel>();
            //include the lat and longitude and also location. 
            if(productDetailModel !=null && productDetailModel.ProductId >0)
            {
                var pricingDetails = _unitOfWork.PricingRepository.Find(x => x.Product == id && x.IsDeleted != true && (flagLocation? branchIdList.Contains(x.Branch) : x.Branch !=null )
                    , y => y.BranchDetails, z => z.BranchDetails.SellerMap).OrderBy(z => z.SpecialPrice).OrderByDescending(y => y.UpdatedOnUtc).ToList();

                foreach(var pricing in pricingDetails)
                {
                    var storePricingModel = new StorePricingModel()
                    {
                        BranchId = pricing.Branch,
                        BranchName = pricing.BranchDetails.BranchName,
                        StoreId = pricing.BranchDetails.SellerMap.StoreId,
                        StoreName = pricing.BranchDetails.SellerMap.StoreName,
                        BranchAddress1 = pricing.BranchDetails.Address1,
                        BranchAddress2 = pricing.BranchDetails.Address2,
                        BranchCity = pricing.BranchDetails.City,
                        Latitude = pricing.BranchDetails.Latitude,
                        Longitude = pricing.BranchDetails.Longitude,
                        EnableBuy = pricing.BranchDetails.EnableBuy,
                        Price = pricing.Price,
                        SpecialPrice = pricing.SpecialPrice,
                        BranchRating = GetSellerRating(pricing.Branch),
                        AdditionalShippingCharge = pricing.AdditionalShippingCharge,
                        AdditionalTax = pricing.AdditionalTax,
                        DeliveryTime = pricing.DeliveryTime                        
                    };
                    productDetailModel.StorePricingModel.Add(storePricingModel);
                }

                //Category details
                if(productDetailModel.Category>0)
                {
                    var category = _unitOfWork.CategoryRepository.Find(x => x.CategoryId == productDetailModel.Category).FirstOrDefault();
                    productDetailModel.CategoryName = category.Name;
                    productDetailModel.ParentCategoryId = category.ParentCategoryId;
                    productDetailModel.CategoryGroupTag = category.CategoryGroupTag;

                    var parentCategory = _unitOfWork.CategoryRepository.Find(x => x.CategoryId == category.ParentCategoryId).FirstOrDefault();
                    productDetailModel.ParentCategoryName = parentCategory.Name;
                }               
            }
            productDetailModel.AndroidInformation1 = @"Availability: Our Service is available only in Chennai, and certain cities of Tamilnadu. If stock is not available in the preferred store, VBuy will get you the same product from another store with same price. 
                * Some registered sellers choose not to avail our map service and will also be shown outside the selected map area.";
            return productDetailModel;
        }

        [HttpGet]
        [ActionName("SearchCatalogue")]
        public List<ProductModelWithCategory> SearchCatalogue(string productFilter, decimal lat, decimal lng, int mapRadius, int priceRangeFrom, int PriceRangeTo, int? pageStart, int? pageSize)
        {
            var branchIdListLocation = GetBranchIdListBasedOnLocation(lat, lng, mapRadius);
            var searchProductsquery = _unitOfWork.ProductRepository.GetSearchCatalogueQuery(null,productFilter, branchIdListLocation, priceRangeFrom, PriceRangeTo, pageStart, pageSize);
            return _unitOfWork.ExecuteQuery<ProductModelWithCategory>(searchProductsquery);
            //return _unitOfWork.ProductRepository.SearchCatalogue(productFilter, branchIdListLocation);
        }

        [HttpPost]
        [ActionName("SearchCatalogue_N")]    
        public List<ProductModelWithCategory> SearchCatalogue_N(ProductSearchFilterSet productSearchFilterSet)        
        {
            var branchIdListLocation = GetBranchIdListBasedOnLocation(productSearchFilterSet.lat, productSearchFilterSet.lng, productSearchFilterSet.mapRadius);
            var searchProductsquery = _unitOfWork.ProductRepository.GetSearchCatalogueQuery(productSearchFilterSet.filter, 
                productSearchFilterSet.productFilter, branchIdListLocation, productSearchFilterSet.priceRangeFrom,
                productSearchFilterSet.PriceRangeTo, productSearchFilterSet.pageStart, productSearchFilterSet.pageSize);
            return _unitOfWork.ExecuteQuery<ProductModelWithCategory>(searchProductsquery);
            //return _unitOfWork.ProductRepository.SearchCatalogue(productFilter, branchIdListLocation);
        }

        public List<ProductModelWithCategory> GetRelatedProducts(int id, bool flagLocation, decimal lat, decimal lng, int mapRadius)
        {
           var curProduct = _unitOfWork.ProductRepository.Find(x => x.ProductId == id,y=>y.PricingCollection).FirstOrDefault();
           int Min = curProduct.ProductId-5;
           int Max = curProduct.ProductId + 5;
           Random randNum = new Random();
            int[] randomProductIds = Enumerable
            .Repeat(0, 8)
            .Select(i => randNum.Next(Min, Max))
            .ToArray();

            var productPrice = curProduct.PricingCollection.FirstOrDefault();


            var category = _unitOfWork.CategoryRepository.Find(x => x.CategoryId == curProduct.Category).FirstOrDefault();
            var catidList = _unitOfWork.CategoryRepository.Find(x => x.CategoryGroupTag == category.CategoryGroupTag).ToList().Select(x=>x.CategoryId);

            var adjustedProductPrice = productPrice!=null ? productPrice.SpecialPrice : 1000;

            var relatedPricing2ProductIds = _unitOfWork.PricingRepository.Find(x => x.IsDeleted != true && x.SpecialPrice > (adjustedProductPrice - 1000) && x.SpecialPrice < (adjustedProductPrice + 1000)).Select(x => x.Product);

      
            var relatedProduct1List = _unitOfWork.ProductRepository.Find(x => x.Category == curProduct.Category &&
                (randomProductIds.Contains(x.ProductId)) && x.IsDeleted != true && x.ProductId !=curProduct.ProductId, y=>y.PricingCollection).ToList();


            var relatedProduct2List = _unitOfWork.ProductRepository.Find(x=>relatedPricing2ProductIds.Contains(x.ProductId) && catidList.Contains(x.Category)
                && x.IsDeleted != true && x.ProductId != curProduct.ProductId, y => y.PricingCollection).Take(10).ToList();

            var relatedProduct3List = _unitOfWork.ProductRepository.Find(x => x.Manufacturer == curProduct.Manufacturer && (x.ShowOnHomePage == true)
          && x.IsDeleted != true && x.ProductId != curProduct.ProductId).ToList();


            List<ProductModelWithCategory> productlist1 = new List<ProductModelWithCategory>();
            List<ProductModelWithCategory> productlist2 = new List<ProductModelWithCategory>();
            List<ProductModelWithCategory> productlist3 = new List<ProductModelWithCategory>();

          

            DTOMapper.ToProductModelWithCategoryList(relatedProduct1List, productlist1);
            DTOMapper.ToProductModelWithCategoryList(relatedProduct2List, productlist2);
            DTOMapper.ToProductModelWithCategoryList(relatedProduct3List, productlist3);

            List<ProductModelWithCategory> productlistFinal = productlist1.Concat(productlist2).Concat(productlist3).Distinct().ToList();

            return productlistFinal;
             
        }

        [HttpGet]
        [ActionName("GetTopOffers")]
        public List<ProductModelWithCategory> GetOffers(decimal lat, decimal lng, int radius, int limit)
        {
            var query = _unitOfWork.SellerBranchRepository.GetStoresWithinAreaQuery(lat, lng, radius);
            var branchIdListLocation = _unitOfWork.ExecuteQuery<LocationBoundaryResultSet>(query)
                .Distinct()
                .Select(x => x.BranchId)
                .ToList<int>();
            var partnerStoreList = _unitOfWork.SellerBranchRepository.Find(x => x.FlagPartner == true).Select(x => x.BranchId).ToList<int>();

            foreach (var partnerStore in partnerStoreList)
            {
                branchIdListLocation.Add(partnerStore);
            }

            var curUserId = 0;
            UserService userService = new UserService();
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            if (!string.IsNullOrEmpty(currentUser))
            {
                var user = userService.GetUser(currentUser);
                if (user != null)
                {
                    curUserId = user.UserId;
                }
            }

            var offersquery = _unitOfWork.ProductRepository.GetOffersQuery(branchIdListLocation, limit, curUserId);
            return _unitOfWork.ExecuteQuery<ProductModelWithCategory>(offersquery);
        }

        [HttpGet]
        [ActionName("GetAllOffers")]
        public List<ProductModelWithCategory> GetAllOffers(decimal lat, decimal lng, int radius)
        {
            var query = _unitOfWork.SellerBranchRepository.GetStoresWithinAreaQuery(lat, lng, radius);
            var branchIdListLocation = _unitOfWork.ExecuteQuery<LocationBoundaryResultSet>(query)
                .Distinct()
                .Select(x => x.BranchId)
                .ToList<int>();
            var curUserId = 0;
            UserService userService = new UserService();
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            if (!string.IsNullOrEmpty(currentUser))
            {
                var user = userService.GetUser(currentUser);
                if (user != null)
                {
                    curUserId = user.UserId;
                }
            }
            var offersquery = _unitOfWork.ProductRepository.GetOffersQuery(branchIdListLocation, 300, curUserId);
            return _unitOfWork.ExecuteQuery<ProductModelWithCategory>(offersquery);
        }

        [HttpGet]
        [ActionName("GetProductRating")]
        public List<ProductRatingResultSet> GetProductRating(int productId)
        {
            var query = RatingHelper.GetProductRating(productId);
           return _unitOfWork.ExecuteQuery<ProductRatingResultSet>(query);           
        }


        //let us not do post here.
        [HttpGet]
        [ActionName("UpdateProductRating")]
        public List<ProductRatingResultSet> UpdateProductRating(int productId, int rating, string userName)
        {
            var curUserId = 0;
            UserService userService = new UserService();
            var currentUser = ClaimsPrincipal.Current.Identity.Name;

            
            if (!string.IsNullOrEmpty(currentUser))
            {
                var user = userService.GetUser(currentUser);
                if (user != null)
                {
                    curUserId = user.UserId;
                }

                if (user != null && userName.ToLower() == user.Username.ToLower())
                {
                    //1,5 hardcoded for now.
                    var query = RatingHelper.InsertProductRatingQuery(productId, rating, curUserId, 1, 5);
                    var update = _unitOfWork.ExecuteCommand(query, new SqlParameter("@productId", productId));

                    var getproductRatingQuery = RatingHelper.GetProductRating(productId);
                    return _unitOfWork.ExecuteQuery<ProductRatingResultSet>(getproductRatingQuery);
                }
            }
            return null;
        }

         

        [HttpGet]
        [ActionName("GetMinMaxForProductCategory")]
        public BaseProductFilter GetMinMaxForProductCategory(int id)
        {
            var catIdList = _unitOfWork.CategoryRepository.Find(x => x.ParentCategoryId == id || x.CategoryId == id)
              .Select(x => x.CategoryId)
              .ToList<int>();

            var prodList = _unitOfWork.ProductRepository.Find(x => catIdList.Contains(x.Category)).Select(x => x.ProductId).ToList<int>();

            BaseProductFilter filter = new BaseProductFilter();

            filter.Max = _unitOfWork.PricingRepository.Find(x => prodList.Contains(x.Product)).Max(x => x.Price);
            filter.Min = _unitOfWork.PricingRepository.Find(x => prodList.Contains(x.Product)).Min(x => x.SpecialPrice);            
            filter.Brand = _unitOfWork.ProductRepository.GetBrandFilter(prodList);

            return filter;
        }

        [HttpGet]
        [ActionName("GetFiltersForProductCategory")]
        public List<ProductFilter> GetFiltersForProductCategory(int id)
        {
            var catIdList = _unitOfWork.CategoryRepository.Find(x => x.ParentCategoryId == id || x.CategoryId == id)
              .Select(x => x.CategoryId)
              .ToList<int>();
            ProductFilterRepository filter = new ProductFilterRepository();
            var query = filter.GetProductFilterQuery(catIdList.ToArray());
            var filterList = _unitOfWork.ExecuteQuery<ProductFilter>(query).ToList<ProductFilter>();

            return filterList;
        }


        [HttpGet]
        [ActionName("GetMinMaxForProductSearch")]
        public BaseProductFilter GetMinMaxForProductSearch(string search)
        {
            var query = _unitOfWork.ProductRepository.GetSearchCataloguePricingFilterQuery(search);
            var prodList = _unitOfWork.ExecuteQuery<int>(query).ToList<int>();

            BaseProductFilter filter = new BaseProductFilter();

            filter.Max = _unitOfWork.PricingRepository.Find(x => prodList.Contains(x.Product)).Max(x => x.Price);
            filter.Min = _unitOfWork.PricingRepository.Find(x => prodList.Contains(x.Product)).Min(x => x.SpecialPrice);
            filter.Brand = _unitOfWork.ProductRepository.GetBrandFilter(prodList);

            return filter;
        }

        [HttpPost]
        [ActionName("ContactSeller")]
        public string ContactSeller(ProductContactResultSet productContactResultSet)
        {
            //get brandh details.
            var sellerBranch = _unitOfWork.SellerBranchRepository.Find(x => x.BranchId == productContactResultSet.Branchid).FirstOrDefault();
            var productDetails = _unitOfWork.ProductRepository.Find(x => x.ProductId == productContactResultSet.ProductId).FirstOrDefault();

            if (AllowAdd(productContactResultSet.ProductId, productContactResultSet.Branchid, productContactResultSet.Name, productContactResultSet.Email,
                productContactResultSet.Mobile, productContactResultSet.Subject))
            {
                var sellerquery = SellerContactHelper.InsertSellerContactQuery(productContactResultSet.ProductId, productContactResultSet.Branchid,
                    productContactResultSet.Name, productContactResultSet.Email, productContactResultSet.Mobile, productContactResultSet.Subject);

                var update = _unitOfWork.ExecuteCommand(sellerquery, new SqlParameter("@subject", productContactResultSet.Subject),
                    new SqlParameter("@branchId", productContactResultSet.Branchid));

                try
                {
                    MailHelper.SendProductRequestMail(sellerBranch.BranchName, sellerBranch.Email, productContactResultSet.Name,
                        productContactResultSet.Email, productContactResultSet.Mobile, productDetails.Name, productContactResultSet.Subject);
                    MessageHelper.SendProductRequestMessage(sellerBranch.PhoneNumber, productDetails.Name, productContactResultSet.Subject, productContactResultSet.Email,
                        productContactResultSet.Mobile);
                }
                catch(Exception ex)
                {

                }
                return "success";
            }
            //You can only sent one message to the store for same product in 2 hours.
            return "failed";
        }

         [HttpGet]
        [ActionName("GetProductComparison")]
        public List<ProductComparisonResultSet> GetProductComparison(string ids)
        {
            try
            {
                List<int> productIds = ids.Split(',').Select(int.Parse).ToList();
                if (productIds.Count <= 4)
                {
                    var query = ProductFeaturesHelper.GetProductComparisonQuery(productIds);
                    var comparisonResult = _unitOfWork.ExecuteQuery<ProductComparisonResultSet>(query);
                    return comparisonResult;
                }
                else
                    return null;
            }
             catch
            {
                
            }
            return null;
        }

         [HttpGet]
         [ActionName("GetProductDetailedComparison")]
         public List<ProductDetailedComparisonResultSet> GetProductDetailedComparison(string ids)
         {
             try
             {
                 List<int> productIds = ids.Split(',').Select(int.Parse).ToList();
                 if (productIds.Count <= 4)
                 {
                     var query = ProductFeaturesHelper.GetProductDetailedComparisonQuery(productIds);
                     var comparisonResult = _unitOfWork.ExecuteQuery<ProductDetailedComparisonResultSet>(query);
                     return comparisonResult;
                 }
                 else
                     return null;
             }
             catch
             {

             }
             return null;
         }

        private bool AllowAdd(int productId, int branchid, string name, string email, string mobile, string subject)
        {
            var verifyInboxquery = SellerContactHelper.VerifyDuplicateInbox(productId, branchid, name, email, mobile);
            int count = _unitOfWork.ExecuteQuery<int>(verifyInboxquery).FirstOrDefault();
            if(count>0)
            {
                return false;
            }
            return true;
        }


        private List<int> GetBranchIdListBasedOnLocation(decimal lat, decimal lng, int radius)
        {
            var query = _unitOfWork.SellerBranchRepository.GetStoresWithinAreaQuery(lat, lng, radius);
            var branchIdListLocation = _unitOfWork.ExecuteQuery<LocationBoundaryResultSet>(query)
                .Distinct()
                .Select(x => x.BranchId)
                .ToList<int>();

            var partnerStoreList = _unitOfWork.SellerBranchRepository.Find(x => x.FlagPartner == true).Select(x => x.BranchId).ToList<int>();

            foreach (var partnerStore in partnerStoreList)
            {
                branchIdListLocation.Add(partnerStore);
            }

            //Lets include partner store even if not available in nearby area//

            return branchIdListLocation;          
        }

        private decimal? GetSellerRating (int branchId)
        {
            var query = RatingHelper.GetSellerRating(branchId);
            var branchRatingResultSet = _unitOfWork.ExecuteQuery<BranchRatingResultSet>(query);
            if (branchRatingResultSet.Count > 0)
            {
                return CalculateStarRating(branchRatingResultSet);
            }
            return null;
        }

         private decimal CalculateStarRating(List<BranchRatingResultSet> ratingList)
         {
             decimal rating = 0;
             decimal totalCount = 0;
            for (var i = 0; i < ratingList.Count; i++) {
                rating = rating + (ratingList[i].Rating * ratingList[i].RatingCount);
                totalCount = totalCount + ratingList[i].RatingCount;
            }
            var starRatingValue = rating / totalCount;
            return Math.Round(starRatingValue,1);
        }
    }
}
