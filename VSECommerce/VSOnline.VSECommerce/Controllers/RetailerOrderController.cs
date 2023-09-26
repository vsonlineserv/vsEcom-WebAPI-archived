////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce 
///////////////////////////////////////////////////////////////////////////////////////////
using System;using System.Collections.Generic;
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
using System.Reflection;
using System.EnterpriseServices;


namespace VSOnline.VSECommerce.Web.Controllers
{
     [Authorize(Roles = "Administrators , StoreAdmin , StoreModerator")]
    public class RetailerOrderController : ApiController
    { 
         IUnitOfWork _unitOfWork = null;
        IShoppingCartRepository _shoppingCartRepository;

        public RetailerOrderController(IUnitOfWork unitOfWork, IShoppingCartRepository shoppingCartRepository)
        {
            _unitOfWork = unitOfWork;
            _shoppingCartRepository = shoppingCartRepository;
        }
        [HttpGet]
        [ActionName("GetPendingOrderHistory")]
        public List<OrderResultSet> GetPendingOrderHistory(int branchId, int PageSize, int PageNo)
        {
            var query = OrderHelper.getOrderDetails(branchId, PageSize, PageNo);
            var result= _unitOfWork.ExecuteQuery<OrderResultSet>(query);
            foreach (var orderresult in result)
            {
                
                try
                {
                    orderresult.OrderItemStatus = OrderHelper.GetEnumDescription((Enums.OrderStatus)orderresult.OrderItemStatusId);
                    orderresult.PaymentStatus = OrderHelper.GetEnumDescription((Enums.OrderStatus)orderresult.PaymentStatusId);                    
                    orderresult.PaymentMethodString = OrderHelper.GetEnumDescription((Enums.PaymentOption)orderresult.PaymentMethod);
                }
                catch
                {

                }

            }
            return result;                     
        }
        
        [HttpGet]
        [ActionName("GetTotalOrders")]
        public List<TotalOrdersDTO> GetTotalOrders(int branchId)
        {
            var query = OrderHelper.GetTotalOrders(branchId);
            var result = _unitOfWork.ExecuteQuery<TotalOrdersDTO>(query);   
            return result;
        }

        [HttpGet]
        [ActionName("GetOrderSummaryByCategory")]
        public List<CategorySummaryOrdersDTO> GetOrderSummaryByCategory(int branchId)
        {
            var query = OrderHelper.GetOrderSummaryByCategoryQuery(branchId);
            var result = _unitOfWork.ExecuteQuery<CategorySummaryOrdersDTO>(query);
            return result;
        }

        [HttpGet]
        [ActionName("GetOrderSummaryByProduct")]
        public List<ProductSummaryOrdersDTO> GetOrderSummaryByProduct(int branchId)
        {
            var query = OrderHelper.GetOrderSummaryByProductQuery(branchId);
            var result = _unitOfWork.ExecuteQuery<ProductSummaryOrdersDTO>(query);
            return result;
        }

        [HttpGet]
        [ActionName("GetOrderCountSplitByStatus")]
        public List<StatusSummaryOrdersDTO> GetOrderCountSplitByStatus(int branchId)
        {
            var query = OrderHelper.GetOrderCountSplitByStatusQuery(branchId);
            var result = _unitOfWork.ExecuteQuery<StatusSummaryOrdersDTO>(query);
            foreach (var orderresult in result)
            {
                orderresult.OrderStatus = OrderHelper.GetEnumDescription((Enums.OrderStatus)orderresult.OrderStatusId);
                orderresult.PaymentStatus = OrderHelper.GetEnumDescription((Enums.PaymentStatus)orderresult.PaymentStatusId);
                orderresult.PaymentMethodString = OrderHelper.GetEnumDescription((Enums.PaymentOption)orderresult.PaymentMethod);
            }

            return result;
        }

        [HttpGet]
        [ActionName("GetLast6MonthsSalesChart")]
        public List<MOMSalesChartResultSet> GetLast6MonthsSalesChart(int branchId)
        {
            var query = OrderHelper.GetLast6MonthsSalesChartQuery(branchId);
            var result = _unitOfWork.ExecuteQuery<MOMSalesChartResultSet>(query);
            return result;
        }

        [HttpGet]
        [ActionName("GetLast7DaysSalesChart")]
        public List<MOMSalesChartResultSet> GetLast7DaysSalesChart(int branchId)
        {
            var query = OrderHelper.GetLast7DaysSalesChartQuery(branchId);
            var result = _unitOfWork.ExecuteQuery<MOMSalesChartResultSet>(query);
            return result;
        }

        [HttpGet]
        [ActionName("GetBranchProductSummary")]
        public List<ProductSummaryDashboardResultSet> GetBranchProductSummary(int branchId)
        {
            var query = OrderHelper.GetBranchProductSummaryQuery(branchId);
            var result = _unitOfWork.ExecuteQuery<ProductSummaryDashboardResultSet>(query);
            return result;
        }

        [HttpGet]
        [ActionName("GetBranchEnquirySummary")]
        public List<EnquirySummaryDashboardResultSet> GetBranchEnquirySummary(int branchId)
        {
            var query = OrderHelper.GetBranchEnquirySummaryQuery(branchId);
            var result = _unitOfWork.ExecuteQuery<EnquirySummaryDashboardResultSet>(query);
            return result;
        }

          [HttpGet]
          [ActionName("GetOrdersSearch")] 
        public List<OrderResultSet>GetOrdersSearch(int branchId, string order, int Status)
        {
            var query = OrderHelper.getSearchOrders(branchId, order, Status);
            var result = _unitOfWork.ExecuteQuery<OrderResultSet>(query);
            foreach(var orderresult in result)
            {

                orderresult.OrderItemStatus = OrderHelper.GetEnumDescription((Enums.OrderStatus)orderresult.OrderItemStatusId);
                orderresult.PaymentStatus = OrderHelper.GetEnumDescription((Enums.PaymentStatus)orderresult.PaymentStatusId);
                orderresult.PaymentMethodString = OrderHelper.GetEnumDescription((Enums.PaymentOption)orderresult.PaymentMethod);
            }  
            return result;                     
        }
          [HttpGet]
          [ActionName("GetOrdersSummary")]
          public List< OrderSummaryResultSet> GetOrdersSummary(int branchId)
          {
              var query = OrderHelper.getOrdersSummary(branchId);
              var result = _unitOfWork.ExecuteQuery<OrderSummaryResultSet>(query);
              return result;
          }

          [HttpGet]
          [ActionName("PrintOrderDetails")]
          public OrderConfirmationDTO PrintOrderDetails(int orderId)
          {

              var currentUser = ClaimsPrincipal.Current.Identity.Name;
              if (currentUser != null)
              {
                  UserService userService = new UserService();
                  var user = userService.GetUser(currentUser);
                  OrderConfirmationDTO orderDetail = new OrderConfirmationDTO();

                  bool vBuyHighlevelusers = userService.VBuyHighLevelUsers(user.Username);
                  var orderDTOObj = _shoppingCartRepository.GetOrder(orderId);
                  var retailerInfo = _unitOfWork.SellerRepository.GetRetailerInfo(currentUser);
                  if(vBuyHighlevelusers)
                  {                      
                      orderDetail.OrderDetails = orderDTOObj;
                      orderDetail.OrderItemDetails = _shoppingCartRepository.GetOrderedItemlist(orderId);
                      orderDetail.ShippingAddress = _shoppingCartRepository.GetAddress(orderDTOObj.ShippingAddressId);
                      User buyer = new UserService().GetUser(orderDTOObj.CustomerId);
                      orderDetail.CustomerName = buyer.FirstName;
                      orderDetail.CustomerEmail = buyer.Email; 
                      //send order confirmation email 
                  }
                  else
                  {
                     
                      if (retailerInfo.Branches != null && retailerInfo.Branches.Count > 0)
                      {
                          var branchId = retailerInfo.Branches[0].BranchId;

                          orderDetail.OrderDetails = orderDTOObj;
                          orderDetail.OrderItemDetails = _shoppingCartRepository.GetOrderedItemlist(orderId, branchId);
                          orderDetail.ShippingAddress = _shoppingCartRepository.GetAddress(orderDTOObj.ShippingAddressId);

                          User buyer = new UserService().GetUser(orderDTOObj.CustomerId);
                          orderDetail.CustomerName = buyer.FirstName;
                          orderDetail.CustomerEmail = buyer.Email;
                      }
                  }
                  if (vBuyHighlevelusers || (retailerInfo.Branches != null && retailerInfo.Branches.Count > 0))
                  {
                      decimal subOrderTotal = 0;
                      decimal subShippingCharges = 0;
                      foreach (OrderItemResultSet result in orderDetail.OrderItemDetails)
                      {
                          subOrderTotal = subOrderTotal + result.Price;
                          subShippingCharges = subShippingCharges + result.ShippingCharges;
                      }
                      orderDetail.OrderDetails.OrderSubtotalInclTax = subOrderTotal;
                      orderDetail.OrderDetails.OrderTotal = orderDetail.OrderDetails.OrderSubtotalInclTax + subShippingCharges;
                  }

                  orderDetail.OrderDetails.OrderStatus = OrderHelper.GetEnumDescription((Enums.OrderStatus)orderDetail.OrderDetails.OrderStatusId);
           
                  return orderDetail;
              }
              return null;
          }


         public bool UpdateOrderStatus(OrderStatusUpdateModel orderStatusUpdate)
          {
          
              var order =_unitOfWork.OrderRepository.Find(x => x.Id == orderStatusUpdate.orderId, y=>y.OrderProductItem).FirstOrDefault();
              OrderProductItem subOrder = order.OrderProductItem.Where(x => x.Id == orderStatusUpdate.subOrderId).FirstOrDefault();

              bool flagChangeOrderStatus = true;
              if (subOrder != null)
              {
                  subOrder.OrderItemStatus = orderStatusUpdate.statusId;
                  foreach(var item in order.OrderProductItem)
                  {
                      if(subOrder.Id != item.Id)
                      {
                          if(item.OrderItemStatus < orderStatusUpdate.statusId)
                          {
                              flagChangeOrderStatus = false;
                              break;
                          }
                      }
                  }
                  if(flagChangeOrderStatus)
                  {
                      order.OrderStatusId = orderStatusUpdate.statusId;
                  }
                  _unitOfWork.UpdateAndSave(order);
                  _unitOfWork.Commit();
              }
              return true;
          }

     
          [HttpGet]
          [ActionName("GetOrderStatus")]
          public IHttpActionResult GetOrderStatus()
          {
              var orderStatus = new List<object>();

              foreach (var item in Enum.GetValues(typeof(Enums.OrderStatus)))
              {
                  
                  orderStatus.Add(new
                  {
                      id = (int)item,
                      name = item.ToString()
                  });
              }

              return Ok(orderStatus);
          }

          [HttpGet]
          [ActionName("GetPaymentStatus")]
          public IHttpActionResult GetPaymentStatus()
          {
              var orderStatus = new List<object>();

              foreach (var item in Enum.GetValues(typeof(Enums.PaymentStatus)))
              {

                  orderStatus.Add(new
                  {
                      id = (int)item,
                      name = item.ToString()
                  });
              }

              return Ok(orderStatus);
          }


           [HttpGet]
           [ActionName("GetPaymentOption")]
          public IHttpActionResult GetPaymentOption()
          {
              var PaymentStatus = new List<object>();

              foreach (var item in Enum.GetValues(typeof(Enums.PaymentOption)))
              {

                  PaymentStatus.Add(new
                  {
                      id = (int)item,
                      name = item.ToString()
                  });
              }

              return Ok(PaymentStatus);
          }
        


    }

    public class OrderStatusUpdateModel{
     public int subOrderId {get; set;} 
        public int orderId {get; set;}  
        public int statusId {get; set;}
    }
}
