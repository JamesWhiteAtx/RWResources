using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace rwresources
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "EbayApi",
                routeTemplate: "ebayapi/{call}/{site}",
                defaults: new { controller = "EbayApi", site = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}