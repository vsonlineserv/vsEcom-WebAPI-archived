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
using System.Web.Mvc;
using System.Data;
using System.Configuration;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Security.Cryptography;
using System.Text;
using VSOnline.VSECommerce.Domain;

namespace VSOnline.VSECommerce.Web.Controllers
{
    public class PaymentGatewayReturnController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public void Result(FormCollection form)
        {
            try
            {

                string salt = ""; ///ADD YOUR SALT>

                string[] merc_hash_vars_seq;
                string merc_hash_string = string.Empty;
                string merc_hash = string.Empty;
                string order_id = string.Empty;
                string hash_seq = "key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10";

                if (form["status"].ToString() == "success")
                {

                    merc_hash_vars_seq = hash_seq.Split('|');
                    Array.Reverse(merc_hash_vars_seq);
                    merc_hash_string = salt + "|" + form["status"].ToString();

                    order_id = form["txnid"];

                    foreach (string merc_hash_var in merc_hash_vars_seq)
                    {
                        merc_hash_string += "|";
                        merc_hash_string = merc_hash_string + (form[merc_hash_var] != null ? form[merc_hash_var] : "");

                    }
                    //Response.Write(merc_hash_string);
                    merc_hash = Generatehash512(merc_hash_string).ToLower();



                    if (merc_hash != form["hash"])
                    {
                        //Response.Write("Hash value did not matched");
                        ShoppingCartRepository cartRepository = new ShoppingCartRepository(new ShoppingCartDatContext());
                        var order = cartRepository.GetOrderProductUsingTransaction(order_id);
                        if (order != null)
                        {
                            order.TransactionResult = form["status"].ToString();
                            order.TransactionResultDetails = "Hash value did not matched.  " + hash_seq;
                            order.PaymentStatusId = (int)Utilities.Enums.PaymentStatus.PaymentInProgress;
                            order.OrderStatusId = (int)Utilities.Enums.OrderStatus.VerficationInProgress;
                            cartRepository.UpdateAndSave(order);

                            cartRepository.UpdateOrderProductItemStatus(order.Id, order.OrderStatusId);
                        }
                        Response.Redirect("http://vbuy.in/confirmOrder/" + order.Id);
                    }
                    else
                    {
                        order_id = Request.Form["txnid"];


                        ShoppingCartRepository cartRepository = new ShoppingCartRepository(new ShoppingCartDatContext());
                        var order = cartRepository.GetOrderProductUsingTransaction(order_id);

                        if (order != null)
                        {
                            order.TransactionResult = form["status"].ToString();
                            order.TransactionResultDetails = "Status is successful. Hash value is matched" + hash_seq;
                            order.PaymentStatusId = (int)Utilities.Enums.PaymentStatus.PaymentCompleted;
                            order.OrderStatusId = (int)Utilities.Enums.OrderStatus.Verified;
                            cartRepository.UpdateAndSave(order);
                            cartRepository.UpdateOrderProductItemStatus(order.Id, order.OrderStatusId);
                        }
                        Response.Redirect("http://www.vbuy.in/confirmOrder/" + order.Id);
                        //  ViewData["Message"] = "Status is successful. Hash value is matched";
                        //  Response.Write("<br/>Hash value matched");

                        //Hash value did not matched
                    }

                }

                else
                {
                    ShoppingCartRepository cartRepository = new ShoppingCartRepository(new ShoppingCartDatContext());
                    //var order = cartRepository.GetOrderProduct(intOrderId);
                    //order.TransactionResult = form["status"].ToString();
                    //      order.TransactionResultDetails = "Failure" +  hash_seq;
                    var order = cartRepository.GetOrderProductUsingTransaction(order_id);

                    if (order != null)
                    {
                        order.TransactionResult = form["status"].ToString();
                        order.TransactionResultDetails = "Failure" + hash_seq;
                        order.PaymentStatusId = (int)Utilities.Enums.PaymentStatus.PaymentInProgress;
                        order.OrderStatusId = (int)Utilities.Enums.OrderStatus.VerficationInProgress;
                        cartRepository.UpdateAndSave(order);
                        cartRepository.UpdateOrderProductItemStatus(order.Id, order.OrderStatusId);
                    }
                    Response.Redirect("http://www.vbuy.in/failedTransactionOrder/" + order.Id);

                }
            }

            catch (Exception ex)
            {
                Response.Write("<span style='color:red'>" + ex.Message + "</span>");
                Response.Redirect("http://www.vbuy.in/failedTransactionOrder");

            }
        }

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


    }
}