using BLEU.Extensions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Szakdoga8.Controllers;
using Szakdoga8.Logic;
using Szakdoga8.Translations;

namespace Translator_Test
{
    [TestClass]
    public class MyTestClass
    {
        private TranslationLogic logic;

        [TestInitialize]
        public void Initialize()
        {
            // Initialize any shared objects or perform setup tasks here
            logic = new TranslationLogic();
        }

        [TestMethod]
        public void GoogleTranslation()
        {
            string text = "water";

            string result = logic.GoogleTranslation(text, "hu", "en");

            Assert.AreEqual(text, result);
        }

        [TestMethod]
        public void ChatGptTranslation()
        {
            string text = "víz";

            string result = logic.ChatGPTTranslation(text, "hu", "en");
            result =result.Replace(" ", "");

            Assert.AreEqual("water", result);
        }

        [TestMethod]

        public void DetectLanguage()
        {
            string text = "Tell me something!";

            string langCode = logic.DetectLanguage(text);

            Assert.AreEqual(langCode, "en");
        }

        [TestMethod]

        public void BLEU_short ()
        {
            string text = "Translating is difficult";
            string reference = "Translating is difficult";

            double result = logic.CalculateBLEU(text, reference);

            Assert.AreEqual(1, result);
        }

        [TestMethod]

        public void BLEU_long()
        {
            string text = "Translating is difficult, especially when you are tired";
            string reference = "Translating is difficult, especially when you are working";

            double result = logic.CalculateBLEU(text, reference);

            Assert.IsTrue(1 >= result && result >= 0);
        }


    }
}