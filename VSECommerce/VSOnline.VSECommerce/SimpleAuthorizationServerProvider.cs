////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce 
///////////////////////////////////////////////////////////////////////////////////////////
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using VSOnline.VSECommerce.Utilities;
using System.Net.Http;
using System.Net.Http.Headers;
using System.IO;
using System.Configuration;
using Microsoft.AspNet.Identity.EntityFramework;

namespace VSOnline.VSECommerce.Web
{
    public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {

            string clientId = string.Empty;
            string clientSecret = string.Empty;
            Client client = null;

            if (!context.TryGetBasicCredentials(out clientId, out clientSecret))
            {
                context.TryGetFormCredentials(out clientId, out clientSecret);
            }

            if (context.ClientId == null || context.ClientId == "VBuyAdminPanel")
            {
                //Remove the comments from the below line context.SetError, and invalidate context 
                //if you want to force sending clientId/secrects once obtain access tokens. 
                context.Validated();
                //context.SetError("invalid_clientId", "ClientId should be sent.");
                return Task.FromResult<object>(null);

            }

            //  client = _repo.FindClient(context.ClientId);
            client = null;


            if (client == null)
            {
                context.SetError("invalid_clientId", string.Format("Client '{0}' is not registered in the system.", context.ClientId));
                return Task.FromResult<object>(null);
            }

            if (client.ApplicationType == ApplicationTypes.NativeConfidential)
            {
                if (string.IsNullOrWhiteSpace(clientSecret))
                {
                    context.SetError("invalid_clientId", "Client secret should be sent.");
                    return Task.FromResult<object>(null);
                }
                else
                {
                    //if (client.Secret != Helper.GetHash(clientSecret))
                    //{
                    //    context.SetError("invalid_clientId", "Client secret is invalid.");
                    //    return Task.FromResult<object>(null);
                    //}
                }
            }

            if (!client.Active)
            {
                context.SetError("invalid_clientId", "Client is inactive.");
                return Task.FromResult<object>(null);
            }

            context.OwinContext.Set<string>("as:clientAllowedOrigin", client.AllowedOrigin);
            context.OwinContext.Set<string>("as:clientRefreshTokenLifeTime", client.RefreshTokenLifeTime.ToString());

            context.Validated();
            return Task.FromResult<object>(null);
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            var allowedOrigin = context.OwinContext.Get<string>("as:clientAllowedOrigin");

            if (allowedOrigin == null) allowedOrigin = "*";

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Credentials", new[]{"true"});

            bool flagVerify = true;
            string strCode = ConfigurationManager.AppSettings["AdminUserCode"].ToString();

            IdentityUser user = null;
            string userRole = Enums.Role.Guests.ToString();
            //await _repo.FindUser(context.UserName, context.Password);
            Domain.UserService userService = new Domain.UserService();

            if (userService.ValidateUser(context.UserName, context.Password))
            {
                user = new IdentityUser(context.UserName);
                userRole = userService.GetUserRole(context.UserName).ToString();
            }

                if(userRole == Enums.Role.Administrators.ToString() ||userRole == Enums.Role.SalesSupport.ToString())
                {
                    if (context.Scope != null && context.Scope.Count > 0 && context.Scope[0] == strCode)
                    {
                        flagVerify = true;
                    }
                    else
                    {
                        flagVerify = false;
                        user = null;
                    }
                }

            if (user == null)
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.");
                return;
            }


            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
            identity.AddClaim(new Claim("sub", context.UserName));
            identity.AddClaim(new Claim(ClaimTypes.Role, userRole));

            var props = new AuthenticationProperties(new Dictionary<string, string>
                {
                    { 
                        "as:client_id", (context.ClientId == null) ? string.Empty : context.ClientId
                    },
                    { 
                        "userName", context.UserName
                    }
                });

            var ticket = new AuthenticationTicket(identity, props);
            context.Validated(ticket);
                      

        }

        public override async Task GrantCustomExtension(OAuthGrantCustomExtensionContext context)
        {
            
            if (context.Parameters["grant_type"] == "social_login" && context.Parameters["tokenOrigin"] == "facebook")
            {
                var facebookclient = new FacebookClient(context.Parameters["access_token"]);

                var parameters = new Dictionary<string, object>();
                parameters["fields"] = "id,name, email";

                dynamic result = facebookclient.Get("me", parameters);
                var id = result.id;
                string name = result.name;
                string email = result.email;
                if (!string.IsNullOrEmpty(email))
                {
                    ValidateUserAndProceed(name, email, context);
                }
            }

            else if (context.Parameters["grant_type"] == "social_login" && context.Parameters["tokenOrigin"] == "google")
            {

                string URL = "https://www.googleapis.com/oauth2/v1/userinfo";
                string urlParameters = "?access_token=" + context.Parameters["access_token"];
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(URL);

                // Add an Accept header for JSON format.
                client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

                // List data response.
                HttpResponseMessage response = client.GetAsync(urlParameters).Result;  // Blocking call!
                if (response.IsSuccessStatusCode)
                {
                    string userDetailsString = await response.Content.ReadAsStringAsync();

                    GoogleUserDataObject userObj = Newtonsoft.Json.JsonConvert.DeserializeObject<GoogleUserDataObject>(userDetailsString);

                    if (!string.IsNullOrEmpty(userObj.email))
                    {
                            string name = userObj.name;
                            string email = userObj.email;
                            ValidateUserAndProceed(name, email, context);                        
                    }
                }
            }

        }
 

        private void ValidateUserAndProceed(string name, string email, OAuthGrantCustomExtensionContext context)
        {
            IdentityUser user = null;
            string userRole = Enums.Role.Guests.ToString();

            Domain.UserService userService = new Domain.UserService();

            if (userService.ValidateAndCreateUser(email, name))
            {
                user = new IdentityUser(email);
                userRole = userService.GetUserRole(email).ToString();
            }
            if (user == null)
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.");
                return;
            }


            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim(ClaimTypes.Name, user.UserName));
            identity.AddClaim(new Claim("sub", user.UserName));
            identity.AddClaim(new Claim(ClaimTypes.Role, userRole));

            var props = new AuthenticationProperties(new Dictionary<string, string>
                        {
                            { 
                                "as:client_id", (context.ClientId == null) ? string.Empty : context.ClientId
                            },
                            { 
                                "userName", email
                            }
                        });

            var ticket = new AuthenticationTicket(identity, props);
            context.Validated(ticket);
        }
    }

    public class GoogleUserDataObject
    {
        public string id {get; set;}
        public string email {get; set;}
        public string verified_email {get; set;}
        public string name {get; set;}
        public string given_name {get; set;}
        public string link {get; set;}
        public string picture {get; set;}
        public string gender {get; set;}
        public string locale {get; set;}
    }
}