import * as WeatherManager from './WeatherManager';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getFormattedTime = (time) => {
    if(Number(time) < 12){
        return String(time + 'am');
    }else{
        return String(time + 'pm');
    }
}

const generateWeatherTab = (obj, id) => {
    const data = obj.data;
    const dateEpoch = new Date(data.date_epoch * 1000);
    const day = days[dateEpoch.getDay()];
    const dayValue = dateEpoch.getUTCDate();
    const monthValue = monthNames[dateEpoch.getUTCMonth()];
    const yearValue = dateEpoch.getUTCFullYear();
    let dateString;
    if(id === '0'){
        dateString = 'Today';
    }else{
        dateString = `${day} ${dayValue}, ${monthValue}, ${yearValue}`;
    }

    let weatherTab = document.createElement('div');
    weatherTab.classList.add('weather-tab');

    let text = document.createElement('span');
    text.classList.add('date-text');
    text.innerHTML = dateString;
    weatherTab.appendChild(text);

    weatherTab.setAttribute('data-id', id);

    return weatherTab;
}

const generateBasicHour = (isNow, data, hour) => {
    const container = document.createElement('div');
    container.classList.add('hour-info-basic');

    const hourlyInfoTime = document.createElement('span');
    hourlyInfoTime.classList.add('hourly-info-time');
    hourlyInfoTime.innerText = getFormattedTime(hour);

    const hourlyInfoRainChance = document.createElement('span');
    hourlyInfoRainChance.classList.add('hourly-info-rain-chance');
    hourlyInfoRainChance.innerText = data.chance_of_rain + '%';

    const hourlyInfoImage = document.createElement('img');
    hourlyInfoImage.classList.add('hourly-info-image');
    let url = data.condition.icon;
    hourlyInfoImage.src = url.replace('64x64', '128x128'); //Get higher resolution image

    const hourlyInfoTemperature = document.createElement('span');
    hourlyInfoTemperature.classList.add('hourly-info-temperature');
    hourlyInfoTemperature.innerText = WeatherManager.getCurrentTemperatureType() === 'c' ? Math.round(data.temp_c) : Math.round(data.temp_f);

    container.appendChild(hourlyInfoTime);
    container.appendChild(hourlyInfoRainChance);
    container.appendChild(hourlyInfoImage);
    container.appendChild(hourlyInfoTemperature);

    return container;

}

export {
    generateWeatherTab,
    generateBasicHour
}