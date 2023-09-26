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
using VSOnline.VSECommerce.Domain.DTO;
using VSOnline.VSECommerce.Persistence.Entity;
using VSOnline.VSECommerce.Domain.Helper;

namespace VSOnline.VSECommerce.Domain
{
    public static class UserWishlistRepository
    {

        public static List<UserWishlistDTO> AddUserWishList(this IGenericRepository<UserWishlist> userWishlistRepository, int userid, int productId)
        {
            var selectedUserWishList = userWishlistRepository.Find(x => x.User == userid && x.Product == productId).ToList<UserWishlist>();

            if (selectedUserWishList == null || selectedUserWishList.Count == 0)
            {
                UserWishlist wishList = new UserWishlist();
                wishList.User = userid;
                wishList.Product = productId;
                wishList.CreatedOnUtc = DateTime.UtcNow;
                userWishlistRepository.Add(wishList);
            }
            var userList = userWishlistRepository.Find(x => x.User == userid).ToList<UserWishlist>();
            return UserActionHelper.GetUserWishlistModelFromUserWishlist(userList);            
        }

        public static List<UserWishlistDTO> RemoveUserWishList(this IGenericRepository<UserWishlist> userWishlistRepository, int userid, int productId)
        {
            var userWishList = userWishlistRepository.Find(x => x.User == userid && x.Product == productId).ToList<UserWishlist>();

            foreach (UserWishlist product in userWishList)
            {
                userWishlistRepository.Delete(product);
            }
            var userList = userWishlistRepository.Find(x => x.User == userid).ToList<UserWishlist>();
            return UserActionHelper.GetUserWishlistModelFromUserWishlist(userList);            
        }
    }
}
