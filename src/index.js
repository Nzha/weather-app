import './style.css';
import createEl from './miscFn';
import { default as getAndSaveWeatherData } from './weatherData';
import { fromUnixTime, format } from 'date-fns';

const searchInput = document.querySelector('#search');
const searchBtn = document.querySelector('.search-btn');
const unitBtn = document.querySelector('#unit-btn');

const loadContent =  async function loadMainContent(search, units) {
    const details = document.querySelector('.details');
    const main = document.querySelector('.main');
    searchInput.value = '';
    details.innerHTML = '';
    main.innerHTML = '';

    console.log(search);

    const data = await getAndSaveWeatherData(search, units);
    const sunriseCityLocalTime = fromUnixTime(data.sunrise + data.timezone).toLocaleString("en-US", {timeZone: "UTC"});
    const sunsetCityLocalTime = fromUnixTime(data.sunset + data.timezone).toLocaleString("en-US", {timeZone: "UTC"});

    console.log(data.search);

    searchInput.value = `${data.name}, ${data.search}, ${data.country}`;

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

    // MAIN
    const currentlyContainer = createEl('div', 'currently-container', main);
    const icon = createEl('img', 'icon-content', currentlyContainer);
    const summaryContainer = createEl('div', 'summary-container', currentlyContainer);
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


    if (units === 'metric') {
        windUnit.textContent = 'm/s';
        sunriseContent.textContent = format(new Date(sunriseCityLocalTime), 'H:mm');
        sunsetContent.textContent = format(new Date(sunsetCityLocalTime), 'H:mm');
    } else {
        windUnit.textContent = 'mph';
        sunriseContent.textContent = format(new Date(sunriseCityLocalTime), 'h:mm bbbb')
        sunsetContent.textContent = format(new Date(sunsetCityLocalTime), 'h:mm bbbb');
    }

    return data;
}

loadContent('Paris', 'metric');

const switchUnits = function switchUnitsOfMeasurement() {
    const windUnit = document.querySelector('.wind-unit');
    const windContent = document.querySelector('.wind-content');
    const tempContent = document.querySelector('.temp-content');
    const feelsLikeContent = document.querySelector('.feels-like-content');
    const lowTempContent = document.querySelector('.low-temp-content');
    const highTempContent = document.querySelector('.high-temp-content');

    if (unitBtn.classList.contains('metric')) {
        switchUnitBtn('metric');
        windContent.textContent = Math.round((windContent.textContent*2.237) * 100) / 100;;
        windUnit.textContent = 'mph';
        tempContent.textContent = `${Math.round(cToF(tempContent.textContent.slice(0, -1)))}°`;
        feelsLikeContent.textContent = `${Math.round(cToF(feelsLikeContent.textContent.slice(0, -1)))}°`;
        lowTempContent.textContent = `${Math.round(cToF(lowTempContent.textContent.slice(0, -1)))}°`;
        highTempContent.textContent = `${Math.round(cToF(highTempContent.textContent.slice(0, -1)))}°`;
    } else {
        switchUnitBtn();
        windContent.textContent = Math.round((windContent.textContent/2.237) * 100) / 100;
        windUnit.textContent = 'm/s';
        tempContent.textContent = `${Math.round(fToC(tempContent.textContent.slice(0, -1)))}°`;
        feelsLikeContent.textContent = `${Math.round(fToC(feelsLikeContent.textContent.slice(0, -1)))}°`;
        lowTempContent.textContent = `${Math.round(fToC(lowTempContent.textContent.slice(0, -1)))}°`;
        highTempContent.textContent = `${Math.round(fToC(highTempContent.textContent.slice(0, -1)))}°`;
    }
}

const switchUnitBtn = function switchUnitButton(unit) {
    if (unit === 'metric') {
        unitBtn.classList.remove('metric');
        unitBtn.classList.add('imperial');
        unitBtn.textContent = '°F, mph';
    } else {
        unitBtn.classList.remove('imperial');
        unitBtn.classList.add('metric');
        unitBtn.textContent = '°C, m/s';
    }
}

const cToF = function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

const fToC = function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

// Let user press enter to run search
searchInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) loadContent(searchInput.value, 'metric');
});

searchBtn.addEventListener('click', () => loadContent(searchInput.value), 'metric');

unitBtn.addEventListener('click', switchUnits);