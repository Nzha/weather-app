import L from "leaflet";

const APIKey = '2c90294ffc8f3aba96a28d8de4977cd3'

let map = null;

const addLayer = function addLayerToMap(layer) {
    const tileLayer= L.tileLayer(`http://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${APIKey}`, {
        maxZoom: 19,
        attribution: '© OpenWeatherMap'
    })

    return tileLayer;
}

const loadMap = function loadMapWithLeaflet(data) {
    if (typeof map !== 'undefined' && map !== null) map.remove();

    const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    })

    const owmTemp = addLayer('temp_new');
    const owmPressure = addLayer('pressure_new');
    const owmWind = addLayer('wind_new');
    const owmClouds = addLayer('clouds_new');
    const ownPrecipitation = addLayer('precipitation_new');

    map = L.map('map', {
        center: [data.lat, data.lon],
        zoom: 5,
        layers: [osm, owmTemp]
    });

    const baseMaps = {
        "Temperature": owmTemp,
        "Pressure": owmPressure,
        "Wind speed": owmWind,
        "Clouds": owmClouds,
        "Precipitation": ownPrecipitation
    };

    L.control.layers(baseMaps).addTo(map);

    const marker = L.marker([data.lat, data.lon]).addTo(map);
    marker.bindPopup(data.search);
}

export default loadMap;