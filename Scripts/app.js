const apiKey = "insert your key";
const apiTimeKey = "insert your key";
const weatherContainer = document.querySelector('.weather-container');
const form = document.querySelector('.search-weather');
const inputText = document.querySelector('.search-input');
const loaderContainer = document.querySelector('.loader-container');
const loader = document.querySelector('.loader');
const infoDiv = document.createElement('div');

let cityName;
let time;


//Event listener section
inputText.addEventListener('input', updateInput);

form.addEventListener('submit', e => {
    e.preventDefault();
    searchWeather(cityName);
    inputText.value = "";
    cleanSection();
});

//Function section
function updateInput() {
    cityName = inputText.value;
}

//Fetch weather data from current weather API
async function searchWeather(city) {

    const dataFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    });

    const data = await dataFetch.json();

    time = await searchTime(data.coord.lat, data.coord.lon);

    displayWeather(data);

}


//Fetch time-info data from TimeZone API
async function searchTime(latitude, longitude) {

    const dataFetch = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${apiTimeKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    });

    const data = await dataFetch.json();

    console.log(data);
    return data.formatted;

}

//Build and load the component with the correct data
function displayWeather(dataWeather) {

    const name = dataWeather.name;
    const country = dataWeather.sys.country;
    const icon = dataWeather.weather[0].icon;
    const temp = dataWeather.main.temp;
    const mainDescription = dataWeather.weather[0].main;
    const weatherDescription = dataWeather.weather[0].description;
    const humidity = dataWeather.main.humidity;
    const windSpeed = dataWeather.wind.speed;

    infoDiv.classList.add('info-div');

    infoDiv.innerHTML = 
        `
        <div class="second-container">
            <div class="info-city">
                <div class="city-and-date">
                    <h3><i class="fas fa-map-marker-alt"></i>${name}, ${country}</h3>
                    <p>${time}</p>
                </div>
                <div class="temp">
                    <h3>${temp} °C</h3>
                </div>
            </div>

            <div class="info-weather">
                <div class="icon">
                    <img src="../Media/${icon}.svg" alt="Weather Icon">
                </div>
                <div class="description">
                    <h4>${mainDescription}</h4>
                    <p>${weatherDescription}</p>
                </div>
                <div class="humidity">
                    <h4>Humidity</h4>
                    <p>${humidity}%</p>
                </div>
                <div class="wind">
                    <h4>Wind</h4>
                    <p>${windSpeed} Km/h</p>
                </div>
            </div>
        </div>`;

        weatherContainer.appendChild(infoDiv);
    



}

//Clean up the main container
function cleanSection() {
    infoDiv.innerHTML = '';
}

//Animation sections
var deviceWidth = window.matchMedia("(max-width: 767px)");

if(deviceWidth.matches) {

    var tl = gsap.timeline();
    tl.from('.weather-container', {scale: 1.2, duration: 0.5, ease: 'Power2.easeInOut'})
    tl.from('.weather-container', {y: 300, duration: 1, ease: 'Power2.easeInOut'});

} else {
    gsap.from('#wall', {opacity:-1, duration:2});
    gsap.from('#logo', {scale: 2, opacity:-1, duration: 1, ease: 'Power2.easeInOut'})
    gsap.from('.search-weather', {scale: 2, opacity:-1, duration: 1, ease: 'Power2.easeInOut'}); 
}