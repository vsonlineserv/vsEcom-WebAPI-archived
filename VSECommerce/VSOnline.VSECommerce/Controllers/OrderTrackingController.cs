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
using System.Web.Http;
using VSOnline.VSECommerce.Domain;
using VSOnline.VSECommerce.Domain.DTO;
using System.Security.Claims;
using VSOnline.VSECommerce.Utilities;
using VSOnline.VSECommerce.Persistence.Entity;
using VSOnline.VSECommerce.Domain.Helper;
using VSOnline.VSECommerce.Core;

namespace VSOnline.VSECommerce.Web.Controllers
{
    public class OrderTrackingController : APIBaseController
    {
        IUnitOfWork _unitOfWork = null;
        IShoppingCartRepository _shoppingCartRepository;

        public OrderTrackingController(IUnitOfWork unitOfWork, IShoppingCartRepository shoppingCartRepository)
        {
            _unitOfWork = unitOfWork;
            _shoppingCartRepository = shoppingCartRepository;
        }
        [HttpGet]
        [ActionName("GetTrackingOrders")]
        public List<OrderTrackingResultSet> GetTrackingOrders()
        {
            if (!string.IsNullOrEmpty(ClaimsPrincipal.Current.Identity.Name))
            {
                var query = TrackingOrderHelper.GetTrackingOrder(ClaimsPrincipal.Current.Identity.Name);
                var result = _unitOfWork.ExecuteQuery<OrderTrackingResultSet>(query);
                foreach (var orderresult in result)
                {
                    orderresult.OrderStatus = OrderHelper.GetEnumDescription((Enums.OrderStatus)orderresult.OrderStatusId);
                    orderresult.PaymentStatus = OrderHelper.GetEnumDescription((Enums.OrderStatus)orderresult.PaymentStatusId);
                    orderresult.PaymentMethodString = OrderHelper.GetEnumDescription((Enums.PaymentOption)orderresult.PaymentMethod);
                }
                return result;
            }
            return null;
        }
        [HttpGet]
        [ActionName("GetOrdersList")]
        public List<OrderTrackingResultSet> GetOrdersList()
        {
            if (!string.IsNullOrEmpty(ClaimsPrincipal.Current.Identity.Name))
            {
                var query = TrackingOrderHelper.GetOrdersList(ClaimsPrincipal.Current.Identity.Name);
                var result = _unitOfWork.ExecuteQuery<OrderTrackingResultSet>(query);
                return result;
            }
            return null;
        }
        [HttpGet]
        [ActionName("GetProductList")]
        public List<OrderTrackingResultSet> GetProductList(int OrderId)
        {
            var query = TrackingOrderHelper.GetProductList(OrderId);
            var result = _unitOfWork.ExecuteQuery<OrderTrackingResultSet>(query);
            foreach (var orderresult in result)
            {
                if (orderresult.OrderItemStatusId != null)
                {
                    orderresult.OrderItemStatus = OrderHelper.GetEnumDescription((Enums.OrderStatus)orderresult.OrderItemStatusId);

                }
            }
            return result;
        }
        [HttpGet]
        [ActionName("CancelOrders")]
        public bool CancelOrders(int OrderId)
        {
            try
            {
                OrderProduct cancelOrders = _unitOfWork.OrderRepository.Find(x => x.Id == OrderId, y => y.OrderProductItem).FirstOrDefault<OrderProduct>();
                var shippingAddress = _shoppingCartRepository.GetAddress(cancelOrders.ShippingAddressId);


                UserService userService = new UserService();
                var user = userService.GetUser(cancelOrders.CustomerId);

                if (cancelOrders.CustomerId == CurrentUserId())
                {
                    var orderStatusId = (int)((Enums.OrderStatus)Enum.Parse(typeof(Enums.OrderStatus), "Cancelled"));


                    if (cancelOrders.OrderStatusId < 10)
                    {
                        foreach (var orderItem in cancelOrders.OrderProductItem)
                        {
                            if (orderItem.OrderItemStatus < 10)
                            {
                                orderItem.OrderItemStatus = orderStatusId;
                                orderItem.OrderCancel = true;
                            }
                        }
                        cancelOrders.OrderStatusId = orderStatusId;
                        cancelOrders.OrderCancel = true;
                        _unitOfWork.UpdateAndSave(cancelOrders);

                        try
                        {
                            VSOnline.VSECommerce.Domain.Helper.MailHelper.SendOrderCancellationMail(user.Email, OrderId.ToString());
                            VSOnline.VSECommerce.Domain.Helper.MessageHelper.SendOrderCancellationSMS(OrderId, shippingAddress.PhoneNumber);

                        }
                        catch
                        {

                        }

                        return true;
                    }
                }
            }
            catch
            {
                return false;
            }
            return false;

        }
        [HttpGet]
        [ActionName("SearchOrders")]
        public List<OrderTrackingResultSet> SearchOrders(string OrderId)
        {
            var query = TrackingOrderHelper.SearchOrders(OrderId);
            var result = _unitOfWork.ExecuteQuery<OrderTrackingResultSet>(query);
            foreach (var orderresult in result)
            {
                orderresult.OrderStatus = OrderHelper.GetEnumDescription((Enums.OrderStatus)orderresult.OrderStatusId);
                orderresult.PaymentStatus = OrderHelper.GetEnumDescription((Enums.PaymentOption)orderresult.PaymentMethod);
            }
            return result;
        }

        private int CurrentUserId()
        {
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            var orderId = 0;
            if (currentUser != null)
            {
                UserService userService = new UserService();
                var user = userService.GetUser(currentUser);
                if (user != null && !string.IsNullOrEmpty(user.Username.ToLower()))
                {
                    return user.UserId;
                }
            }

            return 0; ;
        }

    }
}
