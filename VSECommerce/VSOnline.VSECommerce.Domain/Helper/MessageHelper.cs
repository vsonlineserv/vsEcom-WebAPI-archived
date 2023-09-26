using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VSOnline.VSECommerce.Utilities;

namespace VSOnline.VSECommerce.Domain.Helper
{
    public class MessageHelper
    {
        public static void SendProductRequestMessage(string toNumber, string productName, string smsMessage, string user, string mobile)
        {
            var messageClient = new MessageClient();
            var messageBody = messageClient.GetMessageTemplate(Enums.MailTemplate.ProductRequestQuery)
                .FormatWith(new {user, productName, mobile});
            messageClient.SendSMS(toNumber, messageBody, Enums.MailTemplate.ProductRequestQuery);
        }

        public static void SendProductReplyMessage(string toNumber, string productName, string store, string message)
        {
            var messageClient = new MessageClient();
            var messageBody = messageClient.GetMessageTemplate(Enums.MailTemplate.ProductReplyMessage)
                .FormatWith(new { productName, store });
            messageClient.SendSMS(toNumber, messageBody, Enums.MailTemplate.ProductReplyMessage);
        }

        public static void SendOrderConfirmationSMS(int orderId, string toNumber)
        {
            var messageClient = new MessageClient();
            var messageBody = messageClient.GetMessageTemplate(Enums.MailTemplate.OrderConfirmation)
                .FormatWith(new { orderNumber = orderId.ToString() });
            messageClient.SendSMS(toNumber, messageBody, Enums.MailTemplate.OrderConfirmation);
        }

        public static void SendOrderCancellationSMS(int orderId, string toNumber)
        {
            var messageClient = new MessageClient();
            var messageBody = messageClient.GetMessageTemplate(Enums.MailTemplate.OrderCancellation)
                .FormatWith(new { orderNumber = orderId.ToString() });
            messageClient.SendSMS(toNumber, messageBody, Enums.MailTemplate.OrderCancellation);
        }

    }
}

////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce.Domain
///////////////////////////////////////////////////////////////////////////////////////////