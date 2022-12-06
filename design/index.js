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

function displayCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let h1 = document.querySelector("#city-name");
  h1.innerHTML = cityInput;
  connectWeatherApp(cityInput);
}
let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", displayCity);

function connectWeatherApp(cityInput) {
  let apiKey = `1d535cd63628722a1035b2bd7e064d64`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function displayWeatherConditions(response) {
  console.log(response.data);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#clouds").innerHTML = response.data.weather[0].main;
  document.querySelector("#temp-value").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
connectWeatherApp(`Kyiv`);

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
let locationButton = document.querySelector("#currentlocation-button");
locationButton.addEventListener("click", getCurrentLocation);

function celsiusToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitFormula = temp * (9 / 5) + 32;
  document.querySelector("#temp-value").innerHTML =
    Math.round(fahrenheitFormula);
  console.log(fahrenheitFormula);
}

let tempF = document.querySelector("#farenheitTemp");
tempF.addEventListener("click", celsiusToFahrenheit);
let temp = document.querySelector("#temp-value");

function fahrenheitToCelsius(event) {
  event.preventDefault();
  document.querySelector("#temp-value").innerHTML = Math.round(temp);
  console.log(temp);
}
let tempC = document.querySelector("#celsiusTemp");
tempC.addEventListener("click", fahrenheitToCelsius);
