using System;
using System.Collections.Generic;
using System.Reflection;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using Autofac;
using Autofac.Builder;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using VSOnline.VSECommerce.Domain;
using VSOnline.VSECommerce.Utilities;
using System.Web.Optimization;
using VSOnline.VSECommerce.Core.Caching;
using VSOnline.VSECommerce.Web;
using System.Web.Http.Filters;

namespace VSOnline.VSECommerce.Web
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            RegisterAutoFacComponents();

            AreaRegistration.RegisterAllAreas();
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            GlobalConfiguration.Configuration.Filters.Add(new AddCustomHeaderFilter());
            //we use grunt
           // BundleConfig.RegisterBundles(BundleTable.Bundles);

            new ObjectMapper().Execute();
            //can we remove cache here?

        }

        protected void Application_Error(object sender, EventArgs e)
        {
            Exception exc = Server.GetLastError();
            // Clear the error from the server
            Response.Write(
      "<p>" + exc.Message + "</p>\n");
            Server.ClearError();
        }

        private void RegisterAutoFacComponents()
        {
            var builder = new ContainerBuilder();
            ComponentRegistration.RegisterService(builder);

            builder.RegisterControllers(Assembly.GetExecutingAssembly());
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            IContainer container = builder.Build(ContainerBuildOptions.IgnoreStartableComponents);
             
            var resolver = new AutofacWebApiDependencyResolver(container);
            GlobalConfiguration.Configuration.DependencyResolver = resolver;
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        } 
    }

    class AddCustomHeaderFilter : System.Web.Http.Filters.ActionFilterAttribute
    {
        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            if (actionExecutedContext != null && actionExecutedContext.Response != null && actionExecutedContext.Response.Content != null && actionExecutedContext.Response.Headers != null)
            {
                actionExecutedContext.Response.Content.Headers.Add("Engine", "VSECommerce-VSOnline");
            }
            base.OnActionExecuted(actionExecutedContext);
        }
    }
}