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
let h2 = document.querySelector("h2");
let currentTime = new Date();
h2.innerHTML = formatDate(currentTime);

function displayWeatherConditions(response) {
  console.log(response.data);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#clouds").innerHTML = response.data.weather[0].main;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
}

function search(cityInput) {
  let apiKey = `1d535cd63628722a1035b2bd7e064d64`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let h1 = document.querySelector("#city-name");
  h1.innerHTML = cityInput;
  search(cityInput);
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = `1d535cd63628722a1035b2bd7e064d64`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", getCurrentLocation);

function celsiusToFahrenheit(event) {
  event.preventDefault();

  let fahrenheitFormula = celsiusTemperature * (9 / 5) + 32;
  document.querySelector("#temperature").innerHTML =
    Math.round(fahrenheitFormula);
}

let tempF = document.querySelector("#farenheitTemp");
tempF.addEventListener("click", celsiusToFahrenheit);

let celsiusTemperature = null;

function fahrenheitToCelsius(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
}
let tempC = document.querySelector("#celsiusTemp");
tempC.addEventListener("click", fahrenheitToCelsius);
search(`Kyiv`);
