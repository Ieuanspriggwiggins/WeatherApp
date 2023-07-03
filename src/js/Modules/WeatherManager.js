const weatherKey = '522d203393ae44c29f695112230307';

/**
 * Grabs the weather information of the corresponding parsed parameters.
 * Specifically, grabs today and next 3-day forecast.
 * @param locationName - Place
 * @returns {Promise<any>}
 */
const fetchWeatherData = async (locationName) => {
    const request = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${locationName}&days=3`);
    return await request.json().then((response) => {
        return response;
    });
}


export {
    fetchWeatherData,
}