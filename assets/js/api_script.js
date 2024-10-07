const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("city");
const historyUl = document.getElementById("history-ul");
const cityDetails = document.getElementById("cityDetails").children;
const forecastContainer =
  document.getElementById("forecast-container").children;

localStorage.setItem("searchHistory", null);
const historyArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

searchButton.addEventListener("click", function () {
  console.log(searchInput.value);
  storeLocalData(searchInput.value, 5); // limit of 5 words in storage at a time
});

function storeLocalData(content, limit) {
  // add item in array and ul
  historyArray.push(content);
  // create button element with content as well as li element
  const list = document.createElement("li");
  const button = document.createElement("button");
  button.setAttribute("class", "city-button");
  button.textContent = content;
  list.appendChild(button);
  historyUl.insertBefore(list, historyUl.firstChild);
  // set local storage
  localStorage.setItem("searchHistory", JSON.stringify(historyArray));
}

const getApiWeather = function (lat, lon) {
  // IF API KEY ACTUALLY WORKED
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat={${lat}}&lon={${lon}}&appid={f4e517e38960c65a47458e06fd53538a}`;
  // fetch(apiUrl).then(function (response) {
  //   if (response.ok) {
  //     response.json().then(function (data) {
  //       displayWeather(data);
  //     });
  //   } else {
  //     console.log("not okay");
  //   }
  // });

  // Using example json the weather website provided
  const examplePath = "./assets/json/example.JSON";
  fetch(examplePath).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayWeather(data);
      });
    } else {
      console.log("not okay");
    }
  });

  // DEV NOTE: if the api key worked, I would literally just put the url in instead of the file path - and all the code would work the same.
};

const displayWeather = function (report) {
  const list = report.list;
  // code for current weather
  const header = `${report.city.name} (${convertDate(list[0].dt_txt)})`;
  cityDetails[0].textContent = header;
  cityDetails[1].src = convertIcon(list[0].weather[0].icon)
  cityDetails[2].textContent = `Temp: ${convertTemp(list[0].main.temp)}°F`;
  cityDetails[3].textContent = `Wind: ${convertSpeed(list[0].wind.speed)} MPH`;
  cityDetails[4].textContent = `Humidity: ${list[0].main.humidity}%`;
  // code for next five days - EXAMPLE only has 4!
  for (let i = 1; i < list.length; i++) {
    // looping for as many days as it gets, starting at day 2
    const box = forecastContainer[i - 1];
    const date = document.createElement("h4");
    const icon = document.createElement("img");
    const temp = document.createElement("p");
    const wind = document.createElement("p");
    const humidity = document.createElement("p");
    date.textContent = convertDate(list[0].dt_txt);
    icon.src = convertIcon(list[i].weather[0].icon)
    temp.textContent = `Temp: ${convertTemp(list[i].main.temp)}°F`;
    wind.textContent = `Wind: ${convertSpeed(list[i].wind.speed)} MPH`;
    humidity.textContent = `Humidity: ${list[0].main.humidity}%`;
    box.append(date, icon, temp, wind, humidity);
  }
};

// takes dt_text and converts to mm/dd/yyyy
const convertDate = function (date) {
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  const year = date.slice(0, 4);
  return `${month}/${day}/${year}`;
};

// convert kelvin to fahrenheit
const convertTemp = function (temp) {
  return (((temp - 273.15) * 9) / 5 + 32).toFixed(2);
};

const convertSpeed = function (speed) {
  return (speed * 2.23694).toFixed(2);
};

const convertIcon = function (id) {
  return `https://openweathermap.org/img/wn/${id}@2x.png`
}

getApiWeather(1, 1);

// all of my functions will use the example JSON until my connection to the API is solved
// If it isn't, it will be submit like this.
