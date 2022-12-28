let weather = {};

const getWeather = async function getCurrentWeatherFromAPI(search) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=2c90294ffc8f3aba96a28d8de4977cd3`, {mode: 'cors'});
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

const saveData = function saveWeatherDataFromAPI(data) {
    // Weather city name has already been saved
    weather.country = data.sys.country;
    weather.temp = data.main.temp;
    weather.feelslike = data.main.feels_like;
    weather.main = data.weather[0].main;
    weather.description = data.weather[0].description;
    weather.wind = data.wind.speed;

    return weather;
}

const getAndSaveData = async function getAndSaveWeatherData(search) {
    const getWeatherData = await getWeather(search);
    const saveWeatherData = await saveData(getWeatherData);

    console.log(saveWeatherData);
    return saveWeatherData;
}

// export default getAndSaveData;
export { getAndSaveData as default };