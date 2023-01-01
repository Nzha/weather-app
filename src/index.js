import './style.css';
import getAndSaveWeatherData from './weatherData';
import createPageEl from './pageEl';

const locationBtn = document.querySelector('.location-btn');

const loadContent =  async function loadMainContent(search) {
    if (!search) return;

    const unitBtn = document.querySelector('#unit-btn');
    const searchInput = document.querySelector('#search');
    const currentUnit = unitBtn.classList.contains('metric') ? 'metric' : 'imperial';
    const data = await getAndSaveWeatherData(search, currentUnit);

    // In case of geolocation (no search), display data name instead of search
    if (typeof search !== 'string') data.search = data.name;
    searchInput.value = `${data.search}, ${data.country}`;

    createPageEl(data);
}

loadContent('Paris');

const getUserLocation = function getUserLocation() {
    navigator.geolocation.getCurrentPosition(success);
}

const success = async function getLocationSuccess(position) {
    const coords = position.coords;
    const coordsLatLon = [{lat: coords.latitude, lon: coords.longitude}]
    loadContent(coordsLatLon);
}

locationBtn.addEventListener('click', getUserLocation);

export default loadContent;