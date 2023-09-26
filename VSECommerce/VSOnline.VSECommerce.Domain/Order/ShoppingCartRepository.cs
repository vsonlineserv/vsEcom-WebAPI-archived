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
using System.Data.Entity;
using VSOnline.VSECommerce.Persistence.Entity;
using VSOnline.VSECommerce.Domain.DTO;
using AutoMapper;

namespace VSOnline.VSECommerce.Domain
{
    public class ShoppingCartRepository:IShoppingCartRepository
    {

        private ShoppingCartDatContext context;        

        public ShoppingCartRepository(ShoppingCartDatContext context)
        {  
            this.context = context;
             
        }
        public IEnumerable<Persistence.Entity.ShoppingCartItem> Find(System.Linq.Expressions.Expression<Func<Persistence.Entity.ShoppingCartItem, bool>> predicate)
        {
            return context.ShoppingCartItems.Where(predicate);
        }

        public void Add(Persistence.Entity.ShoppingCartItem entity)
        {
            context.ShoppingCartItems.Add(entity);
            context.SaveChanges();
        }
 
           public bool Add(ShoppingCartDTO cartItem)
           {
               try
               {
                   //Add only if cart item is anot already available. 
                   var prodExistCount = this.context.ShoppingCartItems.Where(x => x.ProductId == cartItem.ProductId 
                       && x.CustomerId == cartItem.CustomerId &&
                       x.BranchId == cartItem.BranchId).Count();
                   if (prodExistCount == 0)
                   {
                       ShoppingCartItem shoppingCartItem = new ShoppingCartItem();
                       shoppingCartItem.ProductId = cartItem.ProductId;
                       shoppingCartItem.BranchId = cartItem.BranchId;
                       shoppingCartItem.UnitPrice = cartItem.UnitPrice;
                       shoppingCartItem.Quantity = cartItem.Quantity;
                       shoppingCartItem.ShippingCharges = cartItem.AdditionalShippingCharge;
                       shoppingCartItem.SelectedSize = cartItem.SelectedSize;
                       shoppingCartItem.CustomerId = cartItem.CustomerId;
                       shoppingCartItem.CreatedOnUtc = DateTime.UtcNow;
                       shoppingCartItem.UpdatedOnUtc = DateTime.UtcNow;

                       context.ShoppingCartItems.Add(shoppingCartItem);
                       this.context.Entry(shoppingCartItem).State = EntityState.Added;
                       var changes = context.SaveChanges();
                       if (changes > 0)
                       {
                           return true;
                       }
                   }
                   else if(prodExistCount>0)
                   {
                       ShoppingCartItem shoppingCartItem = this.context.ShoppingCartItems.Where(x => x.ProductId == cartItem.ProductId
                       && x.CustomerId == cartItem.CustomerId &&
                       x.BranchId == cartItem.BranchId).FirstOrDefault();

                       shoppingCartItem.Quantity = cartItem.Quantity;
                       shoppingCartItem.ShippingCharges = cartItem.AdditionalShippingCharge;                      
                      
                       shoppingCartItem.UpdatedOnUtc = DateTime.UtcNow;
                       this.context.Entry(shoppingCartItem).State = EntityState.Modified;
                       var changes = context.SaveChanges();
                       if (changes > 0)
                       {
                           return true;
                       }
                   }
               }
               catch
               {
                  
               }
               return false;
           }

           public BuyerAddressResult GetBuyerAddressForUser(int customerId)
           {
               var buyerAddress = context.BuyerAddress.Where(x => x.User == customerId).OrderByDescending(x=>x.UpdatedOnUtc).FirstOrDefault<BuyerAddress>();

               try
               {
                   BuyerAddressResult addressDTO = new BuyerAddressResult();
                   addressDTO.State = buyerAddress.State;
                   addressDTO.City = buyerAddress.City;
                   addressDTO.Address1 = buyerAddress.Address1;
                   addressDTO.Address2 = buyerAddress.Address2;
                   addressDTO.PostalCode = buyerAddress.PostalCode;
                   addressDTO.PhoneNumber = buyerAddress.PhoneNumber;
                   addressDTO.AddressId = buyerAddress.BuyerAddressId;
                   return addressDTO;
               }
               catch
               {
                   
               }
               return null;
           }


