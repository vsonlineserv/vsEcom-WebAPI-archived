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
using VSOnline.VSECommerce.Domain.DTO;
using VSOnline.VSECommerce.Utilities;
using VSOnline.VSECommerce.Persistence.Entity;
using AutoMapper;
using PagedList;

namespace VSOnline.VSECommerce.Domain
{
    public static class PricingRepository
    {
        public static Enums.UpdateStatus IncludeProduct(this IGenericRepository<Pricing> pricingRepository,
            RetailerAddProductDTO retailerProductDTO, int branchId, string user)
        {
                var status = Enums.UpdateStatus.Failure;

            try
            {
                if (!FlagProductExistInStore(pricingRepository, retailerProductDTO, branchId))
                {
                    Pricing priceProduct = new Pricing
                    {
                        Product = retailerProductDTO.ProductId,
                        CallForPrice = false,
                        CreatedUser = user,
                        SpecialPrice = retailerProductDTO.NewSpecialPrice,
                        SpecialPriceDescription = retailerProductDTO.NewSpecialPriceDescription,
                        Price = retailerProductDTO.NewPrice,
                        AdditionalTax = retailerProductDTO.NewAdditionalTax,
                        SpecialPriceStartDateTimeUtc = retailerProductDTO.NewPriceStartTime,
                        SpecialPriceEndDateTimeUtc = retailerProductDTO.NewPriceEndTime,
                        OldPrice = 0,
                        Store = retailerProductDTO.StoreId,
                        Branch = branchId
                    };

                    pricingRepository.Add(priceProduct);
                    status = Enums.UpdateStatus.Success;
                }
                else
                {
                    status = Enums.UpdateStatus.AlreadyExist;
                }
            }
            catch
            {
              status = Enums.UpdateStatus.Error;
            }
            return status;
        }

        public static bool FlagProductExistInStore(IGenericRepository<Pricing> pricingRepository,
           RetailerAddProductDTO retailerProductDTO, int branchId)
        {
           var pricing = pricingRepository.Find(x => x.Store == retailerProductDTO.StoreId && x.Branch == branchId 
                && x.Product == retailerProductDTO.ProductId).ToList();

            if(pricing.Count>0)
            {
                return true;
            }
            return false;
        }

        public static Pricing UpdatePricing (this IGenericRepository<Pricing> pricingRepository,
           RetailerUpdateProductDTO retailerUpdateProductDTO, Pricing pricing, string user)
        {                                                                                                
            try
            {
                    var oldPrice = pricing.Price;

                    pricing.OldPrice = oldPrice??0;
                    pricing.Price = retailerUpdateProductDTO.NewPrice;
                    pricing.SpecialPrice = retailerUpdateProductDTO.NewSpecialPrice;
                    pricing.SpecialPriceDescription = retailerUpdateProductDTO.NewSpecialPriceDescription;

                    pricing.AdditionalShippingCharge = retailerUpdateProductDTO.NewShippingCharge;
                    pricing.AdditionalTax = retailerUpdateProductDTO.NewAdditionalTax;
                    pricing.SpecialPriceStartDateTimeUtc = retailerUpdateProductDTO.NewPriceStartTime;
                    pricing.SpecialPriceEndDateTimeUtc = retailerUpdateProductDTO.NewPriceEndTime;
                    pricing.DeliveryTime = retailerUpdateProductDTO.NewDeliveryTime;
                    pricing.UpdatedUser = user;
                    pricingRepository.Attach(pricing);
                    return pricing;                    
            }
            catch
            {
                return null;
            }
        }

        public static List<RetailerPricingModel> GetMyProducts(this IGenericRepository<Pricing> pricingRepository, int selectedCategory,
           int selectedSubCategory, int storeId, int selectedBranchId, int? selectedBrand)
        {
            var pricingList = pricingRepository.Find(x => x.Branch == selectedBranchId && x.Store == storeId && x.ProductDetails.Category == selectedSubCategory
        && (selectedBrand != null ? x.ProductDetails.Manufacturer == selectedBrand : x.ProductDetails.Manufacturer != null)
        , y => y.ProductDetails, z=>z.BranchDetails).ToList<Pricing>();

            List<RetailerPricingModel> retailPricingModelList = new List<RetailerPricingModel>();
            Mapper.Map<IEnumerable<Pricing>,
            IEnumerable<RetailerPricingModel>>(pricingList, retailPricingModelList);

            return retailPricingModelList;
        }
        public static List<RetailerPricingModel> GetMyFilteredProductsPaging(this IGenericRepository<Pricing> pricingRepository, int selectedCategory,
           int selectedSubCategory, int storeId, int selectedBranchId, int? selectedBrand, int pageNo, int PageSize)
        {
            IPagedList<Pricing> pricePaging = null;
            pricePaging = pricingRepository.Find(x => x.Branch == selectedBranchId && x.Store == storeId && x.ProductDetails.Category == selectedSubCategory
        && (selectedBrand != null ? x.ProductDetails.Manufacturer == selectedBrand : x.ProductDetails.Manufacturer != null)
        , y => y.ProductDetails, z => z.BranchDetails).OrderBy(x =>x.PricingId).ToPagedList<Pricing>(pageNo, PageSize);

            List<RetailerPricingModel> retailPricingModelList = new List<RetailerPricingModel>();
            Mapper.Map<IEnumerable<Pricing>,
            IEnumerable<RetailerPricingModel>>(pricePaging, retailPricingModelList);

            return retailPricingModelList;
        }
        public static List<ProductModel> GetStoreProducts(this IGenericRepository<Pricing> pricingRepository, int selectedCategory,
           int selectedSubCategory, int storeId, int selectedBranchId, int? selectedBrand)
        {
            var pricingList = pricingRepository.Find(x => x.Branch == selectedBranchId && x.Store == storeId && x.ProductDetails.Category == selectedSubCategory
        && (selectedBrand != null ? x.ProductDetails.Manufacturer == selectedBrand : x.ProductDetails.Manufacturer != null)
        , y => y.ProductDetails, z => z.BranchDetails).ToList<Pricing>();

            List<ProductModel> productModelList = new List<ProductModel>();
            foreach (Pricing pricing in pricingList)
            {
                ProductModel item = new ProductModel();
                item.ProductId = pricing.ProductDetails.ProductId;
                item.Name = pricing.ProductDetails.Name;
                item.PictureName = pricing.ProductDetails.PictureName;
                item.Price = pricing.SpecialPrice;
                item.StoresCount = 0;
                productModelList.Add(item);
            }

            return productModelList;
        }
    }
}
                                                                                                                    