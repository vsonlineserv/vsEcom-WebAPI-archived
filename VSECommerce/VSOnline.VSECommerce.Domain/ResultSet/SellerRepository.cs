////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce.Domain 
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VSOnline.VSECommerce.Domain.DTO;
using VSOnline.VSECommerce.Utilities;
using VSOnline.VSECommerce.Persistence.Entity;
using VSOnline.VSECommerce.Domain.ResultSet;

namespace VSOnline.VSECommerce.Domain
{
    public static class SellerRepository
    {
        //Todo:later on change this logic.
        //Until we get more records lets open everything.
        public static string GetSearchAreaQuery(this IGenericRepository<Seller> sellerRepository, string city)
        {
            string query = @"SELECT [City] ,[AreaName],[Latitude],[Longitude]
                    FROM [dbo].[Area] WHERE City = '{city}'".FormatWith(new {city});
            return query;
        }

        public static string GetAllSearchAreaQuery(this IGenericRepository<Seller> sellerRepository)
        {
            string query = @"SELECT [City] ,[AreaName],[Latitude],[Longitude]
                    FROM [dbo].[Area]";
            return query;
        }

        public static RetailerInfoResultSet GetRetailerInfo(this IGenericRepository<Seller> sellerRepository, string currentUser)
        {
            var userId = new UserService().GetUserId(currentUser);
            //todo: change to multiple business name for single user later.
            var seller = sellerRepository.Find(x => x.PrimaryContact == userId, y=>y.Branches).FirstOrDefault<Seller>();

            return GetStoreDetails(seller);
          
        }

        public static RetailerInfoResultSet GetStoreInfo(this IGenericRepository<Seller> sellerRepository, Seller seller)
        {
            return GetStoreDetails(seller);            
        }

        private static RetailerInfoResultSet GetStoreDetails(Seller seller)
        {
            var retailerInfo = new RetailerInfoResultSet
            {
                StoreId = seller.StoreId,
                StoreName = seller.StoreName,
                Description = seller.Description
            };

            retailerInfo.Branches = new List<BranchResults>();

            List<SellerBranch> sellerBranches = seller.Branches.ToList<SellerBranch>();
            foreach (SellerBranch branch in sellerBranches)
            {
                BranchResults newBranch = new BranchResults();
                newBranch.BranchId = branch.BranchId;
                newBranch.BranchName = branch.BranchName;
                newBranch.Address1 = branch.Address1;
                newBranch.Address2 = branch.Address2;
                newBranch.City = branch.City;
                newBranch.State = branch.State;
                newBranch.PostalCode = branch.PostalCode;
                newBranch.PhoneNumber = branch.PhoneNumber;
                newBranch.Email = branch.Email;
                newBranch.EnableBuy = branch.EnableBuy;
                newBranch.Latitude = branch.Latitude;
                newBranch.Longitude = branch.Longitude;
                retailerInfo.Branches.Add(newBranch);
            }
            return retailerInfo;
        }
    }
}
