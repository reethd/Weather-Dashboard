var searchBtn = document.getElementById("searchBtn");
var searchInput = document.getElementById("searchInput");
var apiKey = "8a42d43f7d7dc180da5b1e51890e67dc";
var cityName = document.getElementById("cityName");
var temp = document.getElementById("temp");
var humidity = document.getElementById("humidity");
var wind = document.getElementById("wind");

// functions
function getCity() {
  var city = searchInput.value;
  var currentUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;
  var forecastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    apiKey;

  fetch(currentUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayCurrentWeather(data);
    });

  fetch(forecastUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayForecastWeather(data);
    });
}

function displayCurrentWeather(data) {
  var kelvin = data.main.temp;
  var farenheit = 1.8 * (kelvin - 273) + 32;
  var iconCode = data.weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
  cityName.textContent = data.name + " " + dayjs().format("MM/DD/YYYY");
  temp.textContent = "Temperature: " + farenheit.toFixed(2) + "°F";
  humidity.textContent = "Humidity: " + data.main.humidity + "%";
  wind.textContent = "Wind Speed: " + data.wind.speed + " mph";
  $("#weathericon").attr("src", iconUrl);
}

function displayForecastWeather() {}
function saveToLS() {}
function loadFromLS() {}
function createHistroyBtn() {}
//event listeners
searchBtn.addEventListener("click", getCity);
