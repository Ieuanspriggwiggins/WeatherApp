
const _weatherKey = '522d203393ae44c29f695112230307';
let _weatherObjects = {};
let _locationObject;

const weatherFactory = (data) => {
    return {data};
}

/**
 * Grabs the weather information of the corresponding parsed parameters.
 * Specifically, grabs today and next 3-day forecast.
 * @param locationName - Place
 * @returns {Promise<any>}
 */
const fetchWeatherData = async (locationName) => {
    const request = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${_weatherKey}&q=${locationName}&days=5`);
    await request.json().then((response) => {
        createWeatherObjects(response);
    });
}

/**
 * Creates the weather objects the program uses to monitor the next 5 days
 * @param data
 */
function createWeatherObjects(data) {
    let dayData = data.forecast.forecastday;
    _locationObject = data.location;
    for(let i = 0; i < dayData.length; i++){
        _weatherObjects[i] = weatherFactory(dayData[i]);
    }
}

/**
 * Returns the weather location object
 * @returns {*}
 */
const getLocationObject = () => {
    return _locationObject;
}

/**
 * Returns the weather array forecast for the next 5 days
 * @returns {*[]}
 */
const getWeatherObjects = () => {
    return _weatherObjects;
}

const getWeatherObjectById = (id) => {
    return _weatherObjects[id];
}

export {
    fetchWeatherData,
    getLocationObject,
    getWeatherObjects,
    getWeatherObjectById,
}