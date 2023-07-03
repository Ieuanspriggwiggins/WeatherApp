const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const generateWeatherTab = (obj, id) => {
    const data = obj.data;
    const dateEpoch = new Date(data.date_epoch * 1000);
    const day = days[dateEpoch.getDay()];
    const dayValue = dateEpoch.getUTCDate();
    const monthValue = monthNames[dateEpoch.getUTCMonth()];
    const yearValue = dateEpoch.getUTCFullYear();
    const dateString = `${day} ${dayValue}, ${monthValue}, ${yearValue}`;

    let weatherTab = document.createElement('div');
    weatherTab.classList.add('weather-tab');

    let text = document.createElement('span');
    text.classList.add('date-text');
    text.innerHTML = dateString;
    weatherTab.appendChild(text);

    weatherTab.setAttribute('data-id', id);

    return weatherTab;
}


export {
    generateWeatherTab,
}