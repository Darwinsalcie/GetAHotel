using GetAHotel.DTO;
using System.Collections.Generic;
using System.Text.Json;
using static System.Net.WebRequestMethods;

namespace GetAHotel.Service.Location
{
    public class LocationWraperService : ILocationWraperService
    {

        public async Task<string> GetLocationAroundAsync(int radious, double lat, double lon)
        {

            string query = $@"
            [out:json][timeout:25];
            nwr[""tourism""=""hotel""](around:{radious},{lat},{lon});
            out geom;";

            string jsonResponse = await OverPassService.GetApiReponse(query);


            try
            {
               

                var overPassResponse = JsonSerializer.Deserialize<OverPassResponse>(jsonResponse);

         

                HotelDTO[] hotels = overPassResponse.elements
                        .Where(e => 
                        e.id != 0 &&
                        e.lat != 0 &&
                        e.lon != 0 &&
                        e.tags.TryGetValue("name", out var name) 
                        && !string.IsNullOrWhiteSpace(name))
                    .Select(e => new HotelDTO
                    {
                        Id = e.id,
                        Name = e.tags.ContainsKey("name") ? e.tags["name"] : "Unknown",
                        Latitude = e.lat,
                        Longitude = e.lon,
                        houseNumber = e.tags.ContainsKey("addr:housenumber") ? e.tags["addr:housenumber"] : null,
                        PhoneNumber = e.tags.ContainsKey("contact:phone") ? (e.tags["contact:phone"]) : 
                                      e.tags.ContainsKey("phone")? e.tags["phone"] : "Unknown",
                        Street = e.tags.ContainsKey("addr:street") ? e.tags["addr:street"] : null,
                        Address = e.tags.ContainsKey("addr:full") ? e.tags["addr:full"] : null,
                        City = e.tags.ContainsKey("addr:city") ? e.tags["addr:city"] : null,
                        Website = e.tags.ContainsKey("website") ? e.tags["website"] : null
                    })
                    .ToArray();

                var options = new JsonSerializerOptions
                {
                    WriteIndented = true,
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                    Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
                };

                return JsonSerializer.Serialize(hotels, options);
            }

            catch (JsonException e)
            {
                // Manejar errores de deserialización
                throw new Exception("Error deserializando la respuesta de Overpass API", e);
            }

        }

        public Task<string> GetbyCoordinatesAsync(double latitude, double longitude)
        {
            throw new NotImplementedException();
        }


    }
}
