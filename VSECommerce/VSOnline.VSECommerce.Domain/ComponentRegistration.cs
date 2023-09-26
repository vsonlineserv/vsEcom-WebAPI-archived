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
using System.Reflection;
using VSOnline.VSECommerce.Core.Caching;
using Autofac;

namespace VSOnline.VSECommerce.Domain
{
    public static class ComponentRegistration
    {
        public static void RegisterService(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly());
            builder.RegisterType<EfUnitOfWork>().As<IUnitOfWork>();
            builder.RegisterType<ShoppingCartRepository>().As<IShoppingCartRepository>();
            //For now we are only registering Static Cache. Later we need to include Request Cache and
            //based on controller and action, we will specify here in Autofac.
            builder.RegisterType<StaticCache>().As<ICache>().SingleInstance();
            builder.RegisterType<CacheManager<StaticCache>>().As<ICacheManager>().SingleInstance(); 
        }

        //We can write framework for dependency management seperately later        
        //with LifetimeScope,Singleton, and ILifetimeScopeProvider.
        //Also we can include Dependency Management ->ContainerManager 

    }

    //We need to include these similar logic later. Added here, for ease of search in google later.
    
    //public static class ContainerManagerExtensions
    //{
    //    public static IRegistrationBuilder<TLimit, TActivatorData, TRegistrationStyle> PerLifeStyle<TLimit, TActivatorData, TRegistrationStyle>(this IRegistrationBuilder<TLimit, TActivatorData, TRegistrationStyle> builder, ComponentLifeStyle lifeStyle)
    //    {
    //        switch (lifeStyle)
    //        {
    //            case ComponentLifeStyle.LifetimeScope:
    //                return HttpContext.Current != null ? builder.InstancePerHttpRequest() : builder.InstancePerLifetimeScope();
    //            case ComponentLifeStyle.Transient:
    //                return builder.InstancePerDependency();
    //            case ComponentLifeStyle.Singleton:
    //                return builder.SingleInstance();
    //            default:
    //                return builder.SingleInstance();
    //        }
    //    }

    //    public static IRegistrationBuilder<TLimit, TReflectionActivatorData, TStyle> WithStaticCache<TLimit, TReflectionActivatorData, TStyle>(this IRegistrationBuilder<TLimit, TReflectionActivatorData, TStyle> registration) where TReflectionActivatorData : ReflectionActivatorData
    //    {
    //        return registration.WithParameter(Autofac.Core.ResolvedParameter.ForNamed<ICacheManager>("static"));
    //    }

    //    public static IRegistrationBuilder<TLimit, TReflectionActivatorData, TStyle> WithRequestCache<TLimit, TReflectionActivatorData, TStyle>(this IRegistrationBuilder<TLimit, TReflectionActivatorData, TStyle> registration) where TReflectionActivatorData : ReflectionActivatorData
    //    {
    //        return registration.WithParameter(Autofac.Core.ResolvedParameter.ForNamed<ICacheManager>("request"));
    //    }

    //}
}
