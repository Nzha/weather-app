import './style.css';

const getWeather = async function getWeatherFromAPI() {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=2c90294ffc8f3aba96a28d8de4977cd3`, {mode: 'cors'})
    const weather = await response.json();
    console.log(weather);
}

getWeather();