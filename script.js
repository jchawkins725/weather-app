const x = document.getElementById("app");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const icon = document.getElementById("icon");
const url = "https://fcc-weather-api.glitch.me/api/current?";
var lat = "";
let lon = "";

function getLocation() {
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition, errorHandler);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function getPosition(position) {
  lat = "lat=" + position.coords.latitude;
  lon = "lon=" + position.coords.longitude;
  getWeather(lat, lon)
}
function errorHandler(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}
function getWeather (lat, lon) {
  let api = url + lat + "&" + lon
  console.log(api);
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", api);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     let json = JSON.parse(this.responseText);
     console.log(json);
     city.innerHTML = json.name + ", " + json.sys.country;
     temp.innerHTML = "temp: " + json.main.temp;
     icon.src = json.weather[0].icon;
    }
  };
}
window.onload = getLocation();
