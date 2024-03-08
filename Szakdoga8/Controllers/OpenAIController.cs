using Microsoft.AspNetCore.Mvc;
using OpenAI_API.Completions;
using OpenAI_API;

namespace Szakdoga8.Controllers
{
    public class OpenAIController : Controller
    {
        [HttpPost]
        [Route("getOpenAITranslation")]
        public IActionResult GetResult( string text, string fromLanguage, string toLanguage)
        {
            //your OpenAI API key
            string apiKey = "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";
            string answer = string.Empty;
            var openai = new OpenAIAPI(apiKey);
            CompletionRequest completion = new CompletionRequest();
            completion.Prompt = $"Please translate the following text from {fromLanguage} to {toLanguage}: {text}";
           // completion.Model = OpenAI_API.Model.DavinciText;
            completion.MaxTokens = 4000;
            var result = openai.Completions.CreateCompletionAsync(completion);
            if (result != null)
            {
                foreach (var item in result.Result.Completions)
                {
                    answer = item.Text;
                }
                return Ok(answer);
            }
            else
            {
                return BadRequest("Not found");
            }
        }
    }
}
