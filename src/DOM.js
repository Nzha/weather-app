import { fromUnixTime, format } from 'date-fns';
import createEl from './miscFn.js';
import loadContent from '.';
import getUserLocation from './geolocation';

const unitBtn = document.querySelector('#unit-btn');

const createPageEl = function createHTMLPageElements(data) {
    const details = document.querySelector('.details');
    const main = document.querySelector('.main');
    const currentUnit = unitBtn.classList.contains('metric') ? 'metric' : 'imperial';
    const sunriseCityLocalTime = fromUnixTime(data.sunrise + data.timezone).toLocaleString("en-US", {timeZone: "UTC"});
    const sunsetCityLocalTime = fromUnixTime(data.sunset + data.timezone).toLocaleString("en-US", {timeZone: "UTC"});

    // Clear previous entry
    details.innerHTML = '';
    main.innerHTML = '';

    // DETAILS
    const windContainer = createEl('div', 'wind-container', details);
    const windLabel = createEl('div', 'wind-label', windContainer);
    const windContent = createEl('div', 'wind-content', windContainer);
    const windUnit = createEl('div', 'wind-unit', windContainer);
    const humidityContainer = createEl('div', 'humidity-container', details);
    const humidityLabel = createEl('div', 'humidity-label', humidityContainer);
    const humidityContent = createEl('div', 'humidity-content', humidityContainer);
    const sunriseContainer = createEl('div', 'sunrise-container', details);
    const sunriseLabel = createEl('div', 'sunrise-label', sunriseContainer);
    const sunriseContent = createEl('div', 'sunrise-content', sunriseContainer);
    const sunsetContainer = createEl('div', 'sunset-container', details);
    const sunsetLabel = createEl('div', 'sunset-label', sunsetContainer);
    const sunsetContent = createEl('div', 'sunset-content', sunsetContainer);
    const visibilityContainer = createEl('div', 'visibility-container', details);
    const visibilityLabel = createEl('div', 'visibility-label', visibilityContainer);
    const visibilityContent = createEl('div', 'visibility-content', visibilityContainer);
    const pressureContainer = createEl('div', 'pressure-container', details);
    const pressureLabel = createEl('div', 'pressure-label', pressureContainer);
    const pressureContent = createEl('div', 'pressure-content', pressureContainer);

    // MAIN - Current weather
    const currentContainer = createEl('div', 'current-container', main);
    const icon = createEl('img', 'icon-content', currentContainer);
    const summaryContainer = createEl('div', 'summary-container', currentContainer);
    const summaryTempDescContainer = createEl('div', 'summaryTempDesc-container', summaryContainer);
    const tempContent = createEl('div', 'temp-content', summaryTempDescContainer);
    const mainContent = createEl('div', 'main-content', summaryTempDescContainer);
    const summaryHighLowContainer = createEl('div', 'summaryHighLow-container', summaryContainer);
    const feelsLikeContainer = createEl('div', 'feels-like-container', summaryHighLowContainer);
    const feelsLikeLabel = createEl('div', 'feels-like-label', feelsLikeContainer);
    const feelsLikeContent = createEl('div', 'feels-like-content', feelsLikeContainer);
    const lowTempContainer = createEl('div', 'low-temp-container', summaryHighLowContainer);
    const lowTempLabel = createEl('div', 'low-temp-label', lowTempContainer);
    const lowTempContent = createEl('div', 'low-temp-content', lowTempContainer);
    const highTempContainer = createEl('div', 'high-temp-container', summaryHighLowContainer);
    const highTempLabel = createEl('div', 'high-temp-label', highTempContainer);
    const highTempContent = createEl('div', 'high-temp-content', highTempContainer);

    // MAIN - Forecast
    const forecastContainer = createEl('div', 'forecast-container', main);

    windLabel.textContent = 'Wind:';
    windContent.textContent = data.wind;
    humidityLabel.textContent = 'Humidity:';
    humidityContent.textContent = `${data.humidity}%`;
    sunriseLabel.textContent = 'Sunrise:';
    sunsetLabel.textContent = 'Sunset:';
    visibilityLabel.textContent = 'Visibility:';
    visibilityContent.textContent = `${(data.visibility / 1000)} km`;
    pressureLabel.textContent = 'Pressure:';
    pressureContent.textContent = `${data.pressure} hPa`;

    icon.src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
    tempContent.textContent = `${Math.round(data.temp)}°`;
    mainContent.textContent = data.main;
    feelsLikeLabel.textContent = 'Feels Like:';
    feelsLikeContent.textContent = `${Math.round(data.feelslike)}°`;
    lowTempLabel.textContent = 'Low:';
    lowTempContent.textContent = `${Math.round(data.tempMin)}°`;
    highTempLabel.textContent = 'High:';
    highTempContent.textContent = `${Math.round(data.tempMax)}°`;

    data.forecast.forEach(day => {
        const forecastDailyContainer = createEl('div', 'forecast-daily-container', forecastContainer);
        const forecastDay = createEl('div', 'forecast-day', forecastDailyContainer);
        const forecastIcon = createEl('img', 'forecast-icon', forecastDailyContainer);
        const forecastHighLowContainer = createEl('div', 'forecast-highlow-container', forecastDailyContainer);
        const forecastHigh = createEl('div', 'forecast-high', forecastHighLowContainer);
        const forecastLow = createEl('div', 'forecast-low', forecastHighLowContainer);

        forecastDay.textContent = format(new Date(day.key), 'E');
        forecastIcon.src = `http://openweathermap.org/img/wn/${day.value.icon}.png`;
        forecastHigh.textContent = `${Math.round(day.value.temp_max)}°`;
        forecastLow.textContent = `${Math.round(day.value.temp_min)}°`;
    });

    if (currentUnit === 'metric') {
        windUnit.textContent = 'm/s';
        sunriseContent.textContent = format(new Date(sunriseCityLocalTime), 'H:mm');
        sunsetContent.textContent = format(new Date(sunsetCityLocalTime), 'H:mm');
    } else {
        windUnit.textContent = 'mph';
        sunriseContent.textContent = format(new Date(sunriseCityLocalTime), 'h:mm bbbb')
        sunsetContent.textContent = format(new Date(sunsetCityLocalTime), 'h:mm bbbb');
    }
}

