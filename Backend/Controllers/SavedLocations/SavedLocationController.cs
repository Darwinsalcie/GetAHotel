using GetAHotel.Context;
using GetAHotel.DTO;
using GetAHotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace GetAHotel.Controllers.SavedLocations
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SavedLocationController : Controller
    {
        private readonly AppDbContext _context;

        public SavedLocationController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SavedLocationDto>>> GetSavedLocations()
        {
            var userId = GetUserId();

            var locations = await _context.SavedLocations
                .Where(l => l.UserId == userId)
                .Select(l => new SavedLocationDto
                {
                    Id = l.Id,
                    LocationName = l.LocationName,
                    Latitude = l.Latitude,
                    Longitude = l.Longitude,
                })
                .ToListAsync();

            return Ok(locations);
        }



        [HttpPost]
        public async Task<ActionResult> CreateSavedLocation(CreateSavedLocationDto dto)
        {
            var userId = GetUserId();

            var location = new SavedLocation
            {
                LocationName = dto.LocationName,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,
                UserId = userId
            };

            _context.SavedLocations.Add(location);
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetSavedLocationById), new { id = location.Id }, location);

        }


        // GET: api/SavedLocations/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<SavedLocationDto>> GetSavedLocationById(int id)
        {
            var userId = GetUserId();

            var location = await _context.SavedLocations
                .Where(l => l.Id == id && l.UserId == userId)
                .Select(l => new SavedLocationDto
                {
                    Id = l.Id,
                    LocationName = l.LocationName,
                    Latitude = l.Latitude,
                    Longitude = l.Longitude
                })
                .FirstOrDefaultAsync();

            if (location == null)
                return NotFound();

            return Ok(location);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSavedLocation(int id, CreateSavedLocationDto dto)
        {
            var userId = GetUserId();

            var location = await _context.SavedLocations
                .FirstOrDefaultAsync(l => l.Id == id && l.UserId == userId);

            if (location == null)
                return NotFound();

            location.LocationName = dto.LocationName;
            location.Latitude = dto.Latitude;
            location.Longitude = dto.Longitude;

            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSavedLocation(int id)
        {
            var userId = GetUserId();

            var location = await _context.SavedLocations
                .FirstOrDefaultAsync(l => l.Id == id && l.UserId == userId);

            if (location == null)
                return NotFound();

            _context.SavedLocations.Remove(location);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private Guid GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            return Guid.Parse(userIdClaim!.Value);
        }
    }
}
