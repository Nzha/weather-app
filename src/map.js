import L from "leaflet";

let map = null;

const loadMap = function loadMapWithLeaflet(data) {
    if (typeof map !== 'undefined' && map !== null) map.remove();

    let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    })

    let owm_temp = addLayer('temp_new');
    let owm_pressure = addLayer('pressure_new');
    let owm_wind = addLayer('wind_new');
    let owm_clouds = addLayer('clouds_new');
    let own_precipitation = addLayer('precipitation_new');

    map = L.map('map', {
        center: [data.lat, data.lon],
        zoom: 5,
        layers: [osm, owm_temp]
    });

    const baseMaps = {
        "Temperature": owm_temp,
        "Pressure": owm_pressure,
        "Wind speed": owm_wind,
        "Clouds": owm_clouds,
        "Global Precipitation": own_precipitation
    };

    const layerControl = L.control.layers(baseMaps).addTo(map);

    let marker = L.marker([data.lat, data.lon]).addTo(map);
    marker.bindPopup(data.search);
}

const addLayer = function addLayerToMap(layer) {
    let tileLayer= L.tileLayer(`http://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=2c90294ffc8f3aba96a28d8de4977cd3`, {
        maxZoom: 19,
        attribution: '© OpenWeatherMap'
    })

    return tileLayer;
}

export default loadMap;