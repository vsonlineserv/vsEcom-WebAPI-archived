// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Web;

namespace VSOnline.VSECommerce.Utilities
{
    public class MessageClient
    {
        string messageApiUrl = @"";

        public bool SendSMS(string toNumber, string smsMessage, Enums.MailTemplate template)
        {
            try
            {
                if (!string.IsNullOrEmpty(toNumber))
                {
                    string formattedMessageApiUrl = messageApiUrl.FormatWith(new { toNumber, smsMessage });
                    WebRequest request = HttpWebRequest.Create(formattedMessageApiUrl);
                    HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                    Stream s = (Stream)response.GetResponseStream();
                    StreamReader readStream = new StreamReader(s);
                    string dataString = readStream.ReadToEnd();
                    response.Close();
                    s.Close();
                    readStream.Close();
                }
            }
            catch
            {

            }
            return false;
        }


        public string GetMessageTemplate(Enums.MailTemplate templateEnum)
        {
            string body = "";
            //Read template file from the App_Data folder
            string eMailTemplateLocation = @"..\..\..\" + @"EmailTemplates\";
            string retailerMailTemplateLocation = @"..\..\" + @"EmailTemplates\";


            switch (templateEnum)
            {
                case Enums.MailTemplate.ProductRequestQuery:
                    using (var sr = new StreamReader(HttpContext.Current.Server.MapPath(eMailTemplateLocation + "ProductRequestSMS.txt")))
                    {
                        body = sr.ReadToEnd();
                    }
                    break;
                case Enums.MailTemplate.ProductReplyMessage:
                    using (var sr = new StreamReader(HttpContext.Current.Server.MapPath(retailerMailTemplateLocation + "ProductReplySMS.txt")))
                    {
                        body = sr.ReadToEnd();
                    }
                    break;
                case Enums.MailTemplate.OrderCancellation:
                    using (var sr = new StreamReader(HttpContext.Current.Server.MapPath(eMailTemplateLocation + "OrderCancellationSMS.txt")))
                    {
                        body = sr.ReadToEnd();
                    }
                    break;
                case Enums.MailTemplate.OrderConfirmation:
                    using (var sr = new StreamReader(HttpContext.Current.Server.MapPath(eMailTemplateLocation + "OrderConfirmationSMS.txt")))
                    {
                        body = sr.ReadToEnd();
                    }
                    break;

            }
            return body;
        }
    }

}
