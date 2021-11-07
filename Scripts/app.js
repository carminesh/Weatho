const apiKey = "insert your api key";
const weatherContainer = document.querySelector('.weather-container');
const form = document.querySelector('.search-weather');
const inputText = document.querySelector('.search-input');
const infoDiv = document.createElement('div');

let cityName;

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


async function searchWeather(city) {

    const dataFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    });

    const data = await dataFetch.json();

    displayWeather(data);
}


function displayWeather(dataWeather) {

    console.log(dataWeather);

    const name = dataWeather.name;
    const country = dataWeather.sys.country;
    const timezone = dataWeather.sys.timezone;
    const icon = dataWeather.weather[0].icon;
    const temp = dataWeather.main.temp;
    const mainDescription = dataWeather.weather[0].main;
    const weatherDescription = dataWeather.weather[0].description;
    const humidity = dataWeather.main.humidity;
    const windSpeed = dataWeather.wind.speed;


    console.log(dataWeather);

    infoDiv.classList.add('info-div');

    infoDiv.innerHTML = 
        `
        <div class="second-container">
            <div class="info-city">
                <div class="city-and-date">
                    <h3><i class="fas fa-map-marker-alt"></i>${name}, ${country}</h3>
                    <p>7th November - 6.04 A.M</p>
                </div>
                <div class="temp">
                    <h3>${temp} °C</h3>
                </div>
            </div>

            <div class="info-weather">
                <div class="icon">
                    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
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
                    <h4>Wind speed</h4>
                    <p>${windSpeed} Km/h</p>
                </div>
            </div>
        </div>`;

    weatherContainer.appendChild(infoDiv);

}

function cleanSection() {
    infoDiv.innerHTML = "";
}

function getTimeZone(timezone) {
    var d = new Date((new Date().getTime())-timezone*1000);
    d.toISOString();
    return d;
}