using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;

namespace WebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            /*var cors = new EnableCorsAttribute("*","*","*");*/ //If you get an 'Access-Control-Allow-Origin' error when you request an external api project, you need to install the Microsoft.AspNet.Cors library from Nuget Package Manager to the location of the api project and give it permissions. Like here, we can open to all requests as well as limit them.
            //config.EnableCors(cors);

            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            //Custom Route
            config.Routes.MapHttpRoute(
                name: "searhMovie",
                routeTemplate: "api/movie/{param}", new { controller = "movies", action = "GetSearchMovie" } //I added a custom route for the search process.
                );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}", //We added the action to the Default Route. Requests come with the action name.
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
