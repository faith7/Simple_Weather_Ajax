"use strict";
searchButton.addEventListener("click", searchWeather);

// if input box contains empty space alert to the user
function searchWeather() {
  loadingText.style.display = "block";
  weatherBox.style.display = "none";
  var cityName = searchCity.value;
  if (cityName.trim().length == 0) {
    return alert("Please enter your city name!");
  }

  /*XMLHttpRequest call*/
  var http = new XMLHttpRequest();
  var apiKey = config.MY_KEY;
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=metric&APPID=" +
    apiKey;
  var method = "GET";

  http.open(method, url);

  // if the xmlhttp status is 200(O.K.), return data, or alert the message
  http.onreadystatechange = function() {
    if (http.readyState == XMLHttpRequest.DONE && http.status == 200) {
      // parse the data  to Javascript object
      var data = JSON.parse(http.responseText);
      var weatherData = new Weather(
        cityName.toUpperCase(),
        data.weather[0].description.toUpperCase()
      );
      weatherData.temperature = data.main.temp;
      console.log(weatherData);
      updateWeather(weatherData);
    } else if (http.readyState == XMLHttpRequest.DONE) {
      alert("Something went wrong!!");
    }
  };
  http.send();
}

function updateWeather(weatherData) {
  weatherCity.textContent = weatherData.cityName ;
  weatherDescription.textContent = weatherData.description;
  weatherTemperature.textContent = weatherData.temperature+ " F.";

  weatherBox.style.display = "block";
}
