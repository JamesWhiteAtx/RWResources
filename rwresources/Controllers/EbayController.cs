using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace rwresources.Controllers
{
    public class EbayController : Controller
    {
        //
        // GET: /Ebay/
        public ActionResult Index()
        {
            CompilationSection section = ConfigurationManager.GetSection("system.web/compilation") as CompilationSection;

            string reqJsUri = "/scripts/reqjsmain.js";

            if (!section.Debug)
            {
                Uri u = new Uri(new Uri(Request.Url.GetLeftPart(UriPartial.Authority)),reqJsUri);
                reqJsUri = u.AbsoluteUri;
                ViewBag.BodyClass = "fill-body-host";
            }
            else
            {
                ViewBag.BodyClass = "fill-body-free";
            }

            ViewBag.ReqJsUri = reqJsUri;

            Response.AppendHeader("Access-Control-Allow-Origin", "*");
            return PartialView();
        }

        
        public ActionResult Partial(string name)
        {
            if (name == null)
            {
                name = "Default";
            }

            CompilationSection section = ConfigurationManager.GetSection("system.web/compilation") as CompilationSection;
            if (!section.Debug)
            {
                ViewBag.BodyClass = "fill-body-host";
            }
            else
            {
                ViewBag.BodyClass = "fill-body-free";
            }
            
            Response.AppendHeader("Access-Control-Allow-Origin", "*");
            return PartialView("Partials/" + name);
        }
	}
}