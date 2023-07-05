import * as WeatherManager from './WeatherManager';
import * as ElementGenerator from './ElementGenerator';
import {generateBasicHour} from "./ElementGenerator";

//Add input for the location elements
const _locationInput = document.getElementById('location-input');
const _locationSubmitBtn = document.getElementById('location-input-submit-btn');

//Input button to change the temperature selection
const temperatureChangeBtn = document.getElementById('switch-temp-type-btn');
const switchC = document.getElementById('switch-c');
const switchF = document.getElementById('switch-f');

//Initialize condition
switchC.style.fontWeight = 'bold';
switchF.style.fontWeight = 'normal';

temperatureChangeBtn.addEventListener('click', () => {
    if(WeatherManager.getCurrentTemperatureType() === 'c'){
        WeatherManager.setCurrentTemperatureType('f');
        switchF.style.fontWeight = 'bold';
        switchC.style.fontWeight = 'normal'
    }else{
        WeatherManager.setCurrentTemperatureType('c');
        switchC.style.fontWeight = 'bold';
        switchF.style.fontWeight = 'normal';
    }

    createWeatherUI();
});

//Tab container for the tabs
const tabDayContainer = document.getElementById('day-selection-container');

//When submit button is pressed
_locationSubmitBtn.addEventListener('click', submitLocation);

// Initialize on page load
WeatherManager.fetchWeatherData('London').then((response) => {
    updateWeatherInformation();
});

//when enter key is pressed while being in the input box
document.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' && event.target === _locationInput){
        submitLocation();
    }
});

/**
 * Handles submission of the location
 * - Clears the input box
 * - Uses WeatherManager module to get the information
 */
function submitLocation() {
    const locationName = _locationInput.value;
    _locationInput.value = ''; // Empty the search box
    WeatherManager.fetchWeatherData(locationName).then((response) => {
        updateWeatherInformation();
    });
}

/**
 * Updates the weather information on the page.
 */
function updateWeatherInformation()  {
    setupTabs();
}

/**
 * Generates and places the days in the tabs container
 */
function setupTabs() {
    let weatherDays = WeatherManager.getWeatherObjects();
    tabDayContainer.innerHTML = '';
    for(let day in weatherDays){
        let tab = ElementGenerator.generateWeatherTab(weatherDays[day], day);
        tab.addEventListener('click', onTabClick);
        tabDayContainer.appendChild(tab);
    }

    //Set the selected tab to the first one
    let first = document.querySelector('.weather-tab');
    first.classList.add('selected-weather-tab');
    WeatherManager.setSelectedWeatherObject(0);
    createWeatherUI();
}

/**
 * Runs when a weather day tab is clicked. Will set the ID to the one that has been clicked, will then remove the selected class
 * from all existing weather tabs, adds the class to the one clicked and sets the currently selected weather object.
 * @param event
 */
function onTabClick(event) {
    let tabs = document.getElementsByClassName('weather-tab');
    let id = event.target.closest('.weather-tab').getAttribute('data-id');
    let object = WeatherManager.getWeatherObjectById(id);
    for(let i = 0; i < tabs.length; i++){
        tabs[i].classList.remove('selected-weather-tab');
    }
    event.target.closest('.weather-tab').classList.add('selected-weather-tab');
    WeatherManager.setSelectedWeatherObject(id);
    createWeatherUI();
}

/**
 * Runs functions responsible for building and updating the page when the weather information has been requested
 */
function createWeatherUI() {
    const weatherObject = WeatherManager.getSelectedWeatherObject();
    const locationObject = WeatherManager.getLocationObject();
    updateQuickInfo(weatherObject.data, locationObject);
    updateHourlyDisplay(weatherObject.data, locationObject);
    updateAstronomicalSection(weatherObject.data);
    updateAirQualitySection(weatherObject.data);
}


//Elements that display the quick information on the left side on the page.
const quickInfoCityDisplay = document.getElementById('quick-info-city');
const quickInfoCountryDisplay = document.getElementById('quick-info-country');
const quickInfoWeatherDisplay = document.getElementById('quick-info-weather');
const quickInfoTempDisplay = document.getElementById('quick-info-temp');
const quickInfoTime = document.getElementById('quick-info-time');

/**
 * Updates the quick info on the top left side of the page.
 * @param data
 * @param locationObj
 */
function updateQuickInfo(data, locationObj) {
    const cityName = locationObj.name;
    const countryName = locationObj.country;
    let averageTemp = WeatherManager.getCurrentTemperatureType() === 'c' ? Math.round(data.day.avgtemp_c) : Math.round(data.day.avgtemp_f);
    const weatherConditionText = data.day.condition.text;

    const timezoneId = locationObj.tz_id;
    const localTime = new Date(new Date().toLocaleString('en-GB', {timeZone: timezoneId}));
    let timeHours = String(localTime.getHours());
    let timeMinutes = String(localTime.getMinutes());
    if(timeMinutes.length === 1){
        timeMinutes = '0' + timeMinutes;
    }

    let time = timeHours + ':' +  timeMinutes;

    quickInfoCityDisplay.innerHTML = cityName;
    quickInfoCountryDisplay.innerHTML = countryName;
    quickInfoWeatherDisplay.innerHTML = weatherConditionText;
    quickInfoTempDisplay.innerHTML = averageTemp + '°' + WeatherManager.getCurrentTemperatureType().toUpperCase();
    quickInfoTime.innerText = time;
}


const basicHourDisplay = document.getElementById('hourly-display');

/**
 * Updates the hourly sections on the page.
 * @param data
 */
function updateHourlyDisplay(data, locationData) {
    basicHourDisplay.innerHTML = ''; //Clear the display
    let hourlyData = data.hour;
    let timezoneId = locationData.tz_id;

    let localTime = new Date(new Date().toLocaleString('en-GB', {timeZone: timezoneId}));

    let currentHour = localTime.getHours();

    for(let hour in hourlyData){
        let element;

        if(Number(WeatherManager.getSelectedWeatherObjectId()) === 0){
            if(Number(hour) === Number(currentHour)){
                element = ElementGenerator.generateBasicHour(true, hourlyData[hour], hour);
            }
            else if(Number(hour) > Number(currentHour)){
                element = ElementGenerator.generateBasicHour(false, hourlyData[hour], hour);
            }
        }else{
            element = ElementGenerator.generateBasicHour(false, hourlyData[hour], hour);
        }
        if(element){
            basicHourDisplay.appendChild(element);
        }
    }
}

const astroSunriseField = document.getElementById('sunrise-data');
const astroSunsetField = document.getElementById('sunset-data');
const astroMoonriseField = document.getElementById('moonrise-data');
const astroMoonsetField = document.getElementById('moonrise-data');
const astroMoonphaseField = document.getElementById('moonphase-data');
const astroMoonIlluminationField = document.getElementById('moonillumination-data');

/**
 * Updates the astronomical section
 * @param data
 */
function updateAstronomicalSection(data) {
    let astroData = data.astro;
    astroSunriseField.innerText = astroData.sunrise;
    astroSunsetField.innerText = astroData.sunset;
    astroMoonriseField.innerText = astroData.moonrise;
    astroMoonsetField.innerText = astroData.moonset;
    astroMoonphaseField.innerText = astroData.moon_phase;
    astroMoonIlluminationField.innerText = astroData.moon_illumination + '%';
}

/**
 * Returns string for the index table for the infra standard
 * @param number
 * @returns {string}
 */
function getGbInfraIndexText(number) {
    if(number < 36){
        return 'Low';
    }
    else if(number < 54){
        return 'Moderate'
    }
    else if(number < 71){
        return 'High';
    }
    else{
        return 'Very High';
    }
}

const carbonMonoxideFiled = document.getElementById('carbon-monoxide-data');
const ozoneField = document.getElementById('ozone-data');
const nitrogenField = document.getElementById('nitrogen-data');
const sulphurField = document.getElementById('sulphur-data');
const pm2Field = document.getElementById('pm2-data');
const pm10Field = document.getElementById('pm10-data');
const usEpaIndexField = document.getElementById('us-epa-data');
const gbDefraIndexField = document.getElementById('gb-defra-data');

const us_epa_obj = {1: 'Good', 2: 'Moderate', 3: 'Unhealthy', 4: 'Unhealthy', 5: 'Very Unhealthy', 6: 'Hazardous'};

function updateAirQualitySection(data) {
    let airQualityData = data.day.air_quality;
    carbonMonoxideFiled.innerText = WeatherManager.roundToTwoDecimal(airQualityData.co);
    ozoneField.innerText = WeatherManager.roundToTwoDecimal(airQualityData.o3);
    nitrogenField.innerText = WeatherManager.roundToTwoDecimal(airQualityData.no2);
    sulphurField.innerText = WeatherManager.roundToTwoDecimal(airQualityData.so2);
    pm2Field.innerText = WeatherManager.roundToTwoDecimal(airQualityData.pm2_5);
    pm10Field.innerText = WeatherManager.roundToTwoDecimal(airQualityData.pm10);
    usEpaIndexField.innerText = airQualityData['us-epa-index'] + ' - ' +  us_epa_obj[airQualityData['us-epa-index']];
    gbDefraIndexField.innerText = airQualityData['gb-defra-index'] + ' - ' + getGbInfraIndexText(Number(airQualityData['gb-defra-index']));

}