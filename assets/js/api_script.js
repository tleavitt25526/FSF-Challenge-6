const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("city");
const historyUl = document.getElementById("history-ul");
const cityDetails = document.getElementById("cityDetails").children;
const forecastContainer = document.getElementById("forecast-container");

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
};

const displayWeather = function (report) {
  const list = report.list;
  // code for current weather
  const header = `${report.city.name} (${getDate(list[0].dt_text)}) ${list[0].weather[0].icon}`;
  cityDetails[0].textContent = header;
  // code for next five days - EXAMPLE only has 4!
};

// takes dt_text and converts to mm/dd/yyyy
const getDate = function (date) {

}

getApiWeather(1, 1);

// all of my functions will use the example JSON until my connection to the API is solved
// If it isn't, it will be submit like this.
