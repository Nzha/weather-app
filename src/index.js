import './style.css';
import createEl from './miscFn';
import { default as getAndSaveWeatherData } from './weatherData';
import { fromUnixTime } from 'date-fns';

const searchInput = document.querySelector('#search');
const searchBtn = document.querySelector('.search-btn');
const unitBtn = document.querySelector('#unit-btn');

const loadContent =  async function loadMainContent(search, units) {
    const details = document.querySelector('.details');
    details.innerHTML = '';

    const data = await getAndSaveWeatherData(search, units);
    const sunriseCityLocalTime = fromUnixTime(data.sunrise + data.timezone).toUTCString();

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

    windLabel.textContent = 'Wind:';
    windContent.textContent = data.wind;
    humidityLabel.textContent = 'Humidity:';
    humidityContent.textContent = `${data.humidity}%`;
    sunriseLabel.textContent = 'Sunrise:';
    sunriseContent.textContent = sunriseCityLocalTime;

    if (units === 'metric') {
        windUnit.textContent = 'm/s';
    } else {
        windUnit.textContent = 'mph';
    }

}

loadContent('Paris', 'metric');

const switchUnits = function switchUnitsOfMeasurement() {
    if (unitBtn.classList.contains('metric')) {
        unitBtn.classList.remove('metric');
        unitBtn.classList.add('imperial');
        unitBtn.textContent = '°F, m/s';
        loadContent(searchInput.value, 'imperial');
    } else {
        unitBtn.classList.remove('imperial');
        unitBtn.classList.add('metric');
        unitBtn.textContent = '°C, mph';
        loadContent(searchInput.value, 'metric');
    }
}

// Let user press enter to run search
searchInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) loadContent(searchInput.value);
});

searchBtn.addEventListener('click', () => loadContent(searchInput.value));

unitBtn.addEventListener('click', switchUnits);