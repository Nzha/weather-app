import loadContent from ".";

const getUserLocation = function getUserLocation() {
    navigator.geolocation.getCurrentPosition(success);
}

const success = async function getLocationSuccess(position) {
    const coords = position.coords;
    const coordsLatLon = [{lat: coords.latitude, lon: coords.longitude}]
    loadContent(coordsLatLon);
}

export default getUserLocation;