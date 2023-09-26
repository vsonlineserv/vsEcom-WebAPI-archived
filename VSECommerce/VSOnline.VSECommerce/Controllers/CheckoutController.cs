////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce 
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VSOnline.VSECommerce.Domain.ResultSet;
using VSOnline.VSECommerce.Domain.DTO;
using VSOnline.VSECommerce.Domain;
using System.ServiceModel.Channels;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;
using System.Configuration;
using System.Net.Http.Headers;

namespace VSOnline.VSECommerce.Web.Controllers
{
    public class CheckoutController : ApiController
    {

        IUnitOfWork _unitOfWork = null;
        IShoppingCartRepository _shoppingCartRepository;

        public CheckoutController(IUnitOfWork unitOfWork, IShoppingCartRepository shoppingCartRepository)
        {
            _unitOfWork = unitOfWork;
            _shoppingCartRepository = shoppingCartRepository;
        }

        public string CreateOrderForCart(CreateOrderItemListDTO shoppingCartItemListDTO)
        {
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            var orderId = 0;
            if (currentUser != null)
            {
                UserService userService = new UserService();
                var user = userService.GetUser(currentUser);
                if (user != null && user.Username.ToLower() == shoppingCartItemListDTO.UserName.ToLower())
                {
                    var shoppingCartlist = GetShoppingCartItemForUser(user.UserId);
                    OrderDTO orderDTO = new OrderDTO();
                    bool flagSpecialZone = false;
                    if (shoppingCartlist != null && shoppingCartlist.Count > 0 && shoppingCartlist.Count == shoppingCartItemListDTO.shoppingCartDTOList.Count)
                    {
                        var flagSpecialZoneProducts = shoppingCartlist.Where(x => x.BranchId == 3359).ToList();
                        flagSpecialZone = flagSpecialZoneProducts.Count > 0;
                        orderDTO.CustomerId = user.UserId;
                        orderDTO.CustomerIp = GetIpAddress();
                        orderDTO.BillingAddressId = GetCurrentUserAddress(user.UserId);
                        orderDTO.ShippingAddressId = orderDTO.BillingAddressId;

                        if (shoppingCartItemListDTO.PaymentMethod == Utilities.Enums.PaymentOption.PaymentGateway1)
                        {
                            orderDTO.OrderStatusId = (int)Utilities.Enums.OrderStatus.Verified;
                            orderDTO.PaymentStatusId = (int)Utilities.Enums.PaymentStatus.PaymentInProgress;
                        }
                        else
                        {
                            orderDTO.OrderStatusId = (int)Utilities.Enums.OrderStatus.Created;
                            orderDTO.PaymentStatusId = (int)Utilities.Enums.PaymentStatus.PaymentInProgress;
                        }

                        orderId = _shoppingCartRepository.CreateOrder(user.UserId, shoppingCartlist, orderDTO,
                            shoppingCartItemListDTO.PaymentMethod, shoppingCartItemListDTO.DeliveryMethod, shoppingCartItemListDTO.CouponCode);

                        _shoppingCartRepository.UpdateOrderProductItemStatus(orderId, orderDTO.OrderStatusId);


                        //Adding reward
                        var orderVal = _shoppingCartRepository.GetOrder(user.UserId, orderId);
                        if (orderVal != null)
                        {
                            PostOrderConfirmation(Convert.ToInt16(ConfigurationManager.AppSettings["keyId"]), ConfigurationManager.AppSettings["type"].ToString(), Convert.ToInt64(orderVal.OrderTotal), user.Email);
                        }

                    }
                    if (flagSpecialZone)
                    {
                        // return "SpecialZone:We will mail you Email Invoice and link for payment";
                        return orderId.ToString();
                    }
                    if (orderId > 0 && shoppingCartItemListDTO.PaymentMethod == Utilities.Enums.PaymentOption.PaymentGateway1 && !flagSpecialZone)
                    {
                        return PayUsingGateway(user.UserId, user.FirstName, user.Email, user.PhoneNumber1, orderId);
                    }
                    return orderId.ToString();

                }
            }
            return orderId.ToString();

        }


