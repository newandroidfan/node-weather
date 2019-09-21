const fetchWeather = (address, callback) => {
    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            callback(data);
        });
    });
}
const weatherForm = document.querySelector('form');
const locationInput = document.getElementById('locationInput');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = locationInput.value.trim();
    fetchWeather(location, (data) => {
        const locationP = document.getElementById('location');
        const forecastP = document.getElementById('forecast');
        const addressP = document.getElementById('address');
        if (data.error) {
            locationP.textContent = data.error;
            forecastP.textContent = '';
            addressP.textContent = '';
        } else {
            locationP.textContent = data.location;
            forecastP.textContent = data.forecast;
            addressP.textContent = data.address;
        }
    });
});