           public bool AddBuyerAddress(BuyerAddressDTO addressDTO, int customerId)
           {
               //TODO:Server side validation.
               try
               {
                    BuyerAddress addressObj = new BuyerAddress();
                    addressObj.User  = customerId;
                    addressObj.State  = addressDTO.State;
                    addressObj.City  =addressDTO.City;
                    addressObj.Address1 = addressDTO.Address1;
                    addressObj.Address2  =addressDTO.Address2;
                    addressObj.PostalCode =addressDTO.PostalCode;
                    addressObj.PhoneNumber  =addressDTO.PhoneNumber;
                   addressObj.CreatedOnUtc = DateTime.UtcNow;
                   addressObj.UpdatedOnUtc  = DateTime.UtcNow;
                   this.context.Entry(addressObj).State = EntityState.Added;
                   var changes = context.SaveChanges();
                   if (changes > 0)
                   {
                       return true;
                   }

               }
               catch
               {

               }
               return false;
           }

           public bool Add(List<ShoppingCartResultSet> cartItemList, int customerId)
           {
               try
               {
                  
                   foreach (ShoppingCartResultSet cartresult in cartItemList)
                   {
                        //Add only if cart item is anot already available. 
                       var prodExistCount = this.context.ShoppingCartItems.Where(x => x.ProductId == cartresult.ProductId && x.CustomerId == customerId &&
                           x.BranchId == cartresult.BranchId).Count();

                       if (prodExistCount == 0)
                       {
                           ShoppingCartItem shoppingCartItem = new ShoppingCartItem();
                           shoppingCartItem.ProductId = cartresult.ProductId;
                           shoppingCartItem.BranchId = cartresult.BranchId;
                           shoppingCartItem.UnitPrice = cartresult.SpecialPrice;
                           shoppingCartItem.Quantity = cartresult.Quantity;
                           shoppingCartItem.CustomerId = customerId;
                           shoppingCartItem.ShippingCharges = cartresult.AdditionalShippingCharge;
                           shoppingCartItem.SelectedSize = cartresult.SelectedSize;
                           shoppingCartItem.CreatedOnUtc = DateTime.UtcNow;
                           shoppingCartItem.UpdatedOnUtc = DateTime.UtcNow;
                           context.ShoppingCartItems.Add(shoppingCartItem);
                           this.context.Entry(shoppingCartItem).State = EntityState.Added;
                       }
                       else if (prodExistCount > 0)
                       {
                           ShoppingCartItem shoppingCartItem = this.context.ShoppingCartItems.Where(x => x.ProductId == cartresult.ProductId
                           && x.CustomerId == customerId &&
                           x.BranchId == cartresult.BranchId).FirstOrDefault();

                           shoppingCartItem.Quantity = cartresult.Quantity;
                           shoppingCartItem.ShippingCharges = cartresult.AdditionalShippingCharge;

                           shoppingCartItem.UpdatedOnUtc = DateTime.UtcNow;
                           this.context.Entry(shoppingCartItem).State = EntityState.Modified;
                           
                       }

                   }
                   var changes = context.SaveChanges();
                   if (changes > 0)
                   {
                       return true;
                   }
               }
               catch
               {

               }
               return false;
           }


           public bool UpdateAndSave(ShoppingCartItem entity)
           {
               try
               {
                   context.Entry(entity).State = EntityState.Modified;
                   context.SaveChanges();
                   return true;
               }
               catch
               {

               }
               return false;
           }

        public void Delete(Persistence.Entity.ShoppingCartItem entity)
        {
            if (entity != null)
            {
                context.ShoppingCartItems.Remove(entity);
                context.Entry(entity).State = EntityState.Deleted;
                context.SaveChanges();
            }
        }

        private bool disposed = false;


        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public OrderDTO GetOrder(int userId, int orderId)
        {
            if (orderId > 0)
            {
                var orderProduct = this.context.OrderProducts.Where(x => x.Id == orderId && x.CustomerId == userId).First();
                if (orderProduct != null)
                {
                    OrderDTO orderDTOObj = new OrderDTO();
                    Mapper.Map<OrderProduct, OrderDTO>(orderProduct, orderDTOObj);
                    return orderDTOObj;
                }
            }
            return null;
        }

        public OrderDTO GetOrder(int orderId)
        {
            if (orderId > 0)
            {
                var orderProduct = this.context.OrderProducts.Where(x => x.Id == orderId).First();
                if (orderProduct != null)
                {
                    OrderDTO orderDTOObj = new OrderDTO();
                    Mapper.Map<OrderProduct, OrderDTO>(orderProduct, orderDTOObj);
                    return orderDTOObj;
                }
            }
            return null;
        }

        public OrderProduct GetOrderProduct(int orderId)
        {
            if (orderId > 0)
            {
                var orderProduct = this.context.OrderProducts.Where(x => x.Id == orderId).First();
                return orderProduct;
            }
            return null;
        }

        public OrderProduct GetOrderProductUsingTransaction(string txnId)
        {
            if (!string.IsNullOrEmpty(txnId))
            {
                var orderProduct = this.context.OrderProducts.Where(x => x.TransactionId == txnId).First();
                return orderProduct;
            }
            return null;
        }

