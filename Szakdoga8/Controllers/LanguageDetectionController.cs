using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using Szakdoga8.Logic;
using Szakdoga8.Translations;

namespace Szakdoga8.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LanguageDetectionController : Controller




    {
        private readonly TranslationLogic _logic;

        public LanguageDetectionController(TranslationLogic logic)
        {
            _logic = logic;
        }


        [HttpPost]
        public async Task<ActionResult<Translation>> DetectLanguage(Translation translation)
        {
            translation.SourceLanguage = _logic.DetectLanguage(translation.InputText);

            return Ok(translation);

        }
    }
}
