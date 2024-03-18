using OpenAI_API.Completions;
using OpenAI_API;
using System.Net;
using System.Web;
using System.CodeDom;
using LanguageDetection;
using static System.Net.Mime.MediaTypeNames;

namespace Szakdoga8.Logic
{
    public class TranslationLogic
    {

        public TranslationLogic()
        {
            

        }
        public  string GoogleTranslation(string text, string fromLanguage, string toLanguage)
        {
            var url = $"https://translate.googleapis.com/translate_a/single?client=gtx&sl={fromLanguage}&tl={toLanguage}&dt=t&q={HttpUtility.UrlEncode(text)}";
            var webClient = new WebClient
            {
                Encoding = System.Text.Encoding.UTF8
            };
            var result = webClient.DownloadString(url);
            try
            {
                result = result.Substring(4, result.IndexOf("\"", 4, StringComparison.Ordinal) - 4);
                return result;
            }
            catch
            {
                return null;
            }
        }

        public  string ChatGPTTranslation(string text, string fromLanguage, string toLanguage) {
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
                answer = answer.Substring(answer.LastIndexOf('\n') + 1);
                return answer;
            }
            else
            {
                return null;
            }
        }

        public string DetectLanguage(string text)
        {
            var detector = new LanguageDetector();
            detector.AddAllLanguages();
            return detector.Detect(text).Substring(0,2);
        }
    }
}
