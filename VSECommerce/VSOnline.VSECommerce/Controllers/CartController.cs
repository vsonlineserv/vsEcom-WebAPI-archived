////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce 
///////////////////////////////////////////////////////////////////////////////////////////
///
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using VSOnline.VSECommerce.Domain.ResultSet;
using VSOnline.VSECommerce.Domain.DTO;
using VSOnline.VSECommerce.Domain;
using System.Security.Claims;
using VSOnline.VSECommerce.Persistence.Entity;
using VSOnline.VSECommerce.Core;
using System;
using System.Net.Http;
using System.Configuration;
using System.Net.Http.Headers;
using VSOnline.VSECommerce.Models;
using Newtonsoft.Json;

namespace VSOnline.VSECommerce.Web.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    public class CartController : APIBaseController
    {
        IUnitOfWork _unitOfWork = null;
        IShoppingCartRepository _shoppingCartRepository;

        public CartController(IUnitOfWork unitOfWork, IShoppingCartRepository shoppingCartRepository)
        {
            _unitOfWork = unitOfWork;
            _shoppingCartRepository = shoppingCartRepository;
        }

        [HttpPost]
        [ActionName("AddShoppingCartItem")]
        public List<ShoppingCartResultSet> AddShoppingCartItem(ShoppingCartDTO cartItem)
        {
            CartRepository cartRepository = new CartRepository();
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            UserService userService = new UserService();

            if (currentUser != null && currentUser == cartItem.UserName)
            {
                var user = userService.GetUser(currentUser);
                cartItem.CustomerId = user.UserId;
                _shoppingCartRepository.Add(cartItem);
                return GetShoppingCartItemForUser(user.UserId);
            }
            return null;

        }

        [HttpPost]
        [ActionName("AddShoppingCartItemList")]
        public List<ShoppingCartResultSet> AddShoppingCartItemList(ShoppingCartItemListDTO shoppingCartItemListDTO)
        {
            CartRepository cartRepository = new CartRepository();
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            UserService userService = new UserService();

            if (shoppingCartItemListDTO != null && shoppingCartItemListDTO.shoppingCartDTOList != null && shoppingCartItemListDTO.shoppingCartDTOList.Count > 0
                && currentUser != null)
            {
                var user = userService.GetUser(currentUser);

                _shoppingCartRepository.Add(shoppingCartItemListDTO.shoppingCartDTOList, user.UserId);
                return GetShoppingCartItemForUser(user.UserId);
            }
            return null;

        }

        [HttpPost]
        [ActionName("GetCartDiscount")]
        public DiscountResult GetCartDiscount(ShoppingCartItemListDTO shoppingCartItemListDTO)
        {
            CartRepository cartRepository = new CartRepository();
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            UserService userService = new UserService();

            if (shoppingCartItemListDTO != null && shoppingCartItemListDTO.shoppingCartDTOList != null && shoppingCartItemListDTO.shoppingCartDTOList.Count > 0
                && currentUser != null)
            {
                var user = userService.GetUser(currentUser);
                var shoppingCartItemList = GetShoppingCartItemForUser(user.UserId);

                //Get Discount details. 
                DiscountResult discountDetails = _shoppingCartRepository.GetDiscountDetails(shoppingCartItemListDTO.couponCode);
            }
            return null;

        }


        [HttpPost]
        [ActionName("UpdateCartItemQuantity")]
        public List<ShoppingCartResultSet> UpdateCartItemQuantity(ShoppingCartDTO cartItem)
        {
            CartRepository cartRepository = new CartRepository();
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            UserService userService = new UserService();

            if (!string.IsNullOrEmpty(currentUser) && cartItem != null && currentUser == cartItem.UserName)
            {
                var user = userService.GetUser(currentUser);
                cartItem.CustomerId = user.UserId;
                var updateCartItem = _shoppingCartRepository.Find(x => x.ProductId == cartItem.ProductId && x.CustomerId == user.UserId).FirstOrDefault<ShoppingCartItem>();
                if (updateCartItem != null)
                {
                    updateCartItem.Quantity = cartItem.Quantity;
                    _shoppingCartRepository.UpdateAndSave(updateCartItem);
                    return GetShoppingCartItemForUser(user.UserId);
                }
            }
            return null;

        }

        [HttpPost]
        [ActionName("RemoveShoppingCartItem")]
        public List<ShoppingCartResultSet> RemoveShoppingCartItem(ShoppingCartDTO cartItem)
        {
            CartRepository cartRepository = new CartRepository();
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            UserService userService = new UserService();

            if (currentUser != null && currentUser == cartItem.UserName)
            {
                var user = userService.GetUser(currentUser);
                cartItem.CustomerId = user.UserId;
                var updateCartItem = _shoppingCartRepository.Find(x => x.ProductId == cartItem.ProductId && x.CustomerId == user.UserId).FirstOrDefault<ShoppingCartItem>();
                _shoppingCartRepository.Delete(updateCartItem);
                return GetShoppingCartItemForUser(user.UserId);
            }
            return null;

        }

        public List<ShoppingCartResultSet> GetShoppingCartItems(string userName)
        {
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            if (currentUser != null && currentUser == userName)
            {
                UserService userService = new UserService();
                var user = userService.GetUser(currentUser);
                return GetShoppingCartItemForUser(user.UserId);
            }
            return null;
        }

        public BuyerAddressResult GetBuyerAddress(string userName)
        {
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            if (currentUser != null && currentUser == userName)
            {
                UserService userService = new UserService();
                var user = userService.GetUser(currentUser);
                return _shoppingCartRepository.GetBuyerAddressForUser(user.UserId);
            }
            return null;
        }

        public int GetReward(string userName)
        {
            int availableReward = 0;
            try
            {
                if (!string.IsNullOrEmpty(userName) && userName != "{}")
                {
                    string uri = "api/Reward/GetRewardDetailsByUsermail?email={0}";
                    HttpResponseMessage response = null;
                    using (var client = new HttpClient())
                    {
                        client.BaseAddress = new Uri(ConfigurationManager.AppSettings["RewardHostName"].ToString());
                        MediaTypeWithQualityHeaderValue contentType = new MediaTypeWithQualityHeaderValue("application/json");
                        client.DefaultRequestHeaders.Accept.Add(contentType);
                        response = client.GetAsync(string.Format(uri, userName)).Result;
                    }

                    if (response.IsSuccessStatusCode)
                    {
                        string result = response.Content.ReadAsStringAsync().Result;
                        RewardDetails rewardDetails = JsonConvert.DeserializeObject<RewardDetails>(result);
                        if (rewardDetails != null)
                        {
                            if (rewardDetails.apiResult.Status == 1)
                            {
                                availableReward = rewardDetails.ValidBalance;
                            }
                            else
                            {
                                //some error
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return availableReward;
        }

        public int GetRewardDiscount(int rewardPoint)
        {
            int DiscountAmount = 0;
            try
            {
                if (rewardPoint != 0)
                {
                    string uri = "api/Reward/GetRewardDiscount?rewardPoint={0}";
                    HttpResponseMessage response = null;
                    using (var client = new HttpClient())
                    {
                        client.BaseAddress = new Uri(ConfigurationManager.AppSettings["RewardHostName"].ToString());
                        MediaTypeWithQualityHeaderValue contentType = new MediaTypeWithQualityHeaderValue("application/json");
                        client.DefaultRequestHeaders.Accept.Add(contentType);
                        response = client.GetAsync(string.Format(uri, rewardPoint)).Result;
                    }

                    if (response.IsSuccessStatusCode)
                    {
                        string result = response.Content.ReadAsStringAsync().Result;
                        RewardDiscount rewardDiscount = JsonConvert.DeserializeObject<RewardDiscount>(result);
                        if (rewardDiscount != null)
                        {
                            if (rewardDiscount.apiResult.Status == 1)
                            {
                                DiscountAmount = rewardDiscount.discountAmount;
                            }
                            else
                            {
                                //error 
                            }
                        }
                        else
                        {
                            //error
                        }
                    }
                    else
                    {
                        //error
                    }
                }
            }
            catch (Exception ex)
            {
                //error
            }
            return DiscountAmount;
        }

        

        private List<ShoppingCartResultSet> GetShoppingCartItemForUser(int userId)
        {
            CartRepository cartRepository = new CartRepository();
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            if (userId > 0)
            {
                var query = cartRepository.GetShoppingCartForUserQuery(userId);
                var cartList = _unitOfWork.ExecuteQuery<ShoppingCartResultSet>(query);
                return cartList;
            }
            return null;
        }

        [HttpPost]
        [ActionName("AddBuyerAddress")]
        public BuyerAddressDTO AddBuyerAddress(BuyerAddressDTO buyerAddressDTO)
        {
            CartRepository cartRepository = new CartRepository();
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            UserService userService = new UserService();

            if (buyerAddressDTO != null && currentUser != null && currentUser == buyerAddressDTO.UserName)
            {
                var user = userService.GetUser(currentUser);

                _shoppingCartRepository.AddBuyerAddress(buyerAddressDTO, user.UserId);
                return buyerAddressDTO;
            }
            return null;

        }

        //protected override void Dispose(bool disposing)
        //{
        //    _shoppingCartRepository.Dispose();
        //    base.Dispose(disposing);
        //}

    }
}
