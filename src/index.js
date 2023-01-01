import './style.css';
import getAndSaveWeatherData from './weatherData';
import { default as createPageEl, switchUnits } from './pageEl';

const searchInput = document.querySelector('#search');
const searchBtn = document.querySelector('.search-btn');
const unitBtn = document.querySelector('#unit-btn');

const loadContent =  async function loadMainContent(search) {
    if (!search) return;

    const currentUnit = unitBtn.classList.contains('metric') ? 'metric' : 'imperial';
    const data = await getAndSaveWeatherData(search, currentUnit);

    searchInput.value = `${data.search}, ${data.country}`;
    createPageEl(data);

    return data;
}

loadContent('Paris');

// Let user press enter to run search
searchInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) loadContent(searchInput.value);
});

searchBtn.addEventListener('click', () => loadContent(searchInput.value));

unitBtn.addEventListener('click', switchUnits);