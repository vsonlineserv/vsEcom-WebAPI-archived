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
using VSOnline.VSECommerce.Web.Models;
using VSOnline.VSECommerce.Utilities;

namespace VSOnline.VSECommerce.Web.Helpers
{
    public class WebSession
    {
        public static WebUserContext AppUser
        {
            get
            {
                WebUserContext appUser = null;
                if(HttpContext.Current.Session != null)
                {
                appUser = HttpContext.Current.Session[Constants.SessionKeys.UserKey] as WebUserContext;
                }

                if(appUser ==null)
                {
                    //Authentication.SignOut();                    
                }
                return appUser;
            }
            set
            {
                HttpContext.Current.Session[Constants.SessionKeys.UserKey] = value;
            }
        }
    }
}