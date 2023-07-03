import * as WeatherManager from './WeatherManager';
import * as ElementGenerator from './ElementGenerator';

//Add input for the location elements
const _locationInput = document.getElementById('location-input');
const _locationSubmitBtn = document.getElementById('location-input-submit-btn');

//Tab container for the tabs
const tabDayContainer = document.getElementById('day-selection-container');

//When submit button is pressed
_locationSubmitBtn.addEventListener('click', submitLocation);

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
 * @param data
 */
function updateWeatherInformation()  {
    setupTabs();
}

/**
 * Generates and places the days in the tabs container
 */
function setupTabs() {
    let weatherDays = WeatherManager.getWeatherObjects();
    for(let day in weatherDays){
        let tab = ElementGenerator.generateWeatherTab(weatherDays[day], day);

        tab.addEventListener('click', onTabClick);
        tabDayContainer.appendChild(tab);
    }
}

function onTabClick(event) {
    let tabs = document.getElementsByClassName('weather-tab');
    let id = event.target.closest('.weather-tab').getAttribute('data-id');
    let object = WeatherManager.getWeatherObjectById(id);
    console.log(object);

}
