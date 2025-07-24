using GetAHotel.Service.Location;
using Microsoft.AspNetCore.Mvc;

namespace GetAHotel.Controllers.Barbershop;

[ApiController]
[Route("api/[controller]")]
public class HotelController : Controller
{
    // Inyectar el ILocationWraperService
    private readonly ILocationWraperService _locationService;

    public HotelController(ILocationWraperService locationWraperService)
    {
        _locationService = locationWraperService;
    }

    [HttpGet("GetHotelsAround")]
    public async Task<IActionResult> GetHotelsAround([FromQuery]int radius, [FromQuery] double lat, [FromQuery] double lon)
    {

        var response = await _locationService.GetLocationAroundAsync(radius, lat, lon);      

        return Ok(response);

    }

    [HttpGet("GetHotelsAroundSavedPlace")]
    public async Task<IActionResult> GetHotelsAroundSavedPlace([FromQuery] int radius, [FromQuery] string savedPlace)
    {

        //var response = await _locationService.GetLocationAroundSavedPlaceAsync(radius, savedPlace);

        //return Ok(response);
        return Ok("This endpoint is not implemented yet.");

    }

    [HttpGet("nearby")]
    public IActionResult GetPeluquerias()
    {
        // Datos de prueba
        var peluquerias = new[]
        {
            new { id = 1, nombre = "Barbería Central", calificacion = 4.5 },
            new { id = 2, nombre = "Corte Moderno", calificacion = 4.2 }
        };
        return Ok(peluquerias);
    }

    //private async Task<string> GetApiResponse()
    //{
    //    // Async porque debo esperar que la red responda
    //    string responseContent = "No content";
    //    HttpClient client = new HttpClient();

    //    // Añadir cabecera de User-Agent
    //    client.DefaultRequestHeaders.Add("User-Agent", "GetaHairCutApp/1.0");

    //    HttpResponseMessage response = await client.GetAsync("https://nominatim.openstreetmap.org/search?q=[barber]+santo+domingo&format=json&limit=1");

    //    if (response.IsSuccessStatusCode)
    //    {
    //        responseContent = await response.Content.ReadAsStringAsync();
    //    }

    //    return responseContent;
    //}
}