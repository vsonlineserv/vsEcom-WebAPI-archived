// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Mail;
using System.IO;
using System.Web;
using System.Configuration;

namespace VSOnline.VSECommerce.Utilities
{
    public class MailClient
    {
        private SmtpClient SmtpServer
        {
            get
            {
                SmtpClient SmtpServer = new SmtpClient();                
                return SmtpServer;
            }
          
        }    

        public bool SendMail(string toMail, string mailBody, Enums.MailTemplate templateEnum)
        {
            try
            {
                if (!string.IsNullOrEmpty(toMail)  && !toMail.ToLower().Contains("test.com"))
                {
                    MailMessage mail = new MailMessage();
                    mail.IsBodyHtml = true;
                    mail.From = new MailAddress(GetFromEmailId(templateEnum), GetFromEmailDisplayName(templateEnum));
                    mail.To.Add(toMail);
                    if(templateEnum == Enums.MailTemplate.OrderConfirmation || templateEnum == Enums.MailTemplate.ProductRequestQuery)
                    {
                        mail.Bcc.Add("yourmail@gmail.com");
                    }
                    mail.Subject = GetSubject(templateEnum);
                    mail.Body = mailBody;
                    SmtpServer.Send(mail);
                    return true;
                }                
            }
            catch
            {
                  
            }
            return false;
        }

        public string GetSubject(Enums.MailTemplate templateEnum)
        {
            switch(templateEnum)
            {
                case Enums.MailTemplate.RetailerAccountCreated:
                    return "Retailer Account Created - Explore your new account now!";
                case Enums.MailTemplate.UserAccountCreated:
                    return "User Account Created - Explore your new account now!";
                case Enums.MailTemplate.WelcomeEmail:
                    return "Welcome to Online Shopping Mall within your reach";
                case Enums.MailTemplate.ForgotPassword:
                    return "Password Reset instruction";
                case Enums.MailTemplate.ProductRequestQuery:
                    return "Product Enquiry";
                case Enums.MailTemplate.ProductReplyMessage:
                    return "Product Enquiry - Response";
                case Enums.MailTemplate.OrderConfirmation:
                    return "Order Confirmation";
                case Enums.MailTemplate.OrderCancellation:
                    return "Order Cancellation";
                case Enums.MailTemplate.SiteAdminInformation:
                    return "Information from Site";
            }
            return "Thanks for being a part of VBuy.in";
        }


        public string GetFromEmailId(Enums.MailTemplate templateEnum)
        {
            switch (templateEnum)
            {
                case Enums.MailTemplate.UserAccountCreated:
                case Enums.MailTemplate.RetailerAccountCreated:
                    return "yourmail@gmail.com";
                case Enums.MailTemplate.WelcomeEmail:
                    return "yourmail@gmail.com";               
            }
            return "yourmail@gmail.com";
        }


        public string GetFromEmailDisplayName(Enums.MailTemplate templateEnum)
        {
            switch (templateEnum)
            {
                case Enums.MailTemplate.RetailerAccountCreated:
                    return "Seller CRM";
                case Enums.MailTemplate.UserAccountCreated:
                    return "User Verification";
                case Enums.MailTemplate.ForgotPassword:
                    return "Support";
                case Enums.MailTemplate.WelcomeEmail:
                    return "Your Name";
                case Enums.MailTemplate.OrderConfirmation:
                    return "Order Confirmation";
                case Enums.MailTemplate.OrderCancellation:
                    return "Order Cancellation";

            }
            return "Online Shopping Mall - Support";
        }

        public string GetMailBody(Enums.MailTemplate templateEnum)
        {
            string body = "";
            //Read template file from the App_Data folder
            string eMailTemplateLocation = @"~/" + @"EmailTemplates/";
            string retailerMailTemplateLocation = @"~/" + @"EmailTemplates/";

            switch (templateEnum)
            {
                case Enums.MailTemplate.RetailerAccountCreated:
                    using (var sr = new StreamReader(HttpContext.Current.Server.MapPath(retailerMailTemplateLocation + "RetailerRegistration.html")))
                    {                           
                        body = sr.ReadToEnd();
                    }
                    break;
                case Enums.MailTemplate.WelcomeEmail:
                    using (var sr = new StreamReader(HttpContext.Current.Server.MapPath(eMailTemplateLocation + "WelcomeMail.html")))
                    {
                        body = sr.ReadToEnd();
                    }
                    break;
                case Enums.MailTemplate.UserAccountCreated:
                    using (var sr = new StreamReader(HttpContext.Current.Server.MapPath(eMailTemplateLocation + "WelcomeMail.html")))
                    {
                        body = sr.ReadToEnd();
                    }
                    break;
                case Enums.MailTemplate.ForgotPassword:
                    using (var sr = new StreamReader(HttpContext.Current.Server.MapPath(eMailTemplateLocation + "ForgotPassword.html")))
                    {
                        body = sr.ReadToEnd();
                    }
                    break;
                case Enums.MailTemplate.ProductRequestQuery:
                    using (var sr = new StreamReader(HttpContext.Current.Server.MapPath(eMailTemplateLocation + "ProductRequestMail.html")))
                    {
                        body = sr.ReadToEnd();
                    }
                    break;
                case Enums.MailTemplate.ProductReplyMessage:
                    using (var sr = new StreamReader(HttpContext.Current.Server.MapPath(retailerMailTemplateLocation + "ProductReplyMail.html")))
                    {
                        body = sr.ReadToEnd();
                    }
                    break;
                case Enums.MailTemplate.OrderConfirmation:
                    using (var sr = new StreamReader(HttpContext.Current.Server.MapPath(eMailTemplateLocation + "OrderConfirmation.html")))
                    {
                        body = sr.ReadToEnd();
                    }
                    break;
                case Enums.MailTemplate.OrderCancellation:
                    using (var sr = new StreamReader(HttpContext.Current.Server.MapPath(eMailTemplateLocation + "OrderCancellation.html")))
                    {
                        body = sr.ReadToEnd();
                    }
                    break;
                case Enums.MailTemplate.SiteAdminInformation:
                    using (var sr = new StreamReader(HttpContext.Current.Server.MapPath(eMailTemplateLocation + "SiteAdminInformation.html")))
                    {
                        body = sr.ReadToEnd();
                    }
                    break;
            }
            return body;
        }        
    }
}
