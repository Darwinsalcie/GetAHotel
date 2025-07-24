namespace GetAHotel.Service.Location
{
    public interface ILocationWraperService
    {
        /// <summary>
        /// Asynchronously retrieves a list of barbershops around a specified location within a given radius.
        /// </summary>
        /// <param name="radius"></param>
        /// <param name="lat"></param>
        /// <param name="lon"></param>
        /// <returns></returns>
        public Task<string> GetLocationAroundAsync(int radius, double lat, double lon);

        /// <summary>
        /// Retrieves the name and details of a barbershop based on its geographic coordinates.
        /// </summary>
        /// <remarks>This method performs an asynchronous operation to query the barbershop's details
        /// based on the provided coordinates. Ensure that the coordinates are accurate to avoid unexpected
        /// results.</remarks>
        /// <param name="latitude">The latitude of the barbershop's location. Must be a valid geographic coordinate.</param>
        /// <param name="longitude">The longitude of the barbershop's location. Must be a valid geographic coordinate.</param>
        /// <returns>A <see cref="BarbershopDTO"/> object containing the name and details of the barbershop located at the
        /// specified coordinates. Returns <see langword="null"/> if no barbershop is found at the given location.</returns>
        public Task<string> GetbyCoordinatesAsync(double latitude, double longitude);

        /// <summary>
        /// Retrieves a list of nearby barbershops within the specified radius of the given geographic coordinates.
        /// </summary>
        /// <remarks>This method performs an asynchronous operation to query nearby barbershops based on
        /// the provided location and radius. Ensure that the input coordinates are valid and the radius is appropriate
        /// for the desired search area.</remarks>
        /// <param name="latitude">The latitude of the location to search from. Must be a valid geographic coordinate.</param>
        /// <param name="longitude">The longitude of the location to search from. Must be a valid geographic coordinate.</param>
        /// <param name="radius">The search radius, in meters. Must be a positive value.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains a <see cref="BarbershopDTO"/>
        /// object  with details of the nearby barbershops. If no barbershops are found, the result may be empty.</returns>


    }
}