        public List<OrderDTO> GetOrderHistory(int userId)
        {
            var orders = this.context.OrderProducts.Where(x => x.CustomerId == userId).OrderByDescending(x=>x.OrderDateUtc)
                .ToList();
            List<OrderDTO> orderDTOlist = new List<OrderDTO>();
            if (orders.Count > 0)
            {
                Mapper.Map<IEnumerable<OrderProduct>,
                IEnumerable<OrderDTO>>(orders, orderDTOlist);
            }
            return orderDTOlist;

        }

        public List<OrderItemResultSet> GetOrderedItemlist(int orderId)
        {
            var orderItemList = this.context.OrderProductItems.Where(x => x.OrderId == orderId).Include(x=>x.OrderProductMap)
                .Include(x=>x.SellerBranchMap).Include(x=>x.ProductMap)
                .ToList();
            List<OrderItemResultSet> orderitemListDTO = new List<OrderItemResultSet>();

            Mapper.Map<IEnumerable<OrderProductItem>,
                IEnumerable<OrderItemResultSet>>(orderItemList, orderitemListDTO);

            return orderitemListDTO;
        }

        public List<OrderItemResultSet> GetOrderedItemlist(int orderId, int branchId)
        {
            var orderItemList = this.context.OrderProductItems.Where(x => x.OrderId == orderId && x.BranchId ==  branchId).Include(x => x.OrderProductMap)
                .Include(x => x.SellerBranchMap).Include(x => x.ProductMap)
                .ToList();
            List<OrderItemResultSet> orderitemListDTO = new List<OrderItemResultSet>();

            Mapper.Map<IEnumerable<OrderProductItem>,
                IEnumerable<OrderItemResultSet>>(orderItemList, orderitemListDTO);

            return orderitemListDTO;
        }


        public int CreateOrder(int userId, List<ShoppingCartResultSet> shoppingCartItemList, OrderDTO orderDTO, Utilities.Enums.PaymentOption paymentOption, 
            Utilities.Enums.DeliveryOption deliveryOption, string couponCode)
        {
            var orderid = 0;
            decimal ordersubTotalInclTax = 0M;
            OrderProduct orderProduct = new OrderProduct();
            orderProduct.OrderGuid = Guid.NewGuid();
            orderProduct.BillingAddressId = orderDTO.BillingAddressId;
            orderProduct.ShippingAddressId = orderDTO.ShippingAddressId;
            orderProduct.CustomerIp = orderDTO.CustomerIp;
            orderProduct.CustomerId = orderDTO.CustomerId;
            orderProduct.OrderStatusId = orderDTO.OrderStatusId;
            orderProduct.PaymentStatusId = orderDTO.PaymentStatusId;
            orderProduct.PaymentMethod = (int)paymentOption;
            orderProduct.DeliveryMethod = (int)deliveryOption;

            orderProduct.OrderShippingCharges = 0;

            orderProduct.OrderDateUtc = DateTime.UtcNow;
            orderProduct.UpdatedOnUtc = DateTime.UtcNow;                 
            

            foreach(ShoppingCartResultSet shoppingCartItem in shoppingCartItemList)
            {
                OrderProductItem item = new OrderProductItem();                
                item.BranchId = shoppingCartItem.BranchId;
                item.ProductId = shoppingCartItem.ProductId;
                item.OrderItemGuid = Guid.NewGuid();
                item.Quantity = shoppingCartItem.Quantity;
                //Get pricing details. 
               // ProductRepository.getPr
              //  item.
                item.UnitPriceInclTax = shoppingCartItem.UnitPrice;
                item.PriceInclTax = item.UnitPriceInclTax * item.Quantity;

                item.ShippingCharges = shoppingCartItem.AdditionalShippingCharge * item.Quantity;
                item.OrderItemStatus = orderProduct.OrderStatusId;//when creating we will have same status.
                item.SelectedSize = shoppingCartItem.SelectedSize;

                var currentShoppingCartItem = this.context.ShoppingCartItems.Where(x => x.BranchId == shoppingCartItem.BranchId && x.CustomerId == orderProduct.CustomerId
                    && x.ProductId == item.ProductId && x.Quantity == item.Quantity).FirstOrDefault();

                orderProduct.OrderSubtotalInclTax += item.PriceInclTax;
                orderProduct.OrderShippingCharges += item.ShippingCharges??0;

                orderProduct.OrderProductItem.Add(item);
                context.Entry(currentShoppingCartItem).State = EntityState.Deleted;
            }
            //
            orderProduct.OrderDiscount = 0M;
            if (!string.IsNullOrEmpty(couponCode))
            {
                var discountObject = context.Discounts.Where(x => x.CouponCode.ToUpper() == couponCode.ToUpper()
                    && x.StartDateUtc <= DateTime.UtcNow && x.EndDateUtc >= DateTime.UtcNow).FirstOrDefault();
                if(discountObject!=null && discountObject.UsePercentage && discountObject.MinOrderValue<orderProduct.OrderSubtotalInclTax)
                {
                    orderProduct.OrderDiscount = (orderProduct.OrderSubtotalInclTax * (discountObject.DiscountPercentage / 100));
                }
                else if (discountObject != null && discountObject.DiscountAmount > 0 && discountObject.MinOrderValue < orderProduct.OrderSubtotalInclTax)
                {
                    orderProduct.OrderDiscount = orderProduct.OrderSubtotalInclTax - discountObject.DiscountAmount;
                }

                if(orderProduct.OrderDiscount > discountObject.MaxDiscountAmount)
                {
                    orderProduct.OrderDiscount = discountObject.MaxDiscountAmount;
                }

                //We should return that the order value is less etc.. Validation to be done seperately. 
            }         
            //To Change later.
           
            orderProduct.PaymentMethodAdditionalFee = 0.0M;
             
            orderProduct.OrderTotal = (orderProduct.OrderSubtotalInclTax + orderProduct.OrderShippingCharges +
            orderProduct.PaymentMethodAdditionalFee) - orderProduct.OrderDiscount;

            this.context.Entry(orderProduct).State = EntityState.Added;
            this.context.SaveChanges();
            return orderProduct.Id;
        }

        public BuyerAddressResult GetAddress(int addressId)
        {
            var address = context.BuyerAddress.Where(x => x.BuyerAddressId == addressId).First();
            BuyerAddressResult addressResult = new BuyerAddressResult();
            addressResult.Address1 = address.Address1;
            addressResult.Address2 = address.Address2;
            addressResult.City = address.City;
            addressResult.State = address.State;
            addressResult.PhoneNumber = address.PhoneNumber;
            addressResult.PostalCode = address.PostalCode;
            addressResult.AddressId = addressId;
            return addressResult;
        }


        public ResultSet.DiscountResult GetDiscountDetails(string couponCode)
        {
            if (!string.IsNullOrEmpty(couponCode))
            {
                var discountObject = context.Discounts.Where(x => x.CouponCode.ToUpper() == couponCode.ToUpper() && x.StartDateUtc <= DateTime.UtcNow 
                    && x.EndDateUtc >= DateTime.UtcNow).FirstOrDefault();
                ResultSet.DiscountResult discountResult = new ResultSet.DiscountResult();
                discountResult.CouponCode = couponCode;
                if (discountObject != null && couponCode != null && couponCode.ToUpper() == discountObject.CouponCode.ToUpper())
                {
                    discountResult.UsePercentage = discountObject.UsePercentage;
                    discountResult.DiscountDescription = discountObject.Name;
                    discountResult.DiscountPercentage = discountObject.DiscountPercentage;
                    discountResult.DiscountAmount = discountObject.DiscountAmount;
                    discountResult.MaxDiscountAmount = discountObject.MaxDiscountAmount;
                    discountResult.MinOrderValue = discountObject.MinOrderValue;

                }
                return discountResult;
            }
            return null;
            
        }


        public bool UpdateAndSaveTransactionId(int orderId,OrderDTO orderDTO)
        {
            try
            {
                OrderProduct orderProduct = context.OrderProducts.Where(x => x.Id == orderId).FirstOrDefault();
                orderProduct.TransactionId = orderDTO.TransactionId;
                this.context.Entry(orderProduct).State = EntityState.Modified;
                this.context.SaveChanges();
                return true;
            }
            catch
            {

            }
            return false;
        }

        public List<OrderProductItem> GetOrderProductItemList(int orderId)
        {
            List<OrderProductItem> orderProductItemList = context.OrderProductItems.Where(x => x.OrderId == orderId).ToList();

            return orderProductItemList;
        }

        public bool UpdateOrderProductItemStatus(int orderId, int OrderStatus)
        {
            try
            {
                List<OrderProductItem> orderProductItemList = context.OrderProductItems.Where(x => x.OrderId == orderId).ToList();


                foreach (var item in orderProductItemList)
                {
                    item.OrderItemStatus = OrderStatus;
                    this.context.Entry(item).State = EntityState.Modified;
                }
                this.context.SaveChanges();
                return true;
            }
            catch
            {

            }
            return false;

        }



        public bool UpdateAndSave(OrderProduct orderProduct)
        {
            try
            {
                orderProduct.UpdatedOnUtc = DateTime.UtcNow;
                this.context.Entry(orderProduct).State = EntityState.Modified;
                this.context.SaveChanges();
                return true;
            }
            catch
            {

            }
            return false;
        }
    }

}


