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
using VSOnline.VSECommerce.Utilities;

namespace VSOnline.VSECommerce.Domain.Helper
{
    public class MailHelper
    {
        public static void SendWelcomeMail(string toMail)
        {
            var mailClient = new MailClient();
            var mailBody = mailClient.GetMailBody(Enums.MailTemplate.WelcomeEmail);
            mailClient.SendMail(toMail,mailBody, Enums.MailTemplate.WelcomeEmail);
        }       

        public static void SendRegisterRetailerMail(string toMail, string username, string businessname)
        {
            var mailClient = new MailClient();
            var mailBody = mailClient.GetMailBody(Enums.MailTemplate.RetailerAccountCreated)
                .FormatWith(new { username, businessname });
            mailClient.SendMail(toMail, mailBody, Enums.MailTemplate.RetailerAccountCreated);
        }

        public static void SendForgetPasswordMail(string toMail, string uniqueId, string username)
        {
            var mailClient = new MailClient();
            var mailBody = mailClient.GetMailBody(Enums.MailTemplate.ForgotPassword).FormatWith
                (new { uid = uniqueId, username });
            mailClient.SendMail(toMail, mailBody, Enums.MailTemplate.ForgotPassword);
        }

        public static void SendRegisterUserMail(string toMail, string username)
        {
            var mailClient = new MailClient();
            var mailBody = mailClient.GetMailBody(Enums.MailTemplate.UserAccountCreated)
                .FormatWith(new { username });
            mailClient.SendMail(toMail, mailBody, Enums.MailTemplate.UserAccountCreated);
        }

        public static void SendProductRequestMail(string branch, string toMail, string name, string userMail, string mobile, string productName, string message)
        {
            var mailClient = new MailClient();
            var mailBody = mailClient.GetMailBody(Enums.MailTemplate.ProductRequestQuery)
                .FormatWith(new { store = branch, productName, message, name, number = mobile, email = userMail });
            mailClient.SendMail(toMail, mailBody, Enums.MailTemplate.ProductRequestQuery);
        }

        public static void SendProductReplyMail(string toMail, string productName, string store, string message)
        {
            var mailClient = new MailClient();
            var mailBody = mailClient.GetMailBody(Enums.MailTemplate.ProductReplyMessage)
                .FormatWith(new { productName, store, message });
            mailClient.SendMail(toMail, mailBody, Enums.MailTemplate.ProductReplyMessage);
        }

        public static void SendOrderConfirmationMail(string customerEmail, string orderNumber, string trOrderConfirmation, 
            decimal orderTotalInclTax, decimal shippingCharges,decimal orderDiscount , decimal netPayable 
            , string CustomerName, string Address1, string Address2, string City, string State
            , string Postalcode, string PhoneNumber)
        {
            var mailClient = new MailClient();
            var mailBody = mailClient.GetMailBody(Enums.MailTemplate.OrderConfirmation)
                .FormatWith(new { CustomerEmail = customerEmail, orderNumber, trOrderConfirmation
                    ,
                                  orderTotalInclTax,
                                  shippingCharges,
                                  orderDiscount,
                                  netPayable,
                                  CustomerName, 
                                  Address1, Address2, State, City, Postalcode, PhoneNumber
                                   
                });
            mailClient.SendMail(customerEmail, mailBody, Enums.MailTemplate.OrderConfirmation);
        }

        public static void SendOrderCancellationMail(string toMail, string orderNumber)
        {
            var mailClient = new MailClient();
            var mailBody = mailClient.GetMailBody(Enums.MailTemplate.OrderCancellation)
                .FormatWith(new { orderNumber });
            mailClient.SendMail(toMail, mailBody, Enums.MailTemplate.OrderCancellation);
        }

        public static void SendMailToSiteAdmin(string toMail, string details)
        {
            var mailClient = new MailClient();
            string Details = details;
          
            var mailBody = mailClient.GetMailBody(Enums.MailTemplate.SiteAdminInformation)
                .FormatWith(new { Details });
            mailClient.SendMail(toMail, mailBody, Enums.MailTemplate.SiteAdminInformation);
        }

    }
}
