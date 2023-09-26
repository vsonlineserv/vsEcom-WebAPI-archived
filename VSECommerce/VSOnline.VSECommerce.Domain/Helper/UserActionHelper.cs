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
using VSOnline.VSECommerce.Persistence.Entity;
using VSOnline.VSECommerce.Domain.DTO;
using AutoMapper;

namespace VSOnline.VSECommerce.Domain.Helper
{
    public static class UserActionHelper
    {
        public static List<UserWishlistDTO> GetUserWishlistModelFromUserWishlist(List<UserWishlist> userWishList)
        {
            List<UserWishlistDTO> userWishlistDTO = new List<UserWishlistDTO>();
            Mapper.Map<IEnumerable<UserWishlist>,
            IEnumerable<UserWishlistDTO>>(userWishList, userWishlistDTO);

            return userWishlistDTO;
        }

    }
}
