const box = document.querySelector(".box");
const container = document.querySelector(".container");
const apiKey = "3ebfe3491b9b8ad4b80a8097bd6c9062";
const inputSearch = document.querySelector("#input-search");
const btnSearch = document.querySelector("#btn-search");
const divWeather = document.querySelector(".weather-info");
const place = document.querySelector(".location");
const degree = document.querySelector(".degree");
const description = document.querySelector(".description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const errorMsg = document.querySelector(".error-msg");

btnSearch.addEventListener("click", () => {
  divWeather.classList.remove("hidden");
  const city = inputSearch.value;
  inputSearch.value = "";
  showData(city);
  imageWeather("sun");
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
  place.innerText = city;
  const data = await getData(city);

  place.innerText = data.name;
  //description.innerText = data.weather[0].description;
  degree.innerText = `${parseInt(data.main.temp)}°C`;
  wind.innerText = data.name;
  humidity.innerText = `${data.main.humidity}%`;

  const condition = data.weather[0].description;
};

//It is async because it needs to wait the datas from api
const getData = async (city) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?${city}&units=metric&appid=${apiKey}&lang=en;`;

  try {
    const apiReturn = await fetch(apiUrl);
    //change the data to json
    const data = await apiReturn.json();
    console.log(data);
    return data;
  } catch (error) {
    errorMsg.innerText = `Location was not find`;
  }
};

function imageWeather(condition) {
  if (condition === "snow") {
    box.style.backgroundImage = `url(img/snow.jpg)`;
    degree.style.color = "#fff";
  } else if (condition === "cloudy") {
    box.style.backgroundImage = `url(img/cloud.jpg)`;
    container.style.color = "#fff";
    degree.style.color = "#fff";
  } else if (condition === "rain") {
    box.style.backgroundImage = `url(img/rain.jpg)`;
    degree.style.color = "#191D3B";
  } else if (condition === "sun") {
    box.style.backgroundImage = `url(img/sun.jpg)`;
    degree.style.color = "#fff";
  }
}
