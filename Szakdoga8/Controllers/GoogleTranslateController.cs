using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Web;

namespace Szakdoga8.Controllers
{
    public class GoogleTranslateController : Controller
    {
        [HttpPost]
        [Route("getGoogleTranslation")]
        public IActionResult TranslateText(string text, string fromLanguage, string toLanguage)
        {
            // var toLanguage = "de";//English
            // var fromLanguage = "en";//Deutsch
            var url = $"https://translate.googleapis.com/translate_a/single?client=gtx&sl={fromLanguage}&tl={toLanguage}&dt=t&q={HttpUtility.UrlEncode(text)}";
            var webClient = new WebClient
            {
                Encoding = System.Text.Encoding.UTF8
            };
            var result = webClient.DownloadString(url);
            try
            {
                result = result.Substring(4, result.IndexOf("\"", 4, StringComparison.Ordinal) - 4);
                return Ok(result);
            }
            catch
            {
                return BadRequest("Not found");
            }
        }
    }
}
