var searchBtn = document.getElementById("searchBtn");
// var histBtn = document.getElementById("histBtn");
var historyContainer = document.getElementById("history");
var searchInput = document.getElementById("searchInput");
var histBtns = document.querySelectorAll(".histBtn");
var apiKey = "cee541f4e650cffb718ce2e44ea67925";
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
      saveToLS(data);
      $(".histBtn").remove();
      createHistoryBtn();
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
  let kelvin = data.main.temp;
  let fahrenheit = 1.8 * (kelvin - 273) + 32;
  let iconCode = data.weather[0].icon;
  let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
  cityName.textContent = data.name + " " + dayjs().format("ddd MM/DD/YYYY");
  temp.textContent = "Temperature: " + fahrenheit.toFixed(2) + "°F";
  humidity.textContent = "Humidity: " + data.main.humidity + "%";
  wind.textContent = "Wind Speed: " + data.wind.speed + " mph";
  $("#weathericon").attr("src", iconUrl);
}

function displayForecastWeather(data) {
  for (i = 6; i <= 38; i += 8) {
    let kelvin = data.list[i].main.temp;
    let fahrenheit = 1.8 * (kelvin - 273) + 32;
    let iconCode = data.list[i].weather[0].icon;
    let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

    let dateEl = document.createElement("li");
    let iconEl = document.createElement("img");
    let tempEl = document.createElement("li");
    let windEl = document.createElement("li");
    let humidityEl = document.createElement("li");

    let dateString = data.list[i].dt_txt;
    let date = moment(dateString);

    dateEl.textContent = date.format("ddd MM/DD/YYYY");
    iconEl.setAttribute("src", iconUrl);
    tempEl.textContent = "Temperature: " + fahrenheit.toFixed(2) + "°F";
    windEl.textContent = "Wind Speed: " + data.list[i].wind.speed + " mph";
    humidityEl.textContent = "Humidity: " + data.list[i].main.humidity + "%";

    $("#forecast" + i).append(dateEl);
    $("#forecast" + i).append(iconEl);
    $("#forecast" + i).append(tempEl);
    $("#forecast" + i).append(windEl);
    $("#forecast" + i).append(humidityEl);
  }
}
function saveToLS(data) {
  localStorage.setItem(data.name, data.name);
}

function createHistoryBtn() {
  for (i = 0; i < localStorage.length; i++) {
    let historyButton = document.createElement("button");
    historyButton.setAttribute("class", "histBtn");
    historyButton.setAttribute("id", localStorage.getItem(localStorage.key(i)));
    historyButton.textContent = localStorage.getItem(localStorage.key(i));
    $("#history").append(historyButton);
  }
}

historyContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("histBtn")) {
    searchInput.value = e.target.innerHTML;
    getCity();
  }
});
searchBtn.addEventListener("click", getCity);
