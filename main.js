const box = document.querySelector(".box");
const container = document.querySelector(".container");
const apiKey = "3ebfe3491b9b8ad4b80a8097bd6c9062";
const inputSearch = document.querySelector("#input-search");
const btnSearch = document.querySelector("#btn-search");
const divWeather = document.querySelector(".weather-info");
const place = document.querySelector(".location");
const degree = document.querySelector(".degree");
const icon = document.querySelector(".icon");
const description = document.querySelector(".description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const errorMsg = document.querySelector(".error-msg");
const night = new Date().getHours();

btnSearch.addEventListener("click", () => {
  divWeather.classList.remove("hidden");
  const city = inputSearch.value;
  inputSearch.value = "";
  showData(city);

});
inputSearch.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    divWeather.classList.remove("hidden");
    const city = e.target.value;
    inputSearch.value = "";
    showData(city);
  }
});

const showData = async (city) => {
  try {
    const data = await getData(city);
    place.innerText = `${data.name},${data.sys.country}`;
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    icon.src = iconUrl;
    description.innerText = data.weather[0].description;
    degree.innerText = `${parseInt(data.main.temp)}°C`;
    wind.innerText = `${data.wind.speed} m/s`;
    humidity.innerText = `${data.main.humidity}%`;

    const condition = data.weather[0].main;
    imageWeather(condition);
    errorMsg.innerText = "";
  } catch (error) {
    errorMsg.innerText = `City not found`;
    divWeather.classList.add('hidden')
  }
};

//It is async because it needs to wait the datas from api
const getData = async (city) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const apiReturn = await fetch(apiUrl);
  //change the data to json
  const data = await apiReturn.json();
  console.log(data);
  return data;

};

function imageWeather(condition) {
  if (condition === "Snow") {
    box.style.backgroundImage = `url(img/snow.jpg)`;
    degree.style.color = "#fff";
  } else if (condition === "Clouds") {
    box.style.backgroundImage = `url(img/cloud.jpg)`;
    container.style.color = "#fff";
    degree.style.color = "#fff";
  } else if (condition === "Rain" || condition === "Drizzle") {
    box.style.backgroundImage = `url(img/rain.jpg)`;
    degree.style.color = "#191D3B";
  }
  else if (condition === "Thunderstorm") {
    box.style.backgroundImage = `url(img/thunderstorm.jpg)`;
    degree.style.color = "#fff";
  } else if (condition === "Sun") {
    box.style.backgroundImage = `url(img/sun.jpg)`;
    degree.style.color = "#fff";
  }
  else if (condition === "Clear" && night >= 18) {
    box.style.backgroundImage = `url(img/clear-sky-night.jpg)`;
    degree.style.color = "#fff";
  }
  else if (condition === "Clear") {
    box.style.backgroundImage = `url(img/clear-sky.jpg)`;
    degree.style.color = "#fff";
  }
}


