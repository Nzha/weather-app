import './style.css';
import createEl from './miscFn';
import { default as getAndSaveWeatherData } from './weatherData';

const searchInput = document.querySelector('#search');
const searchBtn = document.querySelector('.search-btn');

const loadContent =  async function loadMainContent(search, units) {
    const details = document.querySelector('.details');
    details.innerHTML = '';

    let userSearch = searchInput.value;
    search = userSearch ? userSearch : 'Paris';
    units = 'metric';

    const data = await getAndSaveWeatherData(search, units);

    const windContainer = createEl('div', 'wind-container', details);
    const windLabel = createEl('div', 'wind-label', windContainer);
    const windContent = createEl('div', 'wind-content', windContainer);
    const windUnit = createEl('div', 'wind-unit', windContainer);
    const humidityContainer = createEl('div', 'humidity-container', details);
    const humidityLabel = createEl('div', 'humidity-label', humidityContainer);
    const humidityContent = createEl('div', 'humidity-content', humidityContainer);

    windLabel.textContent = 'Wind:';
    windContent.textContent = data.wind;
    windUnit.textContent = 'm/s';
    humidityLabel.textContent = 'Humidity:';
    humidityContent.textContent = data.humidity;

}

loadContent();

// Let user press enter to run search
searchInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) loadContent(searchInput.value);
});

searchBtn.addEventListener('click', () => loadContent(searchInput.value));