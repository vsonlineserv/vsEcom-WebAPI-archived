using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using VSOnline.VSECommerce.Domain;

public partial class PayUResponseHandling : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
            {
                 
                string salt = "ChCcXzeW";

                string[] merc_hash_vars_seq;
                string merc_hash_string = string.Empty;
                string merc_hash = string.Empty;
                string order_id = string.Empty;
                string hash_seq = "key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10";

                if (Request.Form["status"].ToString() == "success")
                {

                    merc_hash_vars_seq = hash_seq.Split('|');
                    Array.Reverse(merc_hash_vars_seq);
                    merc_hash_string = salt + "|" + Request.Form["status"].ToString();

                    order_id = Request.Form["txnid"];

                    foreach (string merc_hash_var in merc_hash_vars_seq)
                    {
                        merc_hash_string += "|";
                        merc_hash_string = merc_hash_string + (Request.Form[merc_hash_var] != null ? Request.Form[merc_hash_var] : "");

                    }
                    //Response.Write(merc_hash_string);
                    merc_hash = Generatehash512(merc_hash_string).ToLower();

                    StringBuilder txnDetails = new StringBuilder();
                    foreach (string key in Request.Form.Keys)
                    {
                        txnDetails.Append("  ").Append(key).Append("|").AppendLine(Request.Form[key]);
                    }

                    if (merc_hash != Request.Form["hash"])
                    {
                        //Response.Write("Hash value did not matched");
                        ShoppingCartRepository cartRepository = new ShoppingCartRepository(new ShoppingCartDatContext());
                        var order = cartRepository.GetOrderProductUsingTransaction(order_id);
                        if (order != null)
                        {
                            order.TransactionResult = Request.Form["status"].ToString();
                            order.TransactionResultDetails = "Hash value did not matched.  " + hash_seq + txnDetails.ToString();
                            order.OrderStatusId = (int)VSOnline.VSECommerce.Utilities.Enums.PaymentStatus.PaymentInProgress;
                            order.PaymentStatusId = (int)VSOnline.VSECommerce.Utilities.Enums.OrderStatus.VerficationInProgress; 
                            cartRepository.UpdateAndSave(order);
                            cartRepository.UpdateOrderProductItemStatus(order.Id, order.OrderStatusId);
                        }
                        Response.Redirect("http://vbuy.in/confirmOrder/" + order.Id,false);
                        Response.End();
                    }
                    else
                    {
                        order_id = Request.Form["txnid"];
                        

                        ShoppingCartRepository cartRepository = new ShoppingCartRepository(new ShoppingCartDatContext());
                        var order = cartRepository.GetOrderProductUsingTransaction(order_id);
                         
                        if (order != null)
                        {
                            order.TransactionResult = Request.Form["status"].ToString();
                            order.TransactionResultDetails = "Status is successful. Hash value is matched" + hash_seq + txnDetails.ToString();
                            order.OrderStatusId = (int)VSOnline.VSECommerce.Utilities.Enums.OrderStatus.Verified;
                            order.PaymentStatusId = (int)VSOnline.VSECommerce.Utilities.Enums.PaymentStatus.PaymentCompleted; 
                            cartRepository.UpdateAndSave(order);
                            cartRepository.UpdateOrderProductItemStatus(order.Id, order.OrderStatusId);
                        }
                        Response.Redirect("http://vbuy.in/confirmOrder/" + order.Id,true);
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
                    StringBuilder txnDetails = new StringBuilder();
                    foreach (string key in Request.Form.Keys)
                    {
                        txnDetails.Append("  ").Append(key).Append(" | ").AppendLine(Request.Form[key]);
                    }
                    if (order != null)
                    {
                        order.TransactionResult = Request.Form["status"].ToString();
                        order.TransactionResultDetails = "Failure" + hash_seq + txnDetails.ToString(); ;
                        order.OrderStatusId = (int)VSOnline.VSECommerce.Utilities.Enums.OrderStatus.VerficationInProgress; 
                        order.PaymentStatusId = (int)VSOnline.VSECommerce.Utilities.Enums.PaymentStatus.PaymentInProgress; 
                        cartRepository.UpdateAndSave(order);
                        cartRepository.UpdateOrderProductItemStatus(order.Id, order.OrderStatusId);
                    }
                    Response.Redirect("http://www.vbuy.in/failedTransactionOrder/" + order.Id,true);

                }
            }
            catch (ThreadAbortException exc)
            {
                // This should be first catch block i.e. before generic Exception
                // This Catch block is to absorb exception thrown by Response.End
            }
            catch (Exception ex)
            {
                Response.Write("<span style='color:red'>" + ex.Message + "</span>");
                try
                {
                    var txnId = Request.Form["txnid"];
                    ShoppingCartRepository cartRepository = new ShoppingCartRepository(new ShoppingCartDatContext());
                    var forder = cartRepository.GetOrderProductUsingTransaction(txnId);
                    if (forder != null)
                    {
                        forder.TransactionResult = Request.Form["status"].ToString();
                        forder.TransactionResultDetails = "Failure" ;
                        forder.OrderStatusId = (int)VSOnline.VSECommerce.Utilities.Enums.OrderStatus.VerficationInProgress;
                        forder.PaymentStatusId = (int)VSOnline.VSECommerce.Utilities.Enums.PaymentStatus.PaymentInProgress;
                        cartRepository.UpdateAndSave(forder);
                        cartRepository.UpdateOrderProductItemStatus(forder.Id, forder.OrderStatusId);
                    }
                    Response.Redirect("http://www.vbuy.in/failedTransactionOrder/" + forder.Id, true);
                }
                catch (ThreadAbortException exc)
                {
                    // This should be first catch block i.e. before generic Exception
                    // This Catch block is to absorb exception thrown by Response.End
                }
                catch
                {
                    Response.Redirect("http://vbuy.in/failedTransactionOrder/" + 0, true);
                }

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
