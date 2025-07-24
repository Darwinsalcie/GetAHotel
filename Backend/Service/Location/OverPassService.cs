using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Text;

namespace GetAHotel.Service.Location
{
    public static class OverPassService
    {
        private static readonly HttpClient _httpclient = new HttpClient();
        private static readonly string OverpassUrl = "https://overpass-api.de/api/interpreter";

        static OverPassService()
        {
            _httpclient.DefaultRequestHeaders.Add("User-Agent", "GetAHotel/1.0");
        }

        public static async Task<string> GetApiReponse(string query)
        {
            try
            {
                var content = new StringContent(query, Encoding.UTF8, "application/x-www-form-urlencoded");

                HttpResponseMessage response = await _httpclient.PostAsync(OverpassUrl, content);

                response.EnsureSuccessStatusCode();

                return await response.Content.ReadAsStringAsync();
            }
            catch (HttpRequestException e)
            {
                throw new Exception("Error fetching data from OverPass API", e);
            }
        }
    }
}