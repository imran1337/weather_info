function getWeatherData(city) {
  const apiKey = "7155b272f7a80a78d1951ab8c9916a52";
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(baseUrl)
    .then((res) => res.json())
    .then((data) => showData(data))
    .catch((err) => console.log(err));
}

function showData(weatherData) {
  if (!weatherData.message) {
    displayDataUpdate("city_name", weatherData.name);
    displayDataUpdate("temperature", `${weatherData.main.temp} °C`);
    displayDataUpdate("weather_mode_name", weatherData.weather[0].main);
    document.getElementById(
      "weather_mode_icon"
    ).src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
    console.log(weatherData);
  } else {
    displayDataUpdate("city_name", weatherData.message);
    displayDataUpdate("temperature", "");
    displayDataUpdate("weather_mode_name", "");
    document.getElementById("weather_mode_icon", "").src = "";
  }
}

function displayDataUpdate(idName, value) {
  document.getElementById(idName).innerText = value;
}

document.getElementById("search_btn").addEventListener("click", () => {
  var numberRegex = /^\s*[+-]?(\d+|\.\d+|\d+\.\d+|\d+\.)(e[+-]?\d+)?\s*$/;
  const input = document.getElementById("search_input");
  if (!numberRegex.test(input.value)) {
    getWeatherData(input.value);
  } else alert("Please type a valid city name");
  input.value = "";
});

// default call
getWeatherData("Dhaka");