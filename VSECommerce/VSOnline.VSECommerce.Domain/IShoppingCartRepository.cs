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
using System.Linq.Expressions;
using VSOnline.VSECommerce.Persistence.Entity;
using VSOnline.VSECommerce.Domain.DTO;
using VSOnline.VSECommerce.Domain.ResultSet;

namespace VSOnline.VSECommerce.Domain
{
    public interface IShoppingCartRepository : IDisposable
    {
        IEnumerable<ShoppingCartItem> Find(Expression<Func<ShoppingCartItem, bool>> predicate);
        void Add(ShoppingCartItem entity);
        void Delete(ShoppingCartItem entity);
        bool Add(ShoppingCartDTO cartItem);
        bool Add(List<ShoppingCartResultSet> cartItemList, int customerId);
        bool AddBuyerAddress(BuyerAddressDTO address, int customerId);
        BuyerAddressResult GetBuyerAddressForUser(int customerId);
        bool UpdateAndSave(ShoppingCartItem cartItem);

        int CreateOrder(int userId, List<ShoppingCartResultSet> shoppingCartItemList, OrderDTO orderDTO, Utilities.Enums.PaymentOption paymentOption,
            Utilities.Enums.DeliveryOption deliveryOption, string couponCode);
        OrderDTO GetOrder(int userId, int orderId);

        OrderDTO GetOrder(int orderId);

        OrderProduct GetOrderProduct(int orderId);
        OrderProduct GetOrderProductUsingTransaction(string txnId);


        List<OrderItemResultSet> GetOrderedItemlist(int orderId);

        List<OrderItemResultSet> GetOrderedItemlist(int orderId, int branchId);

        BuyerAddressResult GetAddress(int addressId);

        DiscountResult GetDiscountDetails(string p);

        bool UpdateAndSaveTransactionId(int orderid, OrderDTO orderDTO);

        bool UpdateOrderProductItemStatus(int orderId, int p);
    }
}
