////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce.Persistence.Entity
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;

namespace VSOnline.VSECommerce.Persistence.Entity
{   
    public class ExternalAuthenticationRecord
    {
        public int AuthId { get; set; }
        public int User { get; set; }
        public string Email { get; set; }
        public string ExternalIdentifier { get; set; }
        public string ExternalDisplayIdentifier { get; set; }
        public string OAuthToken { get; set; }
        public string OAuthAccessToken { get; set; }
        public string ProviderSystemName { get; set; }
    
        public virtual User UserMap { get; set; }
    }
}
