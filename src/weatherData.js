import _ from 'lodash';

const APIKey = '2c90294ffc8f3aba96a28d8de4977cd3'

let weather = {};
let forecast = {};

const getCoords = async function getLatitudeAndLongitude(search) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${APIKey}`, {mode: 'cors'});
    const geocode = await response.json();
    console.log(geocode);

    weather.search = geocode[0].name;

    return geocode;
}

const getCurrentWeather = async function getCurrentWeatherDataFromCoords(coords, units) {
    const lat = coords[0].lat;
    const lon = coords[0].lon;
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=${units}`, {mode: 'cors'});
    const weatherData = await weatherResponse.json();
    console.log(weatherData);

    return weatherData;
}

const getForecastWeather = async function getForecastWeatherDataFromCoords(coords, units) {
    const lat = coords[0].lat;
    const lon = coords[0].lon;
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=${units}`, {mode: 'cors'});
    const weatherData = await weatherResponse.json();
    console.log(weatherData);

    return weatherData;
}

const saveCurrentData = function storeCurrentDataInObject(data) {
    weather.country = data.sys.country;
    weather.description = data.weather[0].description;
    weather.feelslike = data.main.feels_like;
    weather.humidity = data.main.humidity;
    weather.icon = data.weather[0].icon;
    weather.main = data.weather[0].main;
    weather.name = data.name;
    weather.pressure = data.main.pressure;
    weather.sunrise = data.sys.sunrise;
    weather.sunset = data.sys.sunset;
    weather.temp = data.main.temp;
    weather.tempMax = data.main.temp_max;
    weather.tempMin = data.main.temp_min;
    weather.timezone = data.timezone;
    weather.visibility = data.visibility;
    weather.wind = data.wind.speed;

    return weather;
}

const saveForecastData = function storeForecastDataInObject(data) {
    // Filter data for 5 days at 9 a.m. (API send data for every 3 hours)
    const fiveDays = data.list.filter(el => el.dt_txt.includes('09:00'));

    const dataByDay = _.groupBy(data.list, el => el.dt_txt.slice(0,10));
    const highLow = _.mapValues(dataByDay, el => ({
        min: _.min(_.map(el, 'main.temp_min')),
        max: _.max(_.map(el, 'main.temp_max')),
    }));


    console.log(dataByDay);
    console.log(highLow);
}

const getAndSaveData = async function getAndSaveWeatherData(search, units) {
    try {
        // If search is a string (i.e. city), get coordinates first, else use coordinates directly
        const getCoordsData = (typeof search === 'string') ? await getCoords(search) : search;

        const getCurrentWeatherData = await getCurrentWeather(getCoordsData, units);
        const getForecastWeatherData = await getForecastWeather(getCoordsData, units);
        const saveCurrentWeatherData = await saveCurrentData(getCurrentWeatherData);
        console.log(saveCurrentWeatherData);
        const saveForecastWeatherData = await saveForecastData(getForecastWeatherData);
        console.log(saveForecastWeatherData);

        return saveCurrentWeatherData;
    } catch(error) {
        errorHandle();
    }
}

const errorHandle = function errorHandling() {
    const details = document.querySelector('.details');
    const main = document.querySelector('.main');
    details.textContent = 'Location not found';
    main.innerHTML = '';
}

export default getAndSaveData;