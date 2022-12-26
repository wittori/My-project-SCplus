function formatDate(currentDate) {
  let date = currentTime.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let hour = currentTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let month = months[currentTime.getMonth()];
  if (month < 10) {
    month = `0${month}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[currentTime.getDay()];
  return `Today // ${day}, ${month}/${date}, ${hour}:${minutes}`;
}

function displayWeatherConditions(response) {
  console.log(response.data);
  document.querySelector("#city-name").innerHTML = response.data.city;
  document.querySelector("#clouds").innerHTML =
    response.data.condition.description;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
  celsiusTemperature = response.data.temperature.current;
  getForecast(response.data.city);
}

function search(cityInput) {
  let apiKey = `07af4b67932b2of9tf83d864dfd42b82`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let h1 = document.querySelector("#city-name");
  h1.innerHTML = cityInput;
  search(cityInput);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = `07af4b67932b2of9tf83d864dfd42b82`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function celsiusToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitFormula = celsiusTemperature * (9 / 5) + 32;
  document.querySelector("#temperature").innerHTML =
    Math.round(fahrenheitFormula);
}

function fahrenheitToCelsius(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
}

function getForecast(city) {
  let apiKey = `07af4b67932b2of9tf83d864dfd42b82`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt=""
          width="72"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temperature.maximum
          )} </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temperature.minimum
          )} </span>
        </div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let h2 = document.querySelector("h2");
let currentTime = new Date();
h2.innerHTML = formatDate(currentTime);

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", getCurrentLocation);

let tempF = document.querySelector("#farenheitTemp");
tempF.addEventListener("click", celsiusToFahrenheit);

let tempC = document.querySelector("#celsiusTemp");
tempC.addEventListener("click", fahrenheitToCelsius);

let celsiusTemperature = null;

search(`Kyiv`);
