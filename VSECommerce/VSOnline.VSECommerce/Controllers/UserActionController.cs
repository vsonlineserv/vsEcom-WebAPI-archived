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
using VSOnline.VSECommerce.Domain;
using VSOnline.VSECommerce.Domain.DTO;
using System.Security.Claims;
using VSOnline.VSECommerce.Utilities;
using VSOnline.VSECommerce.Domain.ResultSet;
using VSOnline.VSECommerce.Persistence.Entity;
using VSOnline.VSECommerce.Domain.Helper;


namespace VSOnline.VSECommerce.Web.Controllers
{
   [Authorize(Roles = "Administrators , StoreAdmin , StoreModerator, Registered, SalesSupport, Support, Marketing")]
    public class UserActionController : ApiController
    {
         IUnitOfWork _unitOfWork = null;

         public UserActionController(IUnitOfWork unitOfWork)
         {
             _unitOfWork = unitOfWork;
         }

         [HttpGet]
         [ActionName("GetUserWishlist")]
         public List<UserWishlistDTO> GetUserWishlist(string userName)
         {
             UserService userService = new UserService();
             var currentUser = ClaimsPrincipal.Current.Identity.Name;
             if (currentUser == userName)
             {
                 var user = userService.GetUser(currentUser);

                 var userList = _unitOfWork.UserWishlistRepository.Find(x => x.User == user.UserId).ToList<UserWishlist>();
                 return UserActionHelper.GetUserWishlistModelFromUserWishlist(userList);
             }
             return new List<UserWishlistDTO>();
         }

         [HttpGet]
         [ActionName("GetUserWishlistCount")]
         public int GetUserWishlistCount(string userName)
         {
             UserService userService = new UserService();
             var currentUser = ClaimsPrincipal.Current.Identity.Name;
             if (currentUser == userName)
             {
                 var user = userService.GetUser(currentUser);
                 return _unitOfWork.UserWishlistRepository.Find(x => x.User == user.UserId).ToList<UserWishlist>().Count;                  
             }
             return 0;
         }

         [HttpGet]
         [ActionName("AddUserWishList")]
         public List<UserWishlistDTO> AddUserWishList(string userName, int productId)
         {
              UserService userService = new UserService();
             var currentUser = ClaimsPrincipal.Current.Identity.Name;
             if (currentUser == userName)
             {
                 var user = userService.GetUser(currentUser);
                 var userWishList = _unitOfWork.UserWishlistRepository.AddUserWishList(user.UserId, productId);
                 _unitOfWork.Commit();
                 return GetUserWishlist(userName);
             }
             else return new List<UserWishlistDTO>();
         }

         [HttpGet]
         [ActionName("RemoveUserWishList")]
         public List<UserWishlistDTO> RemoveUserWishList(string userName, int productId)
         {
             UserService userService = new UserService();
             var currentUser = ClaimsPrincipal.Current.Identity.Name;
             if (currentUser == userName)
             {
                 var user = userService.GetUser(currentUser);
                 var userWishList = _unitOfWork.UserWishlistRepository.RemoveUserWishList(user.UserId, productId); 
                 _unitOfWork.Commit();
                 return GetUserWishlist(userName);
             }
             else 
                 return new List<UserWishlistDTO>();
                       
         }
    }
}