document.getElementById('subscribeForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const phoneNumber = document.getElementById('phoneNumber').value;
    subscribeToWeatherUpdates(phoneNumber);
});

const socket = io.connect('http://127.0.0.1:5000/');

socket.on('weather_update', function (data) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = `<p>Weather conditions: ${data.weather_info.description}</p>
                                <p>High temp for today: ${data.weather_info.temp_high}°C</p>
                                <p>Low temp for today: ${data.weather_info.temp_low}°C</p>`;
});

function subscribeToWeatherUpdates(phoneNumber) {

    fetch('/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            phoneNumber: phoneNumber,
        }),
    })
    .then(response => response.text())
    .then(message => alert(message))
    .catch(error => console.error('Error subscribing:', error));
}