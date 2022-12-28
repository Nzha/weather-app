import './style.css';
import createEl from './miscFn';
import { default as getAndSaveWeatherData } from './weatherData';

const searchInput = document.querySelector('#search');
const searchBtn = document.querySelector('.search-btn');

const loadContent =  async function loadMainContent(search) {
    const details = document.querySelector('.details');

    let userSearch = searchInput.value;
    search = userSearch ? userSearch : 'Paris';

    const data = await getAndSaveWeatherData(search);
    console.log(data.wind);

    const windContainer = createEl('div', 'wind-container', details);
    const windLabel = createEl('div', 'wind-label', windContainer);
    const windContent = createEl('div', 'wind-content', windContainer);

    windLabel.textContent = 'Wind:';
    windContent.textContent = data.wind;

}

loadContent();

// Let user press enter to run search
searchInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) loadContent(searchInput.value);
});

searchBtn.addEventListener('click', () => loadContent(searchInput.value));