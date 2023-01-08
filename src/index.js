import './style.css';
import getAndSaveWeatherData from './weatherData';
import createPageEl from './DOM';

const loadContent =  async function loadMainContent(search) {
    if (!search) return;

    const unitBtn = document.querySelector('#unit-btn');
    const searchInput = document.querySelector('#search');
    const currentUnit = unitBtn.classList.contains('metric') ? 'metric' : 'imperial';
    const data = await getAndSaveWeatherData(search, currentUnit);

    let searchString;
    // In case of geolocation (no search), display data name instead of data search
    if (typeof search !== 'string') {
        searchString = `${data.name}, ${data.country}`;
    } else {
        searchString = `${data.search}, ${data.country}`;
    }
    searchInput.value = searchString;

    createPageEl(data);
}

loadContent('Paris');

export default loadContent;