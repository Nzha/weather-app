let weather = {};

const getWeather = async function getCurrentWeatherFromAPI(search, units) {
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=2c90294ffc8f3aba96a28d8de4977cd3`, {mode: 'cors'});
        const geocode = await response.json();
        const lat = geocode[0].lat;
        const lon = geocode[0].lon;
        console.log(geocode);

        weather.search = geocode[0].name;

        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2c90294ffc8f3aba96a28d8de4977cd3&units=${units}`, {mode: 'cors'});
        const weatherData = await weatherResponse.json();
        console.log(weatherData);

        return weatherData;
    } catch (err) {
        errorHandle();
    }
}

const saveData = function saveWeatherDataFromAPI(data) {
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

const getAndSaveData = async function getAndSaveWeatherData(search, units) {
    const getWeatherData = await getWeather(search, units);
    const saveWeatherData = await saveData(getWeatherData);

    console.log(saveWeatherData);
    return saveWeatherData;
}

const errorHandle = function errorHandling() {
    const details = document.querySelector('.details');
    details.textContent = 'Location not found';
}

export default getAndSaveData;