"use strict";

/*inyecciones*/
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import style from "./style.css";
import bosque from "./assets/bosque.jpg";
import animejs from "animejs";
//API
const weatherAPI = "https://cors-anywhere.herokuapp.com/api.openweathermap.org";
const hoy = new Date();

//adding elements to section local
const mainIconContainer = document.querySelector(".weather-icon");
const iconMain = document.createElement("img");
mainIconContainer.appendChild(iconMain);
const localCountry = document.querySelector(".country");
const localCity = document.querySelector(".city");
const localTemperature = document.querySelector(".temperature");
const weatherDescribe = document.querySelector(".weather-describe");
const todayDate = document.querySelector(".today-date");
const windLocal = document.querySelector(".wind-local");
const humidity = document.querySelector(".humidily-local");
const inputHumidity = document.querySelector(".humidity-range");
const visibility = document.querySelector(".visibility-local");
const presure = document.querySelector(".presure-local");
todayDate.innerHTML = hoy.toDateString();

//transform kelvin to celcious and add to the element temperature
const transformK = (kelvinMax, kelvinMin, elementMax, elementMin) => {
  let celciousMax = kelvinMax - 273.15;
  let $celciousMax = parseInt(celciousMax);
  elementMax.textContent = `${$celciousMax} °C`;
  if ((kelvinMin != null) & (elementMin != null)) {
    let celciousMin = kelvinMin - 273.15;
    let $celciousMin = parseInt(celciousMin);
    elementMin.textContent = `${$celciousMin} °C`;
  }
};

const addElements = (object) => {
  iconMain.src = `https://openweathermap.org/img/wn/${object.weather[0].icon}@4x.png`;
  localCountry.textContent = object.sys.country;
  localCity.textContent = object.name;
  transformK(object.main.temp, null, localTemperature, null);
  weatherDescribe.textContent = object.weather[0].description;
  windLocal.textContent = `${object.wind.speed} m/s`;
  humidity.textContent = `${object.main.humidity} %`;
  inputHumidity.value = object.main.humidity;
  presure.textContent = `${object.main.pressure} mb`;
  visibility.textContent = `${object.visibility} m`;
};

//adding temperatures of next days

//funtion to organize array in increment may
const increment = (arr, day1, day2) => {
  arr.sort(function (a, b) {
    return a - b;
  });
  minAndMAx(arr, day1, day2);
};

//funtion to choose min and max temperature also i add the min and maxt to the DOM
const minAndMAx = (arr, day1, day2) => {
  let min = arr[0];
  let max = arr[arr.length - 1];
  transformK(max, min, day1, day2);
};

//adding the next days to the local-next
let daysAfterToday = [];
const nextDAys = (i) => {
  if (i == 6) {
    return;
  }
  const nextDays = document.querySelector(`.next-day${i}`);
  let tomorrow = new Date(hoy);
  tomorrow.setDate(tomorrow.getDate() + i);
  nextDays.textContent = tomorrow.toDateString();
  daysAfterToday.push(tomorrow.getDate());
  return nextDAys(i + 1);
};
nextDAys(1);

const dayAfter = (obj) => {
  let $firstDay = [];
  let firstMax = document.querySelector(".first-max");
  let firstMin = document.querySelector(".first-min");
  let firstIcon = document.querySelector(".first-icon");
  let iconF = document.createElement("img");
  let $secondDay = [];
  let secondMax = document.querySelector(".second-max");
  let secondMin = document.querySelector(".second-min");
  let secondIcon = document.querySelector(".second-icon");
  let iconS = document.createElement("img");
  let $thirdDay = [];
  let thirdMax = document.querySelector(".third-max");
  let thirdMin = document.querySelector(".third-min");
  let thirdIcon = document.querySelector(".third-icon");
  let iconT = document.createElement("img");
  let $fourthDay = [];
  let fourthMax = document.querySelector(".fourth-max");
  let fourthMin = document.querySelector(".fourth-min");
  let fourthIcon = document.querySelector(".fourth-icon");
  let iconFo = document.createElement("img");
  let $fifthDay = [];
  let fifthMax = document.querySelector(".fifth-max");
  let fifthMin = document.querySelector(".fifth-min");
  let fifthIcon = document.querySelector(".fifth-icon");
  let iconFi = document.createElement("img");
  for (let i = 0; i < obj.list.length; i++) {
    let next = new Date(obj.list[i].dt_txt);
    if (next.getDate() == daysAfterToday[0]) {
      $firstDay.push(obj.list[i].main.temp_max, obj.list[i].main.temp_min);
      firstIcon.setAttribute("src", "");
      iconF.src = `https://openweathermap.org/img/wn/${obj.list[i].weather[0].icon}@4x.png`;
      firstIcon.innerHTML = "";
      firstIcon.appendChild(iconF);
    } else if (next.getDate() == daysAfterToday[1]) {
      $secondDay.push(obj.list[i].main.temp_max, obj.list[i].main.temp_min);
      iconS.src = `https://openweathermap.org/img/wn/${obj.list[i].weather[0].icon}@4x.png`;
      secondIcon.innerHTML = "";
      secondIcon.appendChild(iconS);
    } else if (next.getDate() == daysAfterToday[2]) {
      $thirdDay.push(obj.list[i].main.temp_max, obj.list[i].main.temp_min);
      iconT.src = `https://openweathermap.org/img/wn/${obj.list[i].weather[0].icon}@4x.png`;
      thirdIcon.innerHTML = "";
      thirdIcon.appendChild(iconT);
    } else if (next.getDate() == daysAfterToday[3]) {
      $fourthDay.push(obj.list[i].main.temp_max, obj.list[i].main.temp_min);
      iconFo.src = `https://openweathermap.org/img/wn/${obj.list[i].weather[0].icon}@4x.png`;
      fourthIcon.innerHTML = "";
      fourthIcon.appendChild(iconFo);
    } else if (next.getDate() == daysAfterToday[4]) {
      $fifthDay.push(obj.list[i].main.temp_max, obj.list[i].main.temp_min);
      iconFi.src = `https://openweathermap.org/img/wn/${obj.list[i].weather[0].icon}@4x.png`;
      fifthIcon.innerHTML = "";
      fifthIcon.appendChild(iconFi);
    }
  }

  increment($firstDay, firstMax, firstMin);
  increment($secondDay, secondMax, secondMin);
  increment($thirdDay, thirdMax, thirdMin);
  increment($fourthDay, fourthMax, fourthMin);
  increment($fifthDay, fifthMax, fifthMin);
};

const keyAPI = "16871727916aa9f2120a7e3590534ee8";
const position = (pos) => {
  fetch(`${weatherAPI}/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${keyAPI}
`)
    .then((res) => res.json())
    .then((res) => addElements(res));
  fetch(
    `${weatherAPI}/data/2.5/forecast?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${keyAPI}`
  )
    .then((res) => res.json())
    .then((res) => dayAfter(res));
};

navigator.geolocation.getCurrentPosition(position);

//search for places

const buttonSearch = document.querySelector(".search-button");
const buttonBack = document.querySelector(".back");
const elementSearch = document.querySelector(".search-element");
const weatherLocal = document.querySelector(".local");
let rec = weatherLocal.getBoundingClientRect();
const inputSearch = document.querySelector(".input-search");
setTimeout(() => {
  elementSearch.style.height = `${weatherLocal.clientHeight}px`;
}, 3000);
elementSearch.style.left = `-${rec.width}px`;

buttonSearch.addEventListener("click", () => {
  animejs({
    targets: ".search-element",
    translateX: elementSearch.clientWidth,
    easing: "easeInOutSine",
    duration: 1500,
  });
  inputSearch.value = "";
});
buttonBack.addEventListener("click", () => {
  animejs({
    targets: ".search-element",
    translateX: -elementSearch.clientWidth,
    easing: "easeInOutSine",
    duration: 1500,
  });
  inputSearch.value = "";
});

addEventListener("keydown", (event) => {
  if ((event.key == "Enter") & (inputSearch.value !== "")) {
    fetch(
      `${weatherAPI}/data/2.5/weather?q=${inputSearch.value}&appid=${keyAPI}`
    )
      .then((res) => res.json())
      .then((res) => {
        addElements(res);
        res.coord.lat, res.coord.lon;
        fetch(
          `${weatherAPI}/data/2.5/forecast?lat=${res.coord.lat}&lon=${res.coord.lon}&appid=${keyAPI}`
        )
          .then((res) => res.json())
          .then((res) => dayAfter(res));
      });

    inputSearch.value = "";
    animejs({
      targets: ".search-element",
      translateX: -elementSearch.clientWidth,
      easing: "easeInOutSine",
      duration: 1500,
    });
  }
});
