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
using System.Web;
using System.Web.Http;
using System.Security.Claims;
using VSOnline.VSECommerce.Domain;
using VSOnline.VSECommerce.Domain.DTO;
using VSOnline.VSECommerce.Persistence.Entity;
using VSOnline.VSECommerce.Domain.ResultSet;


namespace VSOnline.VSECommerce.Web.Controllers
{
    public class LocationMapController :ApiController
    {                        
        IUnitOfWork _unitOfWork = null;

        public LocationMapController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [ActionName("GetCategoryStoreLocations")]
        public List<RetailerLocationMapDTO> GetCategoryStoreLocations(int id, decimal lat, decimal lng, int mapRadius)
        {
            return GetCategoryStoreLocations(id, lat, lng, mapRadius, 0, 0);
        }

        [HttpGet]
        [ActionName("GetCategoryStoreLocations")]
        public List<RetailerLocationMapDTO> GetCategoryStoreLocations(int id, decimal lat, decimal lng, int mapRadius,int priceRangeFrom, int PriceRangeTo)
        {
            var catIdList = _unitOfWork.CategoryRepository.Find(x => x.ParentCategoryId == id || x.CategoryId == id)
                .Select(x => x.CategoryId)
                .ToList<int>();
            var productIdList = _unitOfWork.ProductRepository.Find(x=>catIdList.Contains(x.Category))
                .Select(x => x.ProductId)
                .ToList<int>();


            var branchIdListLocation = GetBranchIdListBasedOnLocation(lat, lng, mapRadius);

            //TODO:Let us merge this code later on with if conditions inside linq.
            if (priceRangeFrom > 0 && PriceRangeTo > 0)
            {
                var branchIdFilteredList = _unitOfWork.PricingRepository.Find(x => productIdList.Contains(x.Product) && branchIdListLocation.Contains(x.Branch)
                    && x.SpecialPrice >= priceRangeFrom && x.SpecialPrice <= PriceRangeTo)
                    .Select(x => x.Branch)
                    .Distinct()
                    .ToList<int>();
                if (branchIdListLocation.Count > 0)
                {
                    return _unitOfWork.SellerBranchRepository.GetStoreLocations(branchIdFilteredList);
                }
                return new List<RetailerLocationMapDTO>();
            }

                  var branchIdList= _unitOfWork.PricingRepository.Find(x => productIdList.Contains(x.Product) && branchIdListLocation.Contains(x.Branch)
                && x.SpecialPrice>= priceRangeFrom && x.SpecialPrice<=PriceRangeTo)
                .Select(x => x.Branch)
                .Distinct()
                .ToList<int>();

            return _unitOfWork.SellerBranchRepository.GetStoreLocations(branchIdList);    
        }

        [HttpGet]
        [ActionName("GetProductStoreLocations")]
        public List<RetailerLocationMapDTO> GetProductStoreLocations(int id, decimal lat, decimal lng, int mapRadius)
        {
            var branchIdListLocation = GetBranchIdListBasedOnLocation(lat, lng, mapRadius);
                                                                                                    
            var branchIdList = _unitOfWork.PricingRepository.Find(x => x.Product == id && branchIdListLocation.Contains(x.Branch))
                .Select(x => x.Branch)
                .Distinct()
                .ToList<int>();

            return _unitOfWork.SellerBranchRepository.GetStoreLocations(branchIdList);
        }

        [HttpGet]
        [ActionName("GetWishlistStoreLocations")]
        public List<RetailerLocationMapDTO> GetWishlistStoreLocations(decimal lat, decimal lng, int mapRadius)
        {
            var branchIdListLocation = GetBranchIdListBasedOnLocation(lat, lng, mapRadius);

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

            var productList = _unitOfWork.UserWishlistRepository.Find(x => x.User == curUserId).Select(x=>x.Product);
             

            var branchIdList = _unitOfWork.PricingRepository.Find(x=> productList.Contains(x.Product) && branchIdListLocation.Contains(x.Branch))
                .Select(x => x.Branch)
                .Distinct()
                .ToList<int>();

            return _unitOfWork.SellerBranchRepository.GetStoreLocations(branchIdList);
        }

        [HttpGet]
        [ActionName("GetSearchStoreLocations")]
        public List<RetailerLocationMapDTO> GetSearchStoreLocations(string productFilter, decimal lat, decimal lng, int mapRadius, int priceRangeFrom, int PriceRangeTo)
        {

            var branchIdListLocation = GetBranchIdListBasedOnLocation(lat, lng, mapRadius);
            var productIdList = _unitOfWork.ProductRepository.SearchCatalogue(productFilter, branchIdListLocation)
                .Select(x => x.ProductId)
                .ToList<int>();

            //TODO:Let us merge this code later on with if conditions inside linq.
            if (priceRangeFrom > 0 && PriceRangeTo > 0)
            {
                var branchIdFilteredList = _unitOfWork.PricingRepository.Find(x => productIdList.Contains(x.Product) && branchIdListLocation.Contains(x.Branch)
                    && x.SpecialPrice >= priceRangeFrom && x.SpecialPrice <= PriceRangeTo)
                    .Select(x => x.Branch)
                    .Distinct()
                    .ToList<int>();
                if (branchIdListLocation.Count > 0)
                {
                    return _unitOfWork.SellerBranchRepository.GetStoreLocations(branchIdFilteredList);
                }
                return new List<RetailerLocationMapDTO>();
            }

            var branchIdList = _unitOfWork.PricingRepository.Find(x => productIdList.Contains(x.Product) && branchIdListLocation.Contains(x.Branch))
               .Select(x => x.Branch)
               .Distinct()
               .ToList<int>();
            return _unitOfWork.SellerBranchRepository.GetStoreLocations(branchIdList);
        }


        private List<int> GetBranchIdListBasedOnLocation(decimal lat, decimal lng, int mapRadius)
        {
            var query = _unitOfWork.SellerBranchRepository.GetStoresWithinAreaQuery(lat, lng, mapRadius);
            var branchIdListLocation = _unitOfWork.ExecuteQuery<LocationBoundaryResultSet>(query)
                .Distinct()
                .Select(x => x.BranchId)
                .ToList<int>();
            return branchIdListLocation;
        }
    }
}