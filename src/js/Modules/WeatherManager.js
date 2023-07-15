const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const _weatherKey = '';
let _weatherObjects = {};
let _locationObject;
let _selectedWeatherObject;

//Keeps track of the current temperature type - defaults as C when application opens
let _currentTemperatureType;

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
    const request = await fetch(`https://weather.ieuan.dev/.netlify/functions/weather?location=${locationName}`);
    await request.json().then((response) => {
        console.log(response);
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

/**
 * Returns a weather object by the ID
 * @param id
 * @returns {*}
 */
const getWeatherObjectById = (id) => {
    return _weatherObjects[id];
}

/**
 * Returns the ID of the selected weather object
 * @returns {*}
 */
const getSelectedWeatherObjectId = () => {
    return _selectedWeatherObject;
}

/**
 * Returns the object of the selected weather object
 * @returns {*}
 */
const getSelectedWeatherObject = () => {
    return _weatherObjects[_selectedWeatherObject];
}

/**
 * Sets the current selected weather object ID
 * @param id
 */
const setSelectedWeatherObject = (id) => {
    _selectedWeatherObject = id;
}

const getCurrentTemperatureType = () => {
    return _currentTemperatureType;
}

const setCurrentTemperatureType = (type) => {
    _currentTemperatureType = type;
}

const roundToTwoDecimal = (float) => {
    return Math.round(float * 100) / 100
}

const getDayArray = () => {
    return days;
}

const getMonthArray = () => {
    return monthNames;
}

export {
    fetchWeatherData,
    getLocationObject,
    getWeatherObjects,
    getWeatherObjectById,
    setSelectedWeatherObject,
    getSelectedWeatherObject,
    getSelectedWeatherObjectId,
    getCurrentTemperatureType,
    setCurrentTemperatureType,
    roundToTwoDecimal,
    getDayArray,


}