using OpenAI_API.Completions;
using OpenAI_API;
using System.Net;
using System.Web;
using System.CodeDom;
using LanguageDetection;
using static System.Net.Mime.MediaTypeNames;
using BLEU;
using BleuNet;
using System.IO;
using System.Linq;

namespace Szakdoga8.Logic
{
    public class TranslationLogic
    {

        public TranslationLogic()
        {
            

        }
        public  string GoogleTranslation(string text, string fromLanguage, string toLanguage)
        {
            if (fromLanguage == "cn") {
                fromLanguage = "zh-CN";
            }

            if (toLanguage == "cn")
            {
                toLanguage = "zh-CN";
            }
            var url = $"https://translate.googleapis.com/translate_a/single?client=gtx&sl={fromLanguage}&tl={toLanguage}&dt=t&q={HttpUtility.UrlEncode(text)}";
            var webClient = new WebClient
            {
                Encoding = System.Text.Encoding.UTF8
            };
            var result = webClient.DownloadString(url);
            try
            {


                string resultFirstLine = result.Substring(4, result.IndexOf("\"", 4, StringComparison.Ordinal) - 4);
                resultFirstLine = resultFirstLine.Replace("\n", " ");
                resultFirstLine = resultFirstLine.Replace("\\n", " ");

                string substring = "]]],[";
                 string[] parts = result.Split(new string[] { substring }, StringSplitOptions.None);

                bool IsFirstElement = true;
                foreach (string part in parts)
                {
                    if (!IsFirstElement)
                    {
                        int index = part.IndexOf("\"");
                        if (index != -1)
                        {
             
                            string subpart = part.Substring(4, part.IndexOf("\"", 4, StringComparison.Ordinal) - 4);
                            subpart = subpart.Replace("\n", " ");
                            subpart = subpart.Replace("\\n", " ");
                            resultFirstLine = resultFirstLine + " " + subpart; 
                        }
                    } else
                    {
                        IsFirstElement = false;
                    }
                }
                return resultFirstLine;
            }
            catch
            {
                return null;
            }
        }

        public  string ChatGPTTranslation(string text, string fromLanguage, string toLanguage) {
            
            string apiKey = "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";
            string answer = string.Empty;
            var openai = new OpenAIAPI(apiKey);
            CompletionRequest completion = new CompletionRequest();
            completion.Prompt = $"Please translate the following text from {fromLanguage} to {toLanguage}: {text}";
            completion.MaxTokens = 1000;
            var result = openai.Completions.CreateCompletionAsync(completion);
            if (result != null)
            {
                foreach (var item in result.Result.Completions)
                {
                    answer = item.Text;
                }
                answer = answer.Replace('\n', ' ');
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

        public double CalculateBLEU(string reference, string candidate)
        {
            string[] referenceArray = reference.Split(' ');
            string[] candidateArray = candidate.Split(' ');

            double bleuScore;

            if (referenceArray.Length < 4)
            {
                bleuScore =  Metrics.SentenceBleu(referenceArray, candidateArray, weights: [0.5, 0.5]);
            }
            else {
                bleuScore = Metrics.SentenceBleu(referenceArray, candidateArray);
            }
            return bleuScore;

          //  BleuNet.Metrics. metric = new BleuMetric();
           // double bleuScore = Metrics.SentenceBleu(referenceArray, candidateArray);
            
            //Console.WriteLine($"BLEU Score: {bleuScore}");
        }
    }
}
