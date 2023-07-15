import * as WeatherManager from './WeatherManager';

const generateBasicHour = (data, hour) => {
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

const generateDetailedHour = (data, hour) => {
    const container = document.createElement('div');
    container.classList.add('detailed-hourly-item');

    let displayHour;

    displayHour = hour.length === 1 ? '0' + hour + ':00' : hour + ':00';

    const hourElement = document.createElement('span');
    hourElement.classList.add('hourly-detailed-time');
    hourElement.classList.add('hourly-detailed-span');
    hourElement.innerText = displayHour;
    container.appendChild(hourElement);

    const weatherImage = document.createElement('img');
    let weatherImageUrl = data.condition.icon;
    weatherImage.src = weatherImageUrl.replace('64x64', '128x128');
    container.appendChild(weatherImage);

    const temperatureElement = document.createElement('span');
    temperatureElement.classList.add('hourly-detailed-span');
    temperatureElement.innerText = WeatherManager.getCurrentTemperatureType() === 'c'
        ? data.temp_c + '°' + WeatherManager.getCurrentTemperatureType().toUpperCase()
        : data.temp_f + '°' + WeatherManager.getCurrentTemperatureType().toUpperCase();

    container.appendChild(temperatureElement);

    generateDetailedHourlySub('Wind MPH:', data.wind_mph, container);

    generateDetailedHourlySub('Wind KPH:', data.wind_kph, container);

    generateDetailedHourlySub('Wind Direction:', [data.wind_degree, data.wind_dir], container);

    generateDetailedHourlySub('Gust MPH:', data.gust_mph, container);

    generateDetailedHourlySub('Gust KPH:', data.gust_kph, container);

    generateDetailedHourlySub('Pressure MB:', data.pressure_mb, container);

    generateDetailedHourlySub('Pressure In:', data.pressure_in, container);

    generateDetailedHourlySub('Precip. MM:', data.precip_mm, container);

    generateDetailedHourlySub('Precip. IN:', data.precip_in, container);

    generateDetailedHourlySub('Humidity: ', data.humidity + '%', container);

    generateDetailedHourlySub('Cloud Coverage:', data.cloud + '%', container);

    const feelsLikeTemp =  WeatherManager.getCurrentTemperatureType() === 'c'
        ? data.feelslike_c + '°' + WeatherManager.getCurrentTemperatureType().toUpperCase()
        : data.feelslike_f + '°' + WeatherManager.getCurrentTemperatureType().toUpperCase();

    generateDetailedHourlySub('Feels Like:', feelsLikeTemp, container);

    const windChillTemp =  WeatherManager.getCurrentTemperatureType() === 'c'
        ? data.windchill_c + '°' + WeatherManager.getCurrentTemperatureType().toUpperCase()
        : data.windchill_f + '°' + WeatherManager.getCurrentTemperatureType().toUpperCase();

    generateDetailedHourlySub('Wind Child:', windChillTemp, container);

    const heatIndexTemp =  WeatherManager.getCurrentTemperatureType() === 'c'
        ? data.heatindex_c + '°' + WeatherManager.getCurrentTemperatureType().toUpperCase()
        : data.heatindex_f + '°' + WeatherManager.getCurrentTemperatureType().toUpperCase();

    generateDetailedHourlySub('Heat Index:', heatIndexTemp, container);

    const dewPointTemp =  WeatherManager.getCurrentTemperatureType() === 'c'
        ? data.dewpoint_c + '°' + WeatherManager.getCurrentTemperatureType().toUpperCase()
        : data.dewpoint_f + '°' + WeatherManager.getCurrentTemperatureType().toUpperCase();

    generateDetailedHourlySub('Dew Point:', dewPointTemp, container);

    generateDetailedHourlySub('Visibility KM:', data.vis_km, container);

    generateDetailedHourlySub('Visibility Miles:', data.vis_miles, container);

    generateDetailedHourlySub('UV Index:', data.uv, container);

    return container;
}

function generateDetailedHourlySub(title, details, outerContainer) {
    const container = document.createElement('div');
    container.classList.add('detailed-hourly-sub');

    const titleElement = document.createElement('span');
    titleElement.innerText = title;
    container.appendChild(titleElement);

    if(typeof(details) === 'object'){
        for(let i = 0; i < details.length; i++){
            const current = document.createElement('span');
            current.innerText = details[i];
            container.appendChild(current);
        }
    }else{
        const current = document.createElement('span');
        current.innerText = details;
        container.appendChild(current);
    }

    outerContainer.appendChild(container);
}

export {
    generateBasicHour,
    generateDetailedHour,
}