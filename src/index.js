import './style.css';
import { default as getAndSaveWeatherData } from './weatherData';

const searchBtn = document.querySelector('.search-btn');
const search = document.querySelector('#search')

const loadData = function loadWeatherData() {
    getAndSaveWeatherData(search.value);
}

searchBtn.addEventListener('click', loadData);

// Let user press enter to run search
search.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) getAndSaveWeatherData(search.value);
});