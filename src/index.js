import './style.css';

let weather = {};

const getWeather = async function getCurrentWeatherFromAPI(city) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=2c90294ffc8f3aba96a28d8de4977cd3`, {mode: 'cors'});
    const geocode = await response.json();
    const lat = geocode[0].lat;
    const lon = geocode[0].lon;
    console.log(geocode);

    weather.name = geocode[0].name;

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2c90294ffc8f3aba96a28d8de4977cd3&units=metric`, {mode: 'cors'});
    const weatherData = await weatherResponse.json();
    console.log(weatherData);

    return weatherData;
}

const saveData = function processWeatherDataFromAPI(Data) {
    // City name has already been saved
    weather.country = Data.sys.country;
    weather.temp = Data.main.temp;
    weather.feelslike = Data.main.feels_like;
    weather.main = Data.weather[0].main;
    weather.description = Data.weather[0].description;

    return weather;
}

const getAndSaveData = async function getAndSaveWeatherData(city) {
    const getWeatherData = await getWeather(city);
    const saveWeatherData = await saveData(getWeatherData);

    console.log(saveWeatherData);
    return saveWeatherData;
}

getAndSaveData('Dubai');