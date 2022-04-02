const mainUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
var lat = '23.777176';
var lon = '90.399452';
const apiOptions = '&units=metric&exclude=hourly,minutely&alerts';
const apiKey = '&appid=f16a03500941f0f19531a075a21d18c1';
let imgUrl = 'http://openweathermap.org/img/wn/';

getWeatherData(mainUrl + 'lat=' + lat + '&lon=' + lon + apiOptions + apiKey);

function getWeatherData(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => getCurrentWeatherData(data))
}
// Selecting Dom Element 

const weatherDetails = document.querySelector('.weather_details');
const weatherCondition = document.querySelector('.weather_conditon');
const weatherImg = document.querySelector('.weather_container .img_box img');
const futureForecast = document.querySelector('.future_forecast');

// Define getCurrentWetherData function

function getCurrentWeatherData(weather) {

    weatherImg.src = imgUrl + weather.daily[0].weather[0].icon + '@4x.png';
    weatherCondition.innerHTML = weather.daily[0].weather[0].description;
    weatherDetails.innerHTML = '';

    const { temp, humidity, pressure, wind_speed, sunrise, sunset } = weather.current;

    weatherDetails.innerHTML = `
        <h4>Todays Weather</h4>
        <h3>${weather.timezone}</h3>
        <h4>Temperature: ${temp} &#176; C</h4>
        <h4>Humidity: ${humidity} %</h4>
        <h4>pressure: ${pressure} Pa</h4>
        <h4>Wind Speed: ${wind_speed} km/h</h4>
        <h4>Sunrise: ${window.moment(sunrise * 1000).format('HH:mm a')}</h4>
        <h4>Sunset: ${window.moment(sunset * 1000).format('HH:mm a')}</h4>
    `;

    for (let i = 0; i <= 4; i++) {

        const singleForecastEl = document.createElement('div');
        singleForecastEl.classList.add('single_forecast');
        const weatherDay = window.moment(weather.daily[i].dt * 1000).format('ddd');

        singleForecastEl.innerHTML = `
            <h4>${weatherDay}</h4>
            <div class="img_box">
                <img src="${imgUrl+ weather.daily[i].weather[0].icon+ '@2x.png'}" alt="">
            </div>
            <h4 class='w_c'> ${weather.daily[i].weather[0].description}</h4>
            <h4>Day: ${weather.daily[i].temp.day} &#176; C</h4>
            <h4>Night: ${weather.daily[i].temp.night} &#176; C</h4>
`;

        futureForecast.appendChild(singleForecastEl);

    }


}

// Define Search Function

const searchForm = document.querySelector('#search_form');
const searchInput = document.querySelector('#search_input');

// searchForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const searchVlue = searchInput.value.trim();

//     fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + searchVlue + apiKey)
//         .then(resp => resp.json())
//         .then(DATA => getCityDetails(DATA))
// })
searchForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const searchValue = searchInput.value.trim();

    const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + searchValue + apiKey)
    const data = await response.json()
    getCityDetails(data)
})

function getCityDetails(city) {

    const lati = city[0].lat;
    const long = city[0].lon;
    futureForecast.innerHTML = "";
    getWeatherData(mainUrl + 'lat=' + lati + '&lon=' + long + apiOptions + apiKey);


}


// Set Current Date
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December'];
const days = ['Sunday', 'Monday', 'Tueday', 'Wedday', 'Thuday', 'Friday', 'Satday'];
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
const date = now.getDate();
const day = now.getDay();


const currentDate = document.querySelector('.date');
currentDate.innerHTML = '<h4>' + days[day] + " " + date + " " + months[month] + " " + year;