////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce 
///////////////////////////////////////////////////////////////////////////////////////////
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using VSOnline.VSECommerce.Domain;
using VSOnline.VSECommerce.Domain.DTO;
using System.Security.Claims;
using VSOnline.VSECommerce.Domain.ResultSet;
using VSOnline.VSECommerce.Persistence.Entity;
using VSOnline.VSECommerce.Domain.Helper;
using System.Data.SqlClient;
using VSOnline.VSECommerce.Core;

namespace VSOnline.VSECommerce.Web.Controllers
{
    public class StoresController : APIBaseController
    {
          IUnitOfWork _unitOfWork = null;

          public StoresController(IUnitOfWork unitOfWork)
          {
              _unitOfWork = unitOfWork;
          }

          public RetailerInfoResultSet GetStoreInfo(int id)
          {
              var seller = _unitOfWork.SellerRepository.Find(x=>x.StoreId == id, y=>y.Branches).FirstOrDefault<Seller>();
              return _unitOfWork.SellerRepository.GetStoreInfo(seller);
          }

        public RetailerProductFilterResult GetStoresProductFilter(int storeId, int productId)
        {
            var retailerProductFilterResult = new RetailerProductFilterResult();
            var storeCategoryQuery = _unitOfWork.CategoryRepository.GetStoresCategoryQuery(storeId);
            var categoryList = _unitOfWork.ExecuteQuery<int>(storeCategoryQuery).ToList<int>();

            var selectedSubCategory = _unitOfWork.ProductRepository.Find(x => x.ProductId == productId).Select(y => y.Category).FirstOrDefault<int>();
            var selectedCategory = _unitOfWork.CategoryRepository.Find(x => x.CategoryId == selectedSubCategory).Select(y => y.ParentCategoryId).FirstOrDefault<int?>(); 

            retailerProductFilterResult.SelectedFilters = new RetailerProductSelectedFilter { SelectedCategory=selectedCategory,SelectedSubCategory=selectedSubCategory};


            retailerProductFilterResult = _unitOfWork.CategoryRepository.GetRetailerProductFilterResult(retailerProductFilterResult, categoryList);
            retailerProductFilterResult.Brands = _unitOfWork.ManufacturerRepository.GetBrands();
            return retailerProductFilterResult;
        }

        public List<ProductModel> GetStoreProducts(int selectedCategory, int selectedSubCategory, int storeId, int selectedBranchId)
        {
            return GetStoreProducts(selectedCategory, selectedSubCategory, storeId, selectedBranchId, null);
        }

        public List<ProductModel> GetStoreProducts(int selectedCategory,
            int selectedSubCategory, int storeId, int selectedBranchId, int? selectedBrand)
        {
            return _unitOfWork.PricingRepository.GetStoreProducts(selectedCategory, selectedSubCategory, storeId
                    , selectedBranchId, selectedBrand);
        }

        [HttpGet]
        [ActionName("GetBranchRating")]
        public List<BranchRatingResultSet> GetBranchRating(int branchId)
        {
            var query = RatingHelper.GetSellerRating(branchId);
            return _unitOfWork.ExecuteQuery<BranchRatingResultSet>(query);
        }


        //let us not do post here.
        [HttpGet]
        [ActionName("UpdateBranchRating")]
        public List<BranchRatingResultSet> UpdateBranchRating(int branchId, int rating, string userName)
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
                    var query = RatingHelper.InsertSellerRatingQuery(branchId, rating,curUserId, 1, 5);
                    var update = _unitOfWork.ExecuteCommand(query, new SqlParameter("@branchId", branchId));

                    var sellerBranchRatingQuery = RatingHelper.GetSellerRating(branchId);
                    return _unitOfWork.ExecuteQuery<BranchRatingResultSet>(sellerBranchRatingQuery);
                }
            }
            return null;
        }
    }
}
