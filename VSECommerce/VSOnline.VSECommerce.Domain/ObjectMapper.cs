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
using AutoMapper;
using VSOnline.VSECommerce.Domain.DTO;
using VSOnline.VSECommerce.Persistence.Entity;
using VSOnline.VSECommerce.Domain.ResultSet;

namespace VSOnline.VSECommerce.Domain
{
    public class ObjectMapper : Profile
    {
        public ObjectMapper()
        {
            CreateMap<CategoryDTO, Category>();
            CreateMap<Category, CategoryDTO>();
            CreateMap<Product, ProductDTO>().ForSourceMember(x => x.ManufacturerDetails, t => t.Ignore());
            CreateMap<ProductDTO, Product>().
               ForMember(x => x.ManufacturerDetails, t => t.Ignore())
               .ForMember(x => x.ProductDescriptionHtml, t => t.Ignore())
               .ForMember(x => x.CategoryDetails, t => t.Ignore())
               .ForMember(x => x.PricingCollection, t => t.Ignore())
               .ForMember(x => x.Size1, t => t.Ignore())
               .ForMember(x => x.Size2, t => t.Ignore())
               .ForMember(x => x.Size3, t => t.Ignore())
               .ForMember(x => x.Size4, t => t.Ignore())
               .ForMember(x => x.Size5, t => t.Ignore())
               .ForMember(x => x.Size6, t => t.Ignore());

            CreateMap<Product, ProductModel>()
             .ForSourceMember(x => x.ManufacturerDetails, t => t.Ignore())
             .ForSourceMember(x => x.PricingCollection, t => t.Ignore())
             .ForSourceMember(x => x.CategoryDetails, t => t.Ignore())
             .ForSourceMember(x => x.ProductDescriptionHtml, t => t.Ignore())
             .ForMember(x => x.FlagWishlist, t => t.Ignore())
             .ForMember(x => x.Price, o => o.MapFrom(x => x.PricingCollection.Min(y => y.SpecialPrice)))
             .ForMember(x => x.StoresCount, o => o.MapFrom(x => x.PricingCollection.Count()));

            CreateMap<Product, ProductModelForBranchCatalog>()
         .ForSourceMember(x => x.ManufacturerDetails, t => t.Ignore())
         .ForSourceMember(x => x.PricingCollection, t => t.Ignore())
         .ForSourceMember(x => x.CategoryDetails, t => t.Ignore())
         .ForSourceMember(x => x.ProductDescriptionHtml, t => t.Ignore())
         .ForMember(x => x.FlagExist, t => t.Ignore())
         .ForMember(x => x.FlagWishlist, t => t.Ignore())
         .ForMember(x => x.Price, o => o.MapFrom(x => x.PricingCollection.Min(y => y.SpecialPrice)))
         .ForMember(x => x.BranchList, o => o.MapFrom(x => x.PricingCollection.Select(z => z.Branch)))
         .ForMember(x => x.StoresCount, o => o.MapFrom(x => x.PricingCollection.Count()));

            CreateMap<Product, ProductModelWithCategory>()
              // .ForSourceMember(x => x.ManufacturerDetails, t => t.Ignore())
              .ForSourceMember(x => x.PricingCollection, t => t.Ignore())
              .ForSourceMember(x => x.CategoryDetails, t => t.Ignore())
              .ForMember(x => x.ParentCategoryName, t => t.Ignore())
              .ForMember(x => x.TotalCount, t => t.Ignore())
              .ForMember(x => x.FlagWishlist, t => t.Ignore())
              .ForMember(x => x.SubCategoryId, o => o.MapFrom(x => x.CategoryDetails.CategoryId))
              .ForMember(x => x.SubCategoryName, o => o.MapFrom(x => x.CategoryDetails.Name))
              .ForMember(x => x.CategoryId, o => o.MapFrom(x => x.CategoryDetails.ParentCategoryId))
              .ForMember(x => x.Price, o => o.MapFrom(x => x.PricingCollection.Max(y => y.Price)))
              .ForMember(x => x.SpecialPrice, o => o.MapFrom(x => x.PricingCollection.Min(y => y.SpecialPrice)))
              .ForMember(x => x.StoresCount, o => o.MapFrom(x => x.PricingCollection.Count()));

            CreateMap<Product, ProductDetailModel>()
                .ForSourceMember(x => x.ManufacturerDetails, t => t.Ignore())
                .ForMember(x => x.BrandName, t => t.Ignore())
                .ForMember(x => x.AndroidInformation1, t => t.Ignore())
                .ForMember(x => x.CategoryName, t => t.Ignore())
                .ForMember(x => x.CategoryGroupTag, t => t.Ignore())
                .ForMember(x => x.RelatedProductList, t => t.Ignore())
                .ForMember(x => x.ParentCategoryId, t => t.Ignore())
                .ForMember(x => x.ParentCategoryName, t => t.Ignore())
                .ForMember(x => x.StorePricingModel, t => t.Ignore());

            CreateMap<UserDTO, User>()
                .ForMember(x => x.PasswordFormatId, t => t.Ignore())
             .ForMember(x => x.Password, t => t.Ignore())
             .ForMember(x => x.PasswordSalt, t => t.Ignore())
             .ForMember(x => x.UserId, t => t.Ignore())
             .ForMember(x => x.UserGuid, t => t.Ignore())
             .ForMember(x => x.IsSupport, t => t.Ignore())
             .ForMember(x => x.IsSales, t => t.Ignore())
             .ForMember(x => x.IsMarketing, t => t.Ignore())
             .ForMember(x => x.IsSuperAdmin, t => t.Ignore())
             .ForMember(x => x.IsAdmin, t => t.Ignore());

            CreateMap<Pricing, RetailerPricingModel>()
                .ForMember(x => x.ProductName, opt => opt.MapFrom(src => src.ProductDetails.Name))
                .ForMember(x => x.PictureName, opt => opt.MapFrom(src => src.ProductDetails.PictureName))
                .ForMember(x => x.BranchName, opt => opt.MapFrom(src => src.BranchDetails.BranchName))
                .ForMember(x => x.ProductId, opt => opt.MapFrom(src => src.Product))
                .ForMember(x => x.BranchId, opt => opt.MapFrom(src => src.Branch))
                .ForMember(x => x.PriceStartTime, opt => opt.MapFrom(src => src.SpecialPriceStartDateTimeUtc))
                .ForMember(x => x.PriceEndTime, opt => opt.MapFrom(src => src.SpecialPriceEndDateTimeUtc));

            CreateMap<SellerBranch, RetailerLocationMapDTO>()
                .ForMember(x => x.StoreId, opt => opt.MapFrom(src => src.SellerMap.StoreId))
                .ForMember(x => x.StoreName, opt => opt.MapFrom(src => src.SellerMap.StoreName));

            CreateMap<UserWishlist, UserWishlistDTO>()
                  .ForSourceMember(x => x.ProductDetails, t => t.Ignore())
                .ForSourceMember(x => x.UserDetails, t => t.Ignore());
            CreateMap<UserWishlistDTO, UserWishlist>()
                .ForMember(x => x.ProductDetails, t => t.Ignore())
                .ForMember(x => x.UserDetails, t => t.Ignore());

            CreateMap<Manufacturer, BrandFilterDTO>()
              .ForMember(x => x.Id, opt => opt.MapFrom(src => src.ManufacturerId))
                .ForMember(x => x.BrandName, opt => opt.MapFrom(src => src.Name));

            CreateMap<OrderDTO, OrderProduct>()
                .ForMember(x => x.OrderProductItem, t => t.Ignore())
                .ForMember(x => x.OrderCancel, t => t.Ignore())
                .ForSourceMember(x => x.OrderStatus, t => t.Ignore());

            CreateMap<OrderProduct, OrderDTO>()
                .ForSourceMember(x => x.OrderProductItem, t => t.Ignore())
                 .ForMember(x => x.OrderStatus, t => t.Ignore());

            CreateMap<OrderProductItem, OrderItemResultSet>()
                .ForMember(x => x.Name, opt => opt.MapFrom(src => src.ProductMap.Name))
                .ForMember(x => x.StoreId, opt => opt.MapFrom(src => src.BranchId))
                .ForMember(x => x.BranchId, opt => opt.MapFrom(src => src.BranchId))
                .ForMember(x => x.Branch, opt => opt.MapFrom(src => src.SellerBranchMap.BranchName))
                .ForMember(x => x.Quantity, opt => opt.MapFrom(src => src.Quantity))
                .ForMember(x => x.UnitPrice, opt => opt.MapFrom(src => src.UnitPriceInclTax))
                .ForMember(x => x.SpecialPrice, opt => opt.MapFrom(src => src.UnitPriceInclTax))
                .ForMember(x => x.PictureName, opt => opt.MapFrom(src => src.ProductMap.PictureName))
                 .ForMember(x => x.Price, opt => opt.MapFrom(src => src.PriceInclTax))
                       .ForMember(x => x.CustomerId, t => t.Ignore());

            CreateMap<ProductSpecification, ProductSpecificationResultSet>()
                .ForSourceMember(x => x.DisplayOrder, t => t.Ignore());

            CreateMap<ProductFilterValue, ProductFilterValueResultSet>()
             .ForMember(x => x.CategoryMasterFilterId, opt => opt.MapFrom(src => src.CategoryMasterFilter));

            Mapper.AssertConfigurationIsValid();
        }
    }
}
