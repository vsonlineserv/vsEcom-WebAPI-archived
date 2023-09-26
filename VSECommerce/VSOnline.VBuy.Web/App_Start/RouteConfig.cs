using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace VSOnline.VSECommerce.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Return",
                url: "PaymentGatewayReturn/Result/",
                defaults: new { controller = "PaymentGatewayReturn", action = "Result", id = UrlParameter.Optional }
            );
        }
    }
}