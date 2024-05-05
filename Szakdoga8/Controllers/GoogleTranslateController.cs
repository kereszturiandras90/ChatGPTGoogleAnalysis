using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Web;
using Szakdoga8.Logic;
using Szakdoga8.Translations;
using static System.Net.Mime.MediaTypeNames;

namespace Szakdoga8.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleTranslateController : Controller
    {

        private readonly TranslationsContext _context;
        private readonly TranslationLogic _logic;

        public GoogleTranslateController(TranslationsContext context, TranslationLogic logic)
        {
            _context = context;
            _logic = logic;
        }


        [HttpPost]
       // [Route("getGoogleTranslation")]
        public async Task<ActionResult<Translation>> TranslateText(Translation translation)
        {
             translation.OutputTextGpt = _logic.ChatGPTTranslation(translation.InputText, translation.SourceLanguage, translation.TargetLanguage);
            translation.OutputTextGoogle = _logic.GoogleTranslation(translation.InputText, translation.SourceLanguage, translation.TargetLanguage);

            if (translation.ReferenceTranslation != null && translation.ReferenceTranslation != "") {

                translation.GoogleBleu = _logic.CalculateBLEU(translation.ReferenceTranslation, translation.OutputTextGoogle);
                translation.Gptbleu = _logic.CalculateBLEU(translation.ReferenceTranslation, translation.OutputTextGpt);
            }

            if (translation.IsBackTranslationActive == true) {
                translation.GoogleBackTranslation = _logic.GoogleTranslation(translation.OutputTextGoogle, translation.TargetLanguage, translation.SourceLanguage);
                translation.GptBackTranslation = _logic.ChatGPTTranslation(translation.OutputTextGpt, translation.TargetLanguage, translation.SourceLanguage);
            }

            _context.Translations.Add(translation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLatestTranslation", new { id = translation.Id }, translation);
        }
      /*  [HttpGet]
        public async Task<ActionResult<Translation>> DetectLanguage(Translation translation) {
            translation.SourceLanguage = _logic.DetectLanguage(translation.InputText);

            return translation;

        }*/

        [HttpGet]
        public async Task<ActionResult<Translation>> GetLatestTranslation()
        {
            var translation =  _context.Translations.OrderByDescending(x => x.Id).FirstOrDefault();

            if (translation == null)
            {
                return NotFound();
            }

            return translation;
        }

        [HttpPut()]
        public async Task<IActionResult> AddRating(Translation updateTranslation)
        {
            var translation = _context.Translations.OrderByDescending(x => x.Id).FirstOrDefault();

            if (translation == null)
            {
                return NotFound();
            }

            translation.Feedback = updateTranslation.Feedback;
            translation.FeedbackGoogle = updateTranslation.FeedbackGoogle;
            translation.FeedbackGpt = updateTranslation.FeedbackGpt;
            translation.GptLike = updateTranslation.GptLike;
            translation.GoogleLike = updateTranslation.GoogleLike;
            translation.Classification = updateTranslation.Classification;

            await _context.SaveChangesAsync();

            return Ok(translation);


        }


    }
}