        public void PostOrderConfirmation(int keyId, string type, long amount, string email)
        {
            try
            {
                string uri = "api/Store/RewardForPurchase?keyId={0}&type={1}&amount={2}&email={3}";
                HttpResponseMessage response = null;
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["RewardHostName"].ToString());
                    MediaTypeWithQualityHeaderValue contentType = new MediaTypeWithQualityHeaderValue("application/json");
                    client.DefaultRequestHeaders.Accept.Add(contentType);
                    response = client.GetAsync(string.Format(uri, keyId, type, amount, email)).Result;
                }

                if (response.IsSuccessStatusCode)
                {
                    string result = response.Content.ReadAsStringAsync().Result;
                }

            }
            catch (Exception ex)
            {

            }
        }

        public string GetuseMyReward(string email, int availableReward, int useRewardPoint)
        {
            try
            {
                string uri = "/api/Reward/RedeemForPurchase?email={0}&availableReward={1}&useRewardPoint={2}&key={3}&keyName={4}";
                HttpResponseMessage response = null;
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["RewardHostName"].ToString());
                    MediaTypeWithQualityHeaderValue contentType = new MediaTypeWithQualityHeaderValue("application/json");
                    client.DefaultRequestHeaders.Accept.Add(contentType);
                    response = client.GetAsync(string.Format(uri, email, availableReward, useRewardPoint, ConfigurationManager.AppSettings["key"].ToString(), ConfigurationManager.AppSettings["keyName"].ToString())).Result;
                }

                if (response.IsSuccessStatusCode)
                {
                    string result = response.Content.ReadAsStringAsync().Result;
                }

            }
            catch (Exception ex)
            {

            }
            return "";
        }

        public string InitiatePaymentGateway(int orderid, string username)
        {
            UserService userService = new UserService();

            var currentUser = ClaimsPrincipal.Current.Identity.Name;

            var user = userService.GetUser(currentUser);
            if (user != null && user.Username.ToLower() == username.ToLower())
            {
                var order = _shoppingCartRepository.GetOrder(user.UserId, orderid);

                if (string.IsNullOrEmpty(order.TransactionResultDetails))
                {
                    return PayUsingGateway(user.UserId, user.FirstName, user.Email, user.PhoneNumber1, orderid);
                }
            }
            return orderid.ToString();
        }

        private string PayUsingGateway(int userid, string userFirstName, string userEmail, string userPhoneNumber, int orderid)
        {
            var order = _shoppingCartRepository.GetOrder(userid, orderid);
            //  order.TransactionId = Guid.NewGuid().ToString("N");

            _shoppingCartRepository.UpdateAndSaveTransactionId(orderid, order);



            string firstName = userFirstName;
            string amount = order.OrderTotal.ToString();
            string productInfo = orderid.ToString();
            string email = userEmail;
            string phone = userPhoneNumber;
            string surl = "YourSuccessUrl";
            string furl = "YourFailureUrl";



            string txnid = Generatetxnid();
            order.TransactionId = txnid;
            _shoppingCartRepository.UpdateAndSaveTransactionId(orderid, order);


            RemotePost myremotepost = new RemotePost();
            string key = "YourPAYUKEY";//PAYUKEY
            string salt = "YourPAYUSALT";//PAYUSALT

            //posting all the parameters required for integration.

            myremotepost.Url = "Your Payu url";
            myremotepost.Add("key", "YourPAYUKEY");

            //  myremotepost.Add("txnid", orderid.ToString());
            myremotepost.Add("txnid", txnid);
            myremotepost.Add("amount", amount);
            myremotepost.Add("productinfo", productInfo);
            myremotepost.Add("firstname", firstName);
            myremotepost.Add("phone", phone);
            myremotepost.Add("email", email);
            myremotepost.Add("surl", surl);//Change the success url here depending upon the port number of your local system.
            myremotepost.Add("furl", furl);//Change the failure url here depending upon the port number of your local system.
            myremotepost.Add("service_provider", "payu_paisa");
            string hashString = key + "|" + txnid + "|" + amount + "|" + productInfo + "|" + firstName + "|" + email + "|||||||||||" + salt;
            //string hashString = "3Q5c3q|2590640|3053.00|OnlineBooking|vimallad|ladvimal@gmail.com|||||||||||mE2RxRwx";
            string hash = Generatehash512(hashString);
            myremotepost.Add("hash", hash);

            return myremotepost.Post();


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

        private int GetCurrentUserAddress(int customerId)
        {
            var address = _shoppingCartRepository.GetBuyerAddressForUser(customerId);
            return address.AddressId;
        }

        private string GetIpAddress()
        {
            try
            {
                HttpRequestMessage request = null;

                request = Request;
                if (request.Properties.ContainsKey("MS_HttpContext"))
                {
                    return ((HttpContextWrapper)request.Properties["MS_HttpContext"]).Request.UserHostAddress;
                }
                else if (request.Properties.ContainsKey(RemoteEndpointMessageProperty.Name))
                {
                    RemoteEndpointMessageProperty prop = (RemoteEndpointMessageProperty)request.Properties[RemoteEndpointMessageProperty.Name];
                    return prop.Address;
                }
                else if (HttpContext.Current != null)
                {
                    return HttpContext.Current.Request.UserHostAddress + HttpContext.Current.Request.UserHostName;
                }
            }
            catch
            {

            }
            return string.Empty;
        }

        public OrderConfirmationDTO GetOrderConfirmationDetails(int orderId, string userName)
        {
            if (orderId > 0)
            {
                var currentUser = ClaimsPrincipal.Current.Identity.Name;
                if (currentUser != null)
                {
                    UserService userService = new UserService();
                    var user = userService.GetUser(currentUser);
                    OrderConfirmationDTO orderDetail = new OrderConfirmationDTO();
                    if (user.Username.ToLower() == userName.ToLower())
                    {
                        var orderDTOObj = _shoppingCartRepository.GetOrder(user.UserId, orderId);
                        orderDetail.OrderDetails = orderDTOObj;
                        orderDetail.OrderItemDetails = _shoppingCartRepository.GetOrderedItemlist(orderId);
                        orderDetail.ShippingAddress = _shoppingCartRepository.GetAddress(orderDTOObj.ShippingAddressId);
                        orderDetail.CustomerName = user.FirstName;
                        orderDetail.CustomerEmail = user.Email;

                        //send order confirmation email 
                        StringBuilder trConfirmation = new StringBuilder();
                        foreach (var item in orderDetail.OrderItemDetails)
                        {
                            trConfirmation.Append("<tr>");

                            trConfirmation.Append("<td width='30%'>");
                            trConfirmation.Append(item.Name + "<br> store: " + item.Branch);
                            if (item.SelectedSize != null && !string.IsNullOrEmpty(item.SelectedSize))
                            {
                                trConfirmation.Append(" / Size: " + item.SelectedSize);
                            }

                            trConfirmation.Append("</td>");

                            trConfirmation.Append("<td>");
                            trConfirmation.Append(item.Quantity);
                            trConfirmation.Append("</td>");


                            trConfirmation.Append(" <td align='right'>");
                            trConfirmation.Append(item.UnitPrice);
                            trConfirmation.Append(" </td>");

                            trConfirmation.Append(" <td align='right'>");
                            trConfirmation.Append(item.Price);
                            trConfirmation.Append(" </td>");



                            trConfirmation.Append(" </tr>");

                        }
                        try
                        {
                            VSOnline.VSECommerce.Domain.Helper.MailHelper.SendOrderConfirmationMail(orderDetail.CustomerEmail,
                            orderId.ToString(), trConfirmation.ToString(), orderDetail.OrderDetails.OrderSubtotalInclTax, orderDetail.OrderDetails.OrderShippingCharges,
                            orderDetail.OrderDetails.OrderDiscount, orderDetail.OrderDetails.OrderTotal, orderDetail.CustomerName
                            , orderDetail.ShippingAddress.Address1, orderDetail.ShippingAddress.Address2, orderDetail.ShippingAddress.City
                            , orderDetail.ShippingAddress.State, orderDetail.ShippingAddress.PostalCode, orderDetail.ShippingAddress.PhoneNumber);

                            VSOnline.VSECommerce.Domain.Helper.MessageHelper.SendOrderConfirmationSMS(orderId, orderDetail.ShippingAddress.PhoneNumber);
                        }
                        catch
                        {

                        }
                    }

                    return orderDetail;
                }
            }
            return null;
        }

        //[HttpGet]
        //[ActionName("GetCartDiscount")]
        public decimal? GetCartDiscount(string userName, string couponCode)
        {
            decimal? totalDiscount = 0.0M;
            var discountDetails = _shoppingCartRepository.GetDiscountDetails(couponCode);
            var currentUser = ClaimsPrincipal.Current.Identity.Name;
            if (currentUser != null)
            {
                UserService userService = new UserService();
                var user = userService.GetUser(currentUser);

                if (user != null && user.Username.ToLower() == userName.ToLower())
                {
                    var shoppingCartlist = GetShoppingCartItemForUser(user.UserId);
                    var OrderSubtotalInclTax = 0.0M;

                    foreach (var shoppingCart in shoppingCartlist)
                    {
                        OrderSubtotalInclTax += (shoppingCart.UnitPrice * shoppingCart.Quantity);
                    }

                    if (discountDetails != null && discountDetails.UsePercentage && discountDetails.MinOrderValue < OrderSubtotalInclTax)
                    {
                        totalDiscount = (OrderSubtotalInclTax * (discountDetails.DiscountPercentage / 100));
                    }
                    else if (discountDetails != null && discountDetails.DiscountAmount > 0 && discountDetails.MinOrderValue < OrderSubtotalInclTax)
                    {
                        totalDiscount = discountDetails.DiscountAmount;
                    }

                    if (discountDetails != null && discountDetails.DiscountAmount > discountDetails.MaxDiscountAmount)
                    {
                        totalDiscount = discountDetails.MaxDiscountAmount;
                    }
                }
            }
            return totalDiscount;
        }


        #region PG Code
        public class RemotePost
        {
            private System.Collections.Specialized.NameValueCollection Inputs = new System.Collections.Specialized.NameValueCollection();


            public string Url = "";
            public string Method = "post";
            public string FormName = "form1";

            public void Add(string name, string value)
            {
                Inputs.Add(name, value);
            }

            public string Post()
            {
                StringBuilder formBuilder = new StringBuilder();
                formBuilder.Append("<html><head>");
                formBuilder.Append(string.Format("</head><body onload=\"document.{0}.submit()\">", FormName));
                formBuilder.Append(string.Format("<form name=\"{0}\" id=\"payuForm\" method=\"{1}\" action=\"{2}\" >", FormName, Method, Url));
                for (int i = 0; i < Inputs.Keys.Count; i++)
                {
                    formBuilder.Append(string.Format("<input name=\"{0}\" type=\"hidden\" value=\"{1}\">", Inputs.Keys[i], Inputs[Inputs.Keys[i]]));
                }
                formBuilder.Append("</form>");
                formBuilder.Append("</body></html>");
                return formBuilder.ToString();
            }
        }

        //Hash generation Algorithm

        public string Generatehash512(string text)
        {

            byte[] message = Encoding.UTF8.GetBytes(text);

            UnicodeEncoding UE = new UnicodeEncoding();
            byte[] hashValue;
            SHA512Managed hashString = new SHA512Managed();
            string hex = "";
            hashValue = hashString.ComputeHash(message);
            foreach (byte x in hashValue)
            {
                hex += String.Format("{0:x2}", x);
            }
            return hex;

        }


        public string Generatetxnid()
        {

            Random rnd = new Random();
            string strHash = Generatehash512(rnd.ToString() + DateTime.Now);
            string txnid1 = strHash.ToString().Substring(0, 20);

            return txnid1;

        }


        #endregion 
    }
}
