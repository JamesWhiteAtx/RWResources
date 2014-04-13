using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Xml;

namespace rwresources.Controllers
{
    public class EbayApiController : ApiController
    {
        private static string WebRequestPostData(string url, string postData, System.Net.WebHeaderCollection headers)
        {
            System.Net.WebRequest req = System.Net.WebRequest.Create(url);

            req.ContentType = "text/xml; encoding='utf-8'";
            req.Method = "POST";
            if (headers != null)
            {
                req.Headers = headers;  //.Add("HTTP_HOST", "MyZone");
            }

            byte[] bytes = System.Text.Encoding.ASCII.GetBytes(postData);
            req.ContentLength = bytes.Length;

            using (Stream os = req.GetRequestStream())
            {
                os.Write(bytes, 0, bytes.Length);
            }

            using (System.Net.WebResponse resp = req.GetResponse())
            {
                if (resp == null) return null;

                using (System.IO.StreamReader sr = new System.IO.StreamReader(resp.GetResponseStream()))
                {
                    return sr.ReadToEnd().Trim();
                }
            }
        }

        public string EbayTradingApiReq(string call, string url, string xmlStr)
        {
            System.Net.WebHeaderCollection headers = new System.Net.WebHeaderCollection();
            headers.Add("X-EBAY-API-SITEID", "100");
            headers.Add("X-EBAY-API-COMPATIBILITY-LEVEL", "865");
            headers.Add("X-EBAY-API-DEV-NAME", "481891e7-46d4-4a19-8992-bbfef42842b7");
            headers.Add("X-EBAY-API-APP-NAME", "Roadwire-36ca-46dd-ac36-2e3a7ba40080");
            headers.Add("X-EBAY-API-CERT-NAME", "a562fc05-3f60-4d85-a9ce-249b4ec4cbc1");

            headers.Add("X-EBAY-API-CALL-NAME", call);

            string resp = WebRequestPostData(url, xmlStr, headers);
            //return resp;

            XmlDocument doc = new XmlDocument();
            doc.LoadXml(resp);
            string json = Newtonsoft.Json.JsonConvert.SerializeXmlNode(doc);
            return json;
        }

        // POST EbayApi/GeteBayOfficialTime
        public string Post(string call, [FromBody]string xmlStr)
        {
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
            return EbayTradingApiReq(call, "https://api.ebay.com/ws/api.dll", xmlStr);
        }

        // POST EbayApi/GeteBayOfficialTime/sandbox
        public string Post(string call, string site, [FromBody]string xmlStr)
        {
            string url;
            if (site != null)
            {
                url = "https://api.ebay.com/ws/api.dll";
            }
            else
            {
                url = "https://api.ebay.com/ws/api.dll";
            }

            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
            return EbayTradingApiReq(call, url, xmlStr);
        }

        //// GET EbayApi/GeteBayOfficialTime
        //public string Get(string call)
        //{
        //    return Get(call, (string)null);
        //}

        //// GET EbayApi/GeteBayOfficialTime/sandbox
        //public string Get(string call, string site)
        //{
        //    string url;
        //    if (site != null) { 
        //        url = "https://api.ebay.com/ws/api.dll";
        //    }
        //    else
        //    {
        //        url = "https://api.ebay.com/ws/api.dll"; 
        //    }
        //    return EbayTradingApiReq(call, url);
        //}

    }
}
