let cityName = document.querySelector(".city-weather");
let local_date = document.querySelector(".weather-local-date");
let tempBlock = document.querySelector(".weather-temp");
let imgWeather = document.querySelector(".weather-icon");
let descriptionBlock = document.querySelector(".weather-description");
let pressureBlock = document.querySelector(".weather-pressure");
let humidityBlock = document.querySelector(".weather-humidity");
let speedBlock = document.querySelector(".weather-speed");
let degBlock = document.querySelector(".weather-deg");

let city = "Kyiv";

setInterval(() => {
  let date = new Date();
  local_date.textContent = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`; // годинник
}, 1000);

function init() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Kyiv&units=metric&APPID=5d066958a60d315387d9492393935c19"
  )
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      cityName.textContent = `${city()}`; // місто
      function city() {
        let getCity = data.name;
        return getCity;
      }

      descriptionBlock.textContent = `${description()}`; // опис

      function description() {
        let getDesc = data.weather[0].description;
        return getDesc;
      }

      tempBlock.textContent = `${temperature()}°`; // температура

      function temperature() {
        let getTemp = data.main.temp;
        let tempC = Math.floor(getTemp);
        return tempC;
      }

      pressureBlock.textContent = `Тиск: ${pressure()} мм.рт.ст.`; // тиск

      function pressure() {
        let getPressure = data.main.pressure;
        let pressureC = Math.floor(getPressure);
        return pressureC;
      }

      humidityBlock.textContent = `Вологість: ${humidity()}%`; // вологість

      function humidity() {
        let getHumidity = data.main.humidity;
        let humidityC = Math.floor(getHumidity);
        return humidityC;
      }

      speedBlock.textContent = `Швидкість вітру: ${speed()} м/с`; // швидкість вітру

      function speed() {
        let getSpeed = data.wind.speed;
        let speedC = Math.floor(getSpeed);
        return speedC;
      }

      degBlock.textContent = `Напрямок вітру: ${deg()}°`; // напрям в градусах

      function deg() {
        let getDeg = data.wind.deg;
        let degC = Math.floor(getDeg);
        return degC;
      }

      let weatherIcon = data.weather[0].icon; // іконка погоди
      imgWeather.src = `${imgIcon()}`;

      imgWeather.innerHTML = imgIcon();

      console.log("imgWeather.scr=", imgWeather);

      function imgIcon() {
        let imgUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`;

        return `
      <img src="${imgUrl}"></img>`;
      }
    })

    .catch(() => {});
}

init();
setInterval(() => {
  init();
}, 10000);
