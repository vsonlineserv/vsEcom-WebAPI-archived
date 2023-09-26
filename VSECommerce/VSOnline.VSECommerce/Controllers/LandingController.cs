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
using System.Security.Claims;
using VSOnline.VSECommerce.Utilities;
using VSOnline.VSECommerce.Core.Caching;
using System.Configuration;
using VSOnline.VSECommerce.Domain.Settings;
using VSOnline.VSECommerce.Persistence.Entity;

namespace VSOnline.VSECommerce.Web.Controllers
{
    public class LandingController : ApiController
    {
        IUnitOfWork _unitOfWork = null;
        ICacheManager _cacheManager = null;

        public LandingController(IUnitOfWork unitOfWork, ICacheManager cacheManager)
        {
            _unitOfWork = unitOfWork;
            _cacheManager = cacheManager;
        }

        [HttpGet]
        [ActionName("GetApplicationData")]
        public Dictionary<string, string> GetApplicationData()
        {
            //To Configure for each account.
            Dictionary<string, string> appSettings = new Dictionary<string, string>();
            appSettings.Add("imageUrlBaseUploaded", ConfigurationManager.AppSettings["imageUrlBaseUploaded"].ToString());

            appSettings.Add("imageUrlBase", ConfigurationManager.AppSettings["ImageUrlBase"].ToString());
            appSettings.Add("imageUrlBaseStandard", ConfigurationManager.AppSettings["imageUrlBaseStandard"].ToString());
            appSettings.Add("imageUrlBaseSmall", ConfigurationManager.AppSettings["imageUrlBaseSmall"].ToString());
            appSettings.Add("imageUrlBaseLarge", ConfigurationManager.AppSettings["imageUrlBaseLarge"].ToString());
            appSettings.Add("ApplicationHosting", ConfigurationManager.AppSettings["ApplicationHosting"].ToString());
            appSettings.Add("homeFolder", ConfigurationManager.AppSettings["homeFolder"].ToString());
            appSettings.Add("homeCategoryFolder", ConfigurationManager.AppSettings["homeCategoryFolder"].ToString());

            return appSettings;          
        }

        [HttpGet]
        [ActionName("GetMainMenu")]
        public List<MenuResult> GetMainMenu()
        {

            var menuResult = _cacheManager.Get(Enums.MAIN_MENU_CACHE_KEY, () =>
                {
                    return _unitOfWork.CategoryRepository.GetCategoryMenu();
                }
                );
            return menuResult;
        }

        [HttpGet]
        [ActionName("GetSubMenu")]
        public List<SubMenuResult> GetSubMenu(int categoryId)
        {
            var subCategorylist = _unitOfWork.CategoryRepository.Find(x => (x.ParentCategoryId == categoryId) && x.IsDeleted != true).ToList();
            var subMenuResultList = new List<SubMenuResult>();

            foreach (VSOnline.VSECommerce.Persistence.Entity.Category category in subCategorylist)
            {
                SubMenuResult subMenuResult = new SubMenuResult();
                subMenuResult.SubCategoryId = category.CategoryId;
                subMenuResult.SubCategoryName = category.Name;
                subMenuResultList.Add(subMenuResult);
            }
            return subMenuResultList;
        }


        [HttpGet]
        [ActionName("GetHomeBannerSettings")]
        public List<SiteSettings> GetHomeBannerSettings()
        {
            List<SiteSettings> siteSettingsList = SiteSettingsService.GetSiteSettings(_cacheManager);
            var homeBannerSiteSettings = siteSettingsList.Where(x => x.SiteKey.Contains("HomeBanner")).ToList();
            return homeBannerSiteSettings;

        }

        [HttpGet]
        [ActionName("GetFeaturedProducts")]
        public List<ProductModel> GetFeaturedProducts()
        {
            var productModelList =  _unitOfWork.ProductRepository.GetFeaturedProducts();
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
            var wishList = _unitOfWork.UserWishlistRepository.Find(x => x.User == curUserId).ToList();

            foreach(var product in productModelList)
            {
                var wishListProduct = wishList.Find(x => x.Product == product.ProductId);
                if (wishListProduct != null)
                {
                    product.FlagWishlist = true;
                }
            }

            return productModelList;
        }

        //Only in web we are using this for now. Later we will change this.
        [HttpGet]
        [ActionName("GetTopCategoriesList")]
        public List<CategoryHomePageModel> GetTopCategoriesList()
        {
            try
            {
                var categoryHomePageModel = _unitOfWork.CategoryRepository.Find(x => x.ShowOnHomePage == true).ToList();
                List<CategoryHomePageModel> catHomePageModelList = new List<CategoryHomePageModel>();
                foreach (var c in categoryHomePageModel)
                {
                    CategoryHomePageModel model = new CategoryHomePageModel();
                    model.CategoryGroupTag = c.CategoryGroupTag;
                    model.CategoryId = c.CategoryId;
                    model.Name = c.Name;
                    catHomePageModelList.Add(model);
                }
                return catHomePageModelList;
            }
            catch
            {

            }
            return null;
        }