const switchUnits = function switchUnitsOfMeasurement() {
    const windUnit = document.querySelector('.wind-unit');
    const windContent = document.querySelector('.wind-content');
    const tempContent = document.querySelector('.temp-content');
    const feelsLikeContent = document.querySelector('.feels-like-content');
    const lowTempContent = document.querySelector('.low-temp-content');
    const highTempContent = document.querySelector('.high-temp-content');
    const forecastHighs = document.querySelectorAll('.forecast-high');
    const forecastLows = document.querySelectorAll('.forecast-low');

    if (unitBtn.classList.contains('metric')) {
        unitBtn.classList.remove('metric');
        unitBtn.classList.add('imperial');
        unitBtn.textContent = '°F, mph';
        windContent.textContent = Math.round((windContent.textContent*2.237) * 100) / 100;;
        windUnit.textContent = 'mph';
        tempContent.textContent = `${Math.round(cToF(tempContent.textContent.slice(0, -1)))}°`;
        feelsLikeContent.textContent = `${Math.round(cToF(feelsLikeContent.textContent.slice(0, -1)))}°`;
        lowTempContent.textContent = `${Math.round(cToF(lowTempContent.textContent.slice(0, -1)))}°`;
        highTempContent.textContent = `${Math.round(cToF(highTempContent.textContent.slice(0, -1)))}°`;
        forecastHighs.forEach(forecastHigh => forecastHigh.textContent = `${Math.round(cToF(forecastHigh.textContent.slice(0, -1)))}°`);
        forecastLows.forEach(forecastLow => forecastLow.textContent = `${Math.round(cToF(forecastLow.textContent.slice(0, -1)))}°`);

    } else {
        unitBtn.classList.remove('imperial');
        unitBtn.classList.add('metric');
        unitBtn.textContent = '°C, m/s';
        windContent.textContent = Math.round((windContent.textContent/2.237) * 100) / 100;
        windUnit.textContent = 'm/s';
        tempContent.textContent = `${Math.round(fToC(tempContent.textContent.slice(0, -1)))}°`;
        feelsLikeContent.textContent = `${Math.round(fToC(feelsLikeContent.textContent.slice(0, -1)))}°`;
        lowTempContent.textContent = `${Math.round(fToC(lowTempContent.textContent.slice(0, -1)))}°`;
        highTempContent.textContent = `${Math.round(fToC(highTempContent.textContent.slice(0, -1)))}°`;
        forecastHighs.forEach(forecastHigh => forecastHigh.textContent = `${Math.round(fToC(forecastHigh.textContent.slice(0, -1)))}°`);
        forecastLows.forEach(forecastLow => forecastLow.textContent = `${Math.round(fToC(forecastLow.textContent.slice(0, -1)))}°`);
    }
}

const addEventListeners = function addEventListeners() {
    const locationBtn = document.querySelector('.location-btn');
    const searchInput = document.querySelector('#search');
    const searchBtn = document.querySelector('.search-btn');
    const unitBtn = document.querySelector('#unit-btn');

    locationBtn.addEventListener('click', getUserLocation);
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') loadContent(searchInput.value);
    });
    searchBtn.addEventListener('click', () => loadContent(searchInput.value));
    unitBtn.addEventListener('click', switchUnits);
}

addEventListeners();

const cToF = function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

const fToC = function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

export { createPageEl as default, switchUnits };