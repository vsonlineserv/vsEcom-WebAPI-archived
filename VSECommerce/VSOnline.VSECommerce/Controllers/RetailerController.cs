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
using VSOnline.VSECommerce.Domain;
using VSOnline.VSECommerce.Domain.DTO;
using System.Security.Claims;
using VSOnline.VSECommerce.Utilities;
using VSOnline.VSECommerce.Domain.ResultSet;
using VSOnline.VSECommerce.Persistence.Entity;
using VSOnline.VSECommerce.Domain.Helper;
using System.Data.SqlClient;
using VSOnline.VSECommerce.Domain.Specification;

namespace VSOnline.VSECommerce.Web.Controllers
{
    [Authorize(Roles = "Administrators , StoreAdmin , StoreModerator")]
    public class RetailerController : ApiController
    {
        IUnitOfWork _unitOfWork = null;

        public RetailerController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public RetailerInfoResultSet GetRetailerInfo()
        {
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            return _unitOfWork.SellerRepository.GetRetailerInfo(currentUser);
        }

        [HttpGet]
        [ActionName("GetRetailerProductFilter")]
        public RetailerProductFilterResult GetRetailerProductFilter()
        {
            var retailerProductFilterResult = new RetailerProductFilterResult();

            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            var retailer = _unitOfWork.SellerRepository.GetRetailerInfo(currentUser);
            var categoryQuery = ProductHelper.GetAllCategory(currentUser);
            var parentCategories = _unitOfWork.ExecuteQuery<CategoryFilterDTO>(categoryQuery).ToList();

            if (parentCategories.Count == 0)
            {
                retailerProductFilterResult = _unitOfWork.CategoryRepository.GetRetailerProductFilterResult(retailerProductFilterResult);
            }
            else
            {

                var subCategoryQuery = ProductHelper.GetAllSubCategory(currentUser);
                var subCategoryFilter = _unitOfWork.ExecuteQuery<SubCategoryFilterDTO>(subCategoryQuery).ToList();
                retailerProductFilterResult.CategoryFilter = parentCategories.Select(cf => new CategoryFilterDTO { CategoryId = cf.CategoryId, Name = cf.Name })
                     .ToList<CategoryFilterDTO>();
                retailerProductFilterResult.SubCategoryFilter = subCategoryFilter;
            }


            retailerProductFilterResult.Brands = _unitOfWork.ManufacturerRepository.GetBrands();
            return retailerProductFilterResult;
        }

        [HttpGet]
        [ActionName("GetProducts")]
        public List<ProductModelForBranchCatalog> GetProducts(int selectedCategory, int selectedSubCategory)
        {
            return GetProducts(selectedCategory, selectedSubCategory, null);
        }
        [HttpGet]
        [ActionName("GetProducts")]
        public List<ProductModelForBranchCatalog> GetProducts(int selectedCategory, int selectedSubCategory, int? selectedBrand)
        {

            RetailerProductSelectedFilter filters = new RetailerProductSelectedFilter
            {
                SelectedCategory = selectedCategory,
                SelectedSubCategory = selectedSubCategory,
                SelectedBrand = selectedBrand

            };

            return _unitOfWork.ProductRepository.GetProducts(filters, 1);

        }
        [HttpGet]
        [ActionName("GetPagingProducts")]
        public List<ProductModel> GetPagingProducts(int selectedCategory, int selectedSubCategory, int pageNo, int PageSize)
        {
            return GetPagingProducts(selectedCategory, selectedSubCategory, null, pageNo, PageSize);
        }
        [HttpGet]
        [ActionName("GetPagingProducts")]
        public List<ProductModel> GetPagingProducts(int selectedCategory, int selectedSubCategory, int? selectedBrand, int pageNo, int PageSize)
        {

            RetailerProductSelectedFilter filters = new RetailerProductSelectedFilter
            {
                SelectedCategory = selectedCategory,
                SelectedSubCategory = selectedSubCategory,
                SelectedBrand = selectedBrand

            };

            return _unitOfWork.ProductRepository.GetPagingProducts(filters, pageNo, PageSize);

        }
        [HttpGet]
        [ActionName("GetMyProducts")]
        public List<RetailerPricingModel> GetMyProducts(int selectedCategory,
        int selectedSubCategory, int storeId, int selectedBranchId)
        {
            return GetMyProducts(selectedCategory, selectedSubCategory, storeId
                    , selectedBranchId, null);
        }
        [HttpGet]
        [ActionName("GetMyProducts")]
        public List<RetailerPricingModel> GetMyProducts(int selectedCategory,
          int selectedSubCategory, int storeId, int selectedBranchId, int? selectedBrand)
        {
            return _unitOfWork.PricingRepository.GetMyProducts(selectedCategory, selectedSubCategory, storeId
                    , selectedBranchId, selectedBrand);
        }
        [HttpGet]
        [ActionName("GetMyFilteredProductsPaging")]
        public List<RetailerPricingModel> GetMyFilteredProductsPaging(int selectedCategory,
     int selectedSubCategory, int storeId, int selectedBranchId, int pageNo, int PageSize)
        {
            return GetMyFilteredProductsPaging(selectedCategory, selectedSubCategory, storeId
                    , selectedBranchId, null, pageNo, PageSize);
        }
        [HttpGet]
        [ActionName("GetMyFilteredProductsPaging")]
        public List<RetailerPricingModel> GetMyFilteredProductsPaging(int selectedCategory,
          int selectedSubCategory, int storeId, int selectedBranchId, int? selectedBrand, int pageNo, int PageSize)
        {
            return _unitOfWork.PricingRepository.GetMyFilteredProductsPaging(selectedCategory, selectedSubCategory, storeId
                , selectedBranchId, selectedBrand, pageNo, PageSize);
        }

        [HttpGet]
        [ActionName("GetSellerInbox")]
        public List<SellerContact> GetSellerInbox(int storeId)
        {
            var query = SellerContactHelper.GetSellerInbox(storeId);
            var result = _unitOfWork.ExecuteQuery<SellerContact>(query);
            return result;
        }

        [HttpGet]
        [ActionName("InboxReply")]
        public IHttpActionResult InboxReply(int mailId, string reply)
        {
            try
            {
                var query = SellerContactHelper.UpdateReply(mailId, reply);
                var result = _unitOfWork.ExecuteCommand(query, new SqlParameter("@mailId", mailId));

                try
                {
                    var contactDetailsQuery = SellerContactHelper.GetContactInformation(mailId);
                    var contactResult = _unitOfWork.ExecuteQuery<SellerContactInfo>(contactDetailsQuery).FirstOrDefault();
                    var productDetails = _unitOfWork.ProductRepository.Find(x => x.ProductId == contactResult.ProductId).FirstOrDefault();
                    var branchinfo = _unitOfWork.SellerBranchRepository.Find(x => x.BranchId == contactResult.StoreId).FirstOrDefault();

                    if (!string.IsNullOrEmpty(contactResult.Email))
                    {
                        MailHelper.SendProductReplyMail(contactResult.Email, productDetails.Name, branchinfo.BranchName, reply);
                    }
                    if (!string.IsNullOrEmpty(contactResult.Mobile))
                    {
                        MessageHelper.SendProductReplyMessage(contactResult.Mobile, productDetails.Name, branchinfo.BranchName, reply);
                    }
                }
                catch (Exception ex)
                {

                }
                return Ok();
            }
            catch
            {
                return StatusCode(HttpStatusCode.ExpectationFailed);
            }
        }
        [HttpPost]
        [ActionName("IncludeProducts")]
        public string IncludeProducts(RetailerAddProductDTO retailerProduct)
        {
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            Enums.UpdateStatus status = Enums.UpdateStatus.Failure;
            if (retailerProduct.BranchIdList == null || retailerProduct.BranchIdList.Count <= 0)
            {
                retailerProduct.BranchIdList = GetBranchIdListFromStore(retailerProduct.StoreId);
            }
            try
            {
                foreach (var branch in retailerProduct.BranchIdList)
                {
                    status = _unitOfWork.PricingRepository.IncludeProduct(retailerProduct, branch, currentUser);
                }
                _unitOfWork.Commit();
            }
            catch
            {
                status = Enums.UpdateStatus.Error;
            }
            return status.ToString();
        }

        public NewProductResultSet CreateProduct(ProductDTO newProductDTO)
        {
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            NewProductResultSet result = new NewProductResultSet();
            try
            {

                var newProductResultSet = _unitOfWork.ProductRepository.CreateNewProduct(newProductDTO);
                if (newProductResultSet != null && newProductResultSet.Status == Enums.UpdateStatus.Success)
                {
                    _unitOfWork.Commit();
                }
                result = newProductResultSet;
            }
            catch
            {
                result.Status = Enums.UpdateStatus.Error;
            }
            return result;
        }

        [HttpGet]
        [ActionName("GetProductById")]
        public Product GetProductById(int id)
        {
            var productDTO = new ProductDTO();
            var product = _unitOfWork.ProductRepository.Find(x => x.ProductId == id, x => x.CategoryDetails).First<Product>();
            return product;
        }

        public string UpdateProduct(ProductDTO updateProductDTO)
        {
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            Enums.UpdateStatus status = Enums.UpdateStatus.Failure;

            try
            {
                if (updateProductDTO.ProductId > 0)
                {
                    var updateProduct = _unitOfWork.ProductRepository.UpdateProduct(updateProductDTO);
                    if (updateProduct != null)
                    {
                        _unitOfWork.UpdateAndSave(updateProduct);
                    }
                    status = Enums.UpdateStatus.Success;
                }
            }
            catch
            {
                status = Enums.UpdateStatus.Error;
            }
            return status.ToString();
        }

        public string UpdateProductSEO(ProductDTO updateProductDTO)
        {
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            Enums.UpdateStatus status = Enums.UpdateStatus.Failure;

            try
            {
                if (updateProductDTO.ProductId > 0)
                {
                    var updateProduct = _unitOfWork.ProductRepository.UpdateProductSeo(updateProductDTO);
                    if (updateProduct != null)
                    {
                        _unitOfWork.UpdateAndSave(updateProduct);
                    }
                    status = Enums.UpdateStatus.Success;
                }
            }
            catch
            {
                status = Enums.UpdateStatus.Error;
            }
            return status.ToString();
        }

        public bool UpdateProductPrice(RetailerUpdateProductDTO retailerProduct)
        {
            var currentUser = ClaimsPrincipal.Current.Identity.Name;

            if (retailerProduct.BranchIdList == null || retailerProduct.BranchIdList.Count <= 0)
            {
                retailerProduct.BranchIdList = GetBranchIdListFromStore(retailerProduct.StoreId);
            }

            try
            {
                foreach (var branch in retailerProduct.BranchIdList)
                {
                    Pricing pricing = _unitOfWork.PricingRepository.Find(x => x.Store == retailerProduct.StoreId &&
                     x.Branch == branch && x.Product == retailerProduct.ProductId).FirstOrDefault<Pricing>();
                    _unitOfWork.PricingRepository.UpdatePricing(retailerProduct, pricing, currentUser);
                    _unitOfWork.UpdateAndSave(pricing);
                }
            }
            catch
            {
                return false;
            }

            return true;
        }
        public bool RemoveProduct(RetailerUpdateProductDTO retailerProduct)
        {
            var currentUser = ClaimsPrincipal.Current.Identity.Name;

            if (retailerProduct.BranchIdList == null || retailerProduct.BranchIdList.Count <= 0)
            {
                retailerProduct.BranchIdList = GetBranchIdListFromStore(retailerProduct.StoreId);
            }

            try
            {
                foreach (var branch in retailerProduct.BranchIdList)
                {
                    Pricing pricing = _unitOfWork.PricingRepository.Find(x => x.Store == retailerProduct.StoreId &&
                     x.Branch == branch && x.Product == retailerProduct.ProductId).FirstOrDefault<Pricing>();
                    pricing.IsDeleted = true;
                    _unitOfWork.UpdateAndSave(pricing);
                }
            }
            catch
            {
                return false;
            }

            return true;
        }

        public bool ResumeProduct(RetailerUpdateProductDTO retailerProduct)
        {
            var currentUser = ClaimsPrincipal.Current.Identity.Name;

            if (retailerProduct.BranchIdList == null || retailerProduct.BranchIdList.Count <= 0)
            {
                retailerProduct.BranchIdList = GetBranchIdListFromStore(retailerProduct.StoreId);
            }

            try
            {
                foreach (var branch in retailerProduct.BranchIdList)
                {
                    Pricing pricing = _unitOfWork.PricingRepository.Find(x => x.Store == retailerProduct.StoreId &&
                     x.Branch == branch && x.Product == retailerProduct.ProductId).FirstOrDefault<Pricing>();
                    pricing.IsDeleted = false;
                    _unitOfWork.UpdateAndSave(pricing);//Here we may need to return number of Saved changes to ensures everything is good.
                }
            }
            catch
            {
                return false;
            }

            return true;
        }

        [HttpGet]
        [ActionName("GetProductKeyFeatures")]
        public List<ProductKeyFeaturesResultSet> GetProductKeyFeatures(int productId)
        {
            var query = ProductFeaturesHelper.GetKeyFeaturesQuery(productId);
            return _unitOfWork.ExecuteQuery<ProductKeyFeaturesResultSet>(query);
        }

        [HttpGet]
        [ActionName("GetProductSpecification")]
        public List<ProductSpecificationResultSet> GetProductSpecification(int productId)
        {
            using (ProductSpecificationDataContext dc = new ProductSpecificationDataContext())
            {
                ProductSpecificationRepository repo = new ProductSpecificationRepository(dc);
                return repo.GetProductSpecification(productId);

            }
            return null;
        }

        [HttpGet]
        [ActionName("GetProductFilterValues")]
        public List<ProductFilterValueResultSet> GetProductFilterValues(int productId)
        {
            using (ProductSpecificationDataContext dc = new ProductSpecificationDataContext())
            {
                ProductSpecificationRepository repo = new ProductSpecificationRepository(dc);
                return repo.GetProductFilterValues(productId);
            }
            return null;
        }


        [HttpGet]
        [ActionName("GetFiltersForProductCategory")]
        public List<CategoryMasterFilterResultSet> GetFiltersForProductCategory(int productId)
        {
            var query = ProductFeaturesHelper.GetMasterFilterForCategory(productId);
            return _unitOfWork.ExecuteQuery<CategoryMasterFilterResultSet>(query);
        }

        [HttpPost]
        [ActionName("UpdateProductSpecifications")]
        public bool UpdateProductSpecifications(ProductSpecificationsAllDTO productSpecifications)
        {

            var filter = productSpecifications.productFilters;
            var keyFeatures = productSpecifications.productKeyFeatures;
            var specifications = productSpecifications.productSpecifications;
            using (ProductSpecificationDataContext dc = new ProductSpecificationDataContext())
            {
                ProductSpecificationRepository repo = new ProductSpecificationRepository(dc);
                repo.AddFilter(filter);
                repo.AddKeyFeatures(keyFeatures);
                repo.AddSpecifications(specifications);
            }
            return true;
        }

        [HttpGet]
        [ActionName("GetMyDetails")]
        public UserDTO GetMyDetails(string username)
        {
            UserDTO userDTO = new UserDTO();
            UserService userService = new UserService();
            if (userService.CheckUserExist(username))
            {
                var currentUser = ClaimsPrincipal.Current.Identity.Name;

                if (username == currentUser)
                {
                    var user = userService.GetUser(username);
                    userDTO.FirstName = user.FirstName;
                    userDTO.LastName = user.LastName;
                    userDTO.PhoneNumber1 = user.PhoneNumber1;
                    userDTO.Email = user.Email;
                }

                return userDTO;
            }

            return userDTO;
        }

        [HttpGet]
        [ActionName("GetStoreDetails")]
        public BranchResults GetStoreDetails(string username, int branchId)
        {
            BranchResults branchDetails = new BranchResults();
            UserService userService = new UserService();
            if (userService.CheckUserExist(username))
            {
                var currentUser = ClaimsPrincipal.Current.Identity.Name;

                if (username == currentUser)
                {
                    var retailer = _unitOfWork.SellerRepository.GetRetailerInfo(currentUser);
                    branchDetails = retailer.Branches.Where(x => x.BranchId == branchId).FirstOrDefault();
                }


            }

            return branchDetails;
        }


        [HttpPost]
        [ActionName("CreateNewBranch")]
        public string CreateNewBranch(BranchModel branchModel)
        {

            UserService userService = new UserService();
            var status = Enums.UpdateStatus.Failure;
            var branch = branchModel.branch;
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            var retailer = _unitOfWork.SellerRepository.GetRetailerInfo(currentUser);
            var store = _unitOfWork.SellerRepository.Find(x => x.StoreId == retailer.StoreId).FirstOrDefault();

            if (branchModel.userName == currentUser)
            {
                SellerBranch branchDetails = new SellerBranch();

                branchDetails.BranchName = branch.BranchName;
                branchDetails.Email = branch.Email;
                branchDetails.Address1 = branch.Address1;
                branchDetails.Address2 = branch.Address2;
                branchDetails.City = branch.City;
                branchDetails.PostalCode = branch.PostalCode;
                branchDetails.PhoneNumber = branch.PhoneNumber;
                branchDetails.Latitude = branch.Latitude;
                branchDetails.Longitude = branch.Longitude;
                branchDetails.Country = branch.Country;
                branchDetails.State = branch.State;
                branchDetails.Store = store.StoreId;

                branchDetails.CreatedOnUtc = DateTime.UtcNow;
                store.Branches.Add(branchDetails);

                _unitOfWork.SellerBranchRepository.Add(branchDetails);
                _unitOfWork.Commit();
                status = Enums.UpdateStatus.Success;
            }
            return status.ToString();
        }

        [HttpPost]
        [ActionName("UpdateBranchDetails")]
        public string UpdateBranchDetails(BranchModel branchModel)
        {

            UserService userService = new UserService();
            var status = Enums.UpdateStatus.Failure;
            var branch = branchModel.branch;
            if (userService.CheckUserExist(branchModel.userName))
            {
                var currentUser = ClaimsPrincipal.Current.Identity.Name;

                if (branchModel.userName == currentUser)
                {
                    var retailer = _unitOfWork.SellerRepository.GetRetailerInfo(currentUser);
                    var store = _unitOfWork.SellerRepository.Find(x => x.StoreId == retailer.StoreId).FirstOrDefault();
                    var branchDetails = store.Branches.Where(x => x.BranchId == branch.BranchId).FirstOrDefault();

                    branchDetails.BranchName = branch.BranchName;
                    branchDetails.Email = branch.Email;
                    branchDetails.Address1 = branch.Address1;
                    branchDetails.Address2 = branch.Address2;
                    branchDetails.City = branch.City;
                    branchDetails.PhoneNumber = branch.PhoneNumber;
                    branchDetails.Latitude = branch.Latitude;
                    branchDetails.Longitude = branch.Longitude;

                    _unitOfWork.UpdateAndSave(branchDetails);
                    _unitOfWork.Commit();
                    status = Enums.UpdateStatus.Success;
                }


            }

            return status.ToString();
        }

        private List<int> GetBranchIdListFromStore(int storeId)
        {
            var branchIdList = new List<int>();
            var seller = _unitOfWork.SellerRepository.Find(x => x.StoreId == storeId, y => y.Branches).FirstOrDefault<Seller>();
            foreach (SellerBranch branch in seller.Branches)
            {
                branchIdList.Add(branch.BranchId);
            }

            return branchIdList;
        }

    }

    public class BranchModel
    {
        public BranchResults branch { get; set; }
        public string userName { get; set; }
    }
}
