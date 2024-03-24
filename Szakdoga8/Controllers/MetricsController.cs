using Microsoft.AspNetCore.Mvc;
using Szakdoga8.Logic;
using Szakdoga8.Translations;

namespace Szakdoga8.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MetricsController : Controller
    {
        private readonly TranslationLogic _logic;

        public MetricsController(TranslationLogic logic)
        {
            _logic = logic;
        }
        [HttpPost]
        public async Task<ActionResult<Translation>> AddBLEU(Translation translation)
        {
            translation.GoogleBleu = _logic.CalculateBLEU(translation.ReferenceTranslation, translation.OutputTextGoogle);
            translation.Gptbleu = _logic.CalculateBLEU(translation.ReferenceTranslation, translation.OutputTextGpt);

            return Ok(translation);

        }
    }
}
