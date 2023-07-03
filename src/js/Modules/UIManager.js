import * as WeatherManager from './WeatherManager';

//Add input for the location elements
const _locationInput = document.getElementById('location-input');
const _locationSubmitBtn = document.getElementById('location-input-submit-btn');

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

}

/**
 * Updates the weather information on the page.
 * @param data
 */
function updateWeatherInformation(data)  {
    console.log(data);

}