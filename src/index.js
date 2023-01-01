import './style.css';
import getAndSaveWeatherData from './weatherData';
import createPageEl from './pageEl';

const loadContent =  async function loadMainContent(search) {
    if (!search) return;

    const unitBtn = document.querySelector('#unit-btn');
    const searchInput = document.querySelector('#search');
    const currentUnit = unitBtn.classList.contains('metric') ? 'metric' : 'imperial';
    const data = await getAndSaveWeatherData(search, currentUnit);

    searchInput.value = `${data.search}, ${data.country}`;
    createPageEl(data);

    return data;
}

loadContent('Paris');

export default loadContent;