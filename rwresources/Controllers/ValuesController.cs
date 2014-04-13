using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IO;
//using Newtonsoft.Json;
using System.Xml;


namespace rwresources2.Controllers
{
    public class ValuesController : ApiController
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

        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            System.Net.WebHeaderCollection headers = new System.Net.WebHeaderCollection();
            headers.Add("X-EBAY-API-SITEID", "100");
            headers.Add("X-EBAY-API-COMPATIBILITY-LEVEL", "865");
            headers.Add("X-EBAY-API-DEV-NAME", "481891e7-46d4-4a19-8992-bbfef42842b7");
            headers.Add("X-EBAY-API-APP-NAME", "Roadwire-36ca-46dd-ac36-2e3a7ba40080");
            headers.Add("X-EBAY-API-CERT-NAME", "a562fc05-3f60-4d85-a9ce-249b4ec4cbc1");
            
            headers.Add("X-EBAY-API-CALL-NAME", "GeteBayOfficialTime");

            string url = "https://api.ebay.com/ws/api.dll";

            string xmlStr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
                "<GeteBayOfficialTimeRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">" +
                "<RequesterCredentials>" +
                "<eBayAuthToken>AgAAAA**AQAAAA**aAAAAA**34OnUg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6AFmYOlDJOGoAqdj6x9nY+seQ**RvwBAA**AAMAAA**uJrlEq/jW5TA7bd7pudUzSkEduO9/DDHyzvmjj8ODZRJx1UOa5eD9sX9vr+eLgtJNfiSOlhTGUIvttnchd+Zr7eYNc/F6X8HVPEkoMWDA3QKFI6TRi4Ried0sZYs9riP3VZ8KiNe6FIt2G1DVbtc6G4IwDADb1JE8D5xJ92AQYmiJCSDVPEKfuBSMkmr2z+OxCjzVep4QxowLdGl6DoxV2CloPsaYYOxF4oMlKZUSnvsLO7AlHIsPO+NyjB644obwNsImitwKqAEceyOIhRZFaCih598BrRSnnIxk8q+kiSD1Hn+RlYLiAlO2tP3C9+Aw9ja1rl5DGaDvaxkHl2gak+Z05boZoTxMYRlkX8n3qjv1DSRaQccM1eFykTpLKLR2P9JxcSDLwkHb1u1PYQSa6xw2gL7smJKymxOGpMRm3KjGkZhhiC27CnzSQP3oxnOPSdKJYoMaBp05olAx8IHUWXpv6SgqSckrWQ+9iqexPrJ6Wr5gRSEgSFOgv+/R0VK8JN6xxAxebZrPH9NOVP9w3RS/6ecG+9jEKry/3mcb6mIVBdUQadQ+4kiGLv88Pyag8pW9eBcqDFVkbEJBbJdAS98Tlu44gSaEQCwm/wTSSRwY3Fbn/KPiSIvRFA0h3UKFdLNftGbqhiGLbX9t7KgsK7PFx+/cejpPhhVCUfg42qRrUHycU56TvBfRDygodz7ydnXnq/HjDEiVB3EbR8mrLgTb7piLGgKgbV/vmGnyq3hsUCCpqzDCsQvuPksTo1N</eBayAuthToken>" +
                "</RequesterCredentials>" +
                "</GeteBayOfficialTimeRequest>";

            string resp = WebRequestPostData(url, xmlStr, headers);
            //return resp;

            XmlDocument doc = new XmlDocument();
            doc.LoadXml(resp);
            string json = Newtonsoft.Json.JsonConvert.SerializeXmlNode(doc);
            return json;
            //return "value";
        }

        // POST api/values
        public string Post([FromBody]string xmlStr)
        {
            System.Net.WebHeaderCollection headers = new System.Net.WebHeaderCollection();
            headers.Add("X-EBAY-API-SITEID", "100");
            headers.Add("X-EBAY-API-COMPATIBILITY-LEVEL", "865");
            headers.Add("X-EBAY-API-DEV-NAME", "481891e7-46d4-4a19-8992-bbfef42842b7");
            headers.Add("X-EBAY-API-APP-NAME", "Roadwire-36ca-46dd-ac36-2e3a7ba40080");
            headers.Add("X-EBAY-API-CERT-NAME", "a562fc05-3f60-4d85-a9ce-249b4ec4cbc1");

            headers.Add("X-EBAY-API-CALL-NAME", "GeteBayOfficialTime");

            string url = "https://api.ebay.com/ws/api.dll";

            //string xmlStr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
            //    "<GeteBayOfficialTimeRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">" +
            //    "<RequesterCredentials>" +
            //    "<eBayAuthToken>AgAAAA**AQAAAA**aAAAAA**34OnUg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6AFmYOlDJOGoAqdj6x9nY+seQ**RvwBAA**AAMAAA**uJrlEq/jW5TA7bd7pudUzSkEduO9/DDHyzvmjj8ODZRJx1UOa5eD9sX9vr+eLgtJNfiSOlhTGUIvttnchd+Zr7eYNc/F6X8HVPEkoMWDA3QKFI6TRi4Ried0sZYs9riP3VZ8KiNe6FIt2G1DVbtc6G4IwDADb1JE8D5xJ92AQYmiJCSDVPEKfuBSMkmr2z+OxCjzVep4QxowLdGl6DoxV2CloPsaYYOxF4oMlKZUSnvsLO7AlHIsPO+NyjB644obwNsImitwKqAEceyOIhRZFaCih598BrRSnnIxk8q+kiSD1Hn+RlYLiAlO2tP3C9+Aw9ja1rl5DGaDvaxkHl2gak+Z05boZoTxMYRlkX8n3qjv1DSRaQccM1eFykTpLKLR2P9JxcSDLwkHb1u1PYQSa6xw2gL7smJKymxOGpMRm3KjGkZhhiC27CnzSQP3oxnOPSdKJYoMaBp05olAx8IHUWXpv6SgqSckrWQ+9iqexPrJ6Wr5gRSEgSFOgv+/R0VK8JN6xxAxebZrPH9NOVP9w3RS/6ecG+9jEKry/3mcb6mIVBdUQadQ+4kiGLv88Pyag8pW9eBcqDFVkbEJBbJdAS98Tlu44gSaEQCwm/wTSSRwY3Fbn/KPiSIvRFA0h3UKFdLNftGbqhiGLbX9t7KgsK7PFx+/cejpPhhVCUfg42qRrUHycU56TvBfRDygodz7ydnXnq/HjDEiVB3EbR8mrLgTb7piLGgKgbV/vmGnyq3hsUCCpqzDCsQvuPksTo1N</eBayAuthToken>" +
            //    "</RequesterCredentials>" +
            //    "</GeteBayOfficialTimeRequest>";

            string resp = WebRequestPostData(url, xmlStr, headers);
            return resp;
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
            string x = value;
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
