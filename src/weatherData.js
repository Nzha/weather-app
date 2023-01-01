let weather = {};

const getCoords = async function getLatitudeAndLongitude(search) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=2c90294ffc8f3aba96a28d8de4977cd3`, {mode: 'cors'});
    const geocode = await response.json();
    console.log(geocode);

    weather.search = geocode[0].name;

    return geocode;
}

const getWeather = async function getWeatherDataFromLatAndLon(coords, units) {
    const lat = coords[0].lat;
    const lon = coords[0].lon;
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2c90294ffc8f3aba96a28d8de4977cd3&units=${units}`, {mode: 'cors'});
    const weatherData = await weatherResponse.json();
    console.log(weatherData);

    return weatherData;
}

const saveData = function storeDataInObject(data) {
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
    try {
        // If search is a string (i.e. city), get coordinates first, else use coordinates directly
        const getCoordsData = (typeof search === 'string') ? await getCoords(search) : search;
        
        const getWeatherData = await getWeather(getCoordsData, units)
        const saveWeatherData = await saveData(getWeatherData);

        console.log(saveWeatherData);
        return saveWeatherData;
    } catch(error) {
        errorHandle();
    }
}

const errorHandle = function errorHandling() {
    const details = document.querySelector('.details');
    details.textContent = 'Location not found';
}

export default getAndSaveData;