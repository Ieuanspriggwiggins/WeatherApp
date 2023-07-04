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
    updateHourlyDisplay(weatherObject.data);
}


//Elements that display the quick information on the left side on the page.
const quickInfoCityDisplay = document.getElementById('quick-info-city');
const quickInfoWeatherDisplay = document.getElementById('quick-info-weather');
const quickInfoTempDisplay = document.getElementById('quick-info-temp');

/**
 * Updates the quick info on the top left side of the page.
 * @param data
 * @param locationObj
 */
function updateQuickInfo(data, locationObj) {
    const cityName = locationObj.name;
    let averageTemp = WeatherManager.getCurrentTemperatureType() === 'c' ? data.day.avgtemp_c : data.day.avgtemp_f;
    const weatherConditionText = data.day.condition.text;
    quickInfoCityDisplay.innerHTML = cityName;
    quickInfoWeatherDisplay.innerHTML = weatherConditionText;
    quickInfoTempDisplay.innerHTML = averageTemp + '&deg;';
}


const basicHourDisplay = document.getElementById('hourly-display');

/**
 * Updates the hourly sections on the page.
 * @param data
 */
function updateHourlyDisplay(data) {
    basicHourDisplay.innerHTML = ''; //Clear the display
    let hourlyData = data.hour;
    let currentHour = new Date().getHours();

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