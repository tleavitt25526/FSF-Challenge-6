const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("city");
const historyUl = document.getElementById("history-ul");

localStorage.setItem("searchHistory", null);
const historyArray = localStorage.getItem('items') ?
JSON.parse(localStorage.getItem('items')) : [];

searchButton.addEventListener("click", function () {
    console.log(searchInput.value);
    storeLocalData(searchInput.value, 5); // limit of 5 words in storage at a time
});

function storeLocalData(content, limit) {
    // add item in array and ul
    historyArray.push(content);
    // create button element with content as well as li element
    const list = document.createElement('li');
    const button = document.createElement('button');
    button.setAttribute("class", "city-button");
    button.textContent = content;
    list.appendChild(button);
    historyUl.insertBefore(list, historyUl.firstChild);
    // set local storage
    localStorage.setItem("searchHistory", JSON.stringify(historyArray));
}

function getWeather(lat, lon) {
  const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat={${lat}}&lon={${lon}}&appid={f4e517e38960c65a47458e06fd53538a}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

getWeather(1, 1);