        /// <summary>
        /// We are using this in Mobile site for now. We dont want to change this for initial rewrite. Later we will change the same and merge 
        /// android and web as same.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ActionName("GetTopCategories")]
        public List<CategoryHomePageModel> GetTopCategories()
        {
            try
            {
                string strTopCategories = ConfigurationManager.AppSettings["TopCategories"].ToString();
                string[] strAllTopCategories = strTopCategories.Split(',');
                var listCategoryIds = strAllTopCategories.ToList();
                var intlistCategoryIds = listCategoryIds.Select(int.Parse).ToList();
                var categoryHomePageModel = _unitOfWork.CategoryRepository.Find(x => intlistCategoryIds.Contains(x.CategoryId)).ToList();

                List<CategoryHomePageModel> catHomePageModelList = new List<CategoryHomePageModel>();
                foreach (var c in categoryHomePageModel)
                {
                    CategoryHomePageModel model = new CategoryHomePageModel();
                    model.CategoryGroupTag = c.CategoryGroupTag;
                    model.CategoryId = c.CategoryId;
                    model.Name = c.Name;
                    catHomePageModelList.Add(model);
                }
                return catHomePageModelList;
            }
            catch
            {

            }
            return null;
        }

        [HttpGet]
        [ActionName("GetTopSellingProductList1")]
        public List<ProductModelWithCategory> GetTopSellingProductList1()
        {
            List<SiteSettings> siteSettingsList = SiteSettingsService.GetSiteSettings(_cacheManager);
            var categoryKey = siteSettingsList.Find(x => x.SiteKey == Enums.SiteSettings.TopSellingProductCategory.ToString());
            return GetProductBasedonCategory(categoryKey, Enums.Home_TopProductList1_CACHE_KEY);
                 
        }

        [HttpGet]
        [ActionName("GetPersonalizedProductList1")]
        public List<ProductModelWithCategory> GetPersonalizedProductList1()
        {
            List<SiteSettings> siteSettingsList = SiteSettingsService.GetSiteSettings(_cacheManager);
            var categoryKey = siteSettingsList.Find(x => x.SiteKey == Enums.SiteSettings.TopSellingProductCategory2.ToString());
            return GetProductBasedonCategory(categoryKey, Enums.Home_TopProductList2_CACHE_KEY);
        }

        private List<ProductModelWithCategory> GetProductBasedonCategory(SiteSettings categoryKey, string enumCacheString)
        {
            if (categoryKey != null && !string.IsNullOrEmpty(categoryKey.Value)) 
            {
                var productModelListCacheResult = _cacheManager.Get(enumCacheString, () =>
                {
                    var categoryKeyInt = Int32.Parse(categoryKey.Value);
                    var productList = _unitOfWork.ProductRepository.Find(x => x.Category == categoryKeyInt && x.Published == true && x.IsDeleted != true && x.ShowOnHomePage == true,y=>y.CategoryDetails).Distinct().Take(6).ToList();
                    var productModelList = ProductHelper.GetProductModelWithCategoryFromProductList(productList);
                    return productModelList;
                }
              );
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
                var wishList = _unitOfWork.UserWishlistRepository.Find(x => x.User == curUserId).ToList();

                foreach (var product in productModelListCacheResult)
                {
                    var wishListProduct = wishList.Find(x => x.Product == product.ProductId);
                    if (wishListProduct != null)
                    {
                        product.FlagWishlist = true;
                    }
                }
                return productModelListCacheResult;
            }
            return null;

        }

        [HttpGet]
        [ActionName("GetSearchProductsFilter")]
        public List<ProductModel> GetSearchProductsFilter(string searchString)
        {
            if (ConfigurationManager.AppSettings["enableElasticSearch"] != null && ConfigurationManager.AppSettings["enableElasticSearch"].ToString().ToLower() == "true")
            {
                return _unitOfWork.ProductRepository.GetSearchProductsFilter(searchString, true);
            }
            return _unitOfWork.ProductRepository.GetSearchProductsFilter(searchString, false );
        }

        [HttpGet]
        [ActionName("GetSearchAreaFilter")]
        public List<AreaModel> GetSearchAreaFilter(string city)
        {
            //Todo:later on change this logic.
            //Until we get more records lets open everything. 
            if (System.Web.HttpContext.Current.Application["SearchArea"] == null)
            {
                var query = _unitOfWork.SellerRepository.GetAllSearchAreaQuery();
                System.Web.HttpContext.Current.Application["SearchArea"]
               = _unitOfWork.ExecuteQuery<AreaModel>(query).ToList<AreaModel>();
            }

            return System.Web.HttpContext.Current.Application["SearchArea"] as List<AreaModel>;
        }
 
    }
}
