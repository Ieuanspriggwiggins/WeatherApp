import * as WeatherManager from './WeatherManager';

const generateBasicHour = (isNow, data, hour) => {
    const container = document.createElement('div');
    container.classList.add('hour-info-basic');

    const hourlyInfoTime = document.createElement('span');
    hourlyInfoTime.classList.add('hourly-info-time');
    hourlyInfoTime.innerText = hour + ':00';

    const hourlyInfoRainChance = document.createElement('span');
    hourlyInfoRainChance.classList.add('hourly-info-rain-chance');
    hourlyInfoRainChance.innerText = data.chance_of_rain + '%';

    const hourlyInfoImage = document.createElement('img');
    hourlyInfoImage.classList.add('hourly-info-image');
    let url = data.condition.icon;
    hourlyInfoImage.src = url.replace('64x64', '128x128'); //Get higher resolution image

    hourlyInfoImage.draggable = false;

    const hourlyInfoTemperature = document.createElement('span');
    hourlyInfoTemperature.classList.add('hourly-info-temperature');
    hourlyInfoTemperature.innerText = WeatherManager.getCurrentTemperatureType() === 'c'
        ? Math.round(data.temp_c) + '°' + WeatherManager.getCurrentTemperatureType().toUpperCase()
        : Math.round(data.temp_f) + '°' + WeatherManager.getCurrentTemperatureType().toUpperCase();

    container.appendChild(hourlyInfoTime);
    container.appendChild(hourlyInfoRainChance);
    container.appendChild(hourlyInfoImage);
    container.appendChild(hourlyInfoTemperature);

    return container;

}

export {
    generateBasicHour
}