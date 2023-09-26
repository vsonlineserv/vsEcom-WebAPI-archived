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
using VSOnline.VSECommerce.Domain.ResultSet;
using VSOnline.VSECommerce.Domain.DTO;
using VSOnline.VSECommerce.Utilities;
using VSOnline.VSECommerce.Persistence.Entity;

namespace VSOnline.VSECommerce.Domain
{
    public class CartRepository
    {        
        public string GetShoppingCartForUserQuery(int userId)
        {
            var query = @"SELECT 
      [ShoppingCartItem].[Id]
      ,[ShoppingCartItem].[BranchId]
      ,[ShoppingCartItem].[CustomerId]
      ,[ShoppingCartItem].[ProductId]
      ,[ShoppingCartItem].[Quantity]
      ,[ShoppingCartItem].[UnitPrice]
      ,[ShoppingCartItem].[ShippingCharges] AdditionalShippingCharge
      ,SelectedSize
	  ,Product.Name
	  ,Product.PictureName
	  ,Pricing.SpecialPrice
	  ,Pricing.Price
      ,Pricing.DeliveryTime
	  ,SellerBranch.BranchId
	  ,SellerBranch.BranchName Branch
         FROM [dbo].[ShoppingCartItem] 
    INNER JOIN Pricing ON Pricing.Product = ShoppingCartItem.ProductId 
        AND Pricing.Branch = ShoppingCartItem.BranchId
        INNER JOIN Product ON [ShoppingCartItem].ProductId = Product.ProductId
        INNER JOIN SellerBranch ON SellerBranch.BranchId = Pricing.Branch Where CustomerId = {UserId}".FormatWith(new { UserId = userId });
            return query;
        }
 
    }
}
