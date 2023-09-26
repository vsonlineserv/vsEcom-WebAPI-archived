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
using VSOnline.VSECommerce.Persistence;

namespace VSOnline.VSECommerce.Domain
{
    public abstract class ServiceBase
    {
        protected ServiceBase(IUserContext userContext)
        {
            if (userContext == null) throw new ArgumentNullException("userContext");

            UserContext = userContext;
            Username = userContext.Username;
        }

        protected IUserContext UserContext { get; private set; }
        protected string Username { get; private set; }
    }
}
