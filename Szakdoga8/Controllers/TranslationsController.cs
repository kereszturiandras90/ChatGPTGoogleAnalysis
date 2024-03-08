﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Szakdoga8.Translations;

namespace Szakdoga8.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TranslationsController : ControllerBase
    {
        private readonly TranslationsContext _context;

        public TranslationsController(TranslationsContext context)
        {
            _context = context;
        }

        // GET: api/Translations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Translation>>> GetTranslations()
        {
            return await _context.Translations.ToListAsync();
        }

        // GET: api/Translations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Translation>> GetTranslation(long id)
        {
            var translation = await _context.Translations.FindAsync(id);

            if (translation == null)
            {
                return NotFound();
            }

            return translation;
        }

        // PUT: api/Translations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTranslation(long id, Translation translation)
        {
            if (id != translation.Id)
            {
                return BadRequest();
            }

            _context.Entry(translation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TranslationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Translations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Translation>> PostTranslation(Translation translation)
        {
            _context.Translations.Add(translation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTranslation", new { id = translation.Id }, translation);
        }

        // DELETE: api/Translations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTranslation(long id)
        {
            var translation = await _context.Translations.FindAsync(id);
            if (translation == null)
            {
                return NotFound();
            }

            _context.Translations.Remove(translation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TranslationExists(long id)
        {
            return _context.Translations.Any(e => e.Id == id);
        }
    }
}
