/* jshint esversion: 6 */
// render.js - takes data from API calls in main.js and outputs HTML to index.html

const createVenueHTML = (name, location, iconSource) => {
  return `<h3>${name}</h3>
  <img class="venueimage" src="${iconSource}"/>
  <h2>Address:</h2>
  <p>${location.address}</p>
  <p>${location.city}</p>
  <p>${location.country}</p>`;
};

const createWeatherHTML = (currentDay) => {
  return `<h2>${weekDays[(new Date(currentDay.date)).getDay()]}</h2>
    <div class="weather__wrapper"><div class="weather__left"><img src="https://${currentDay.day.condition.icon}" class="weathericon" />
    <p>${currentDay.day.condition.text}</p></div>
    <div class="weather__right"><p>High: ${currentDay.day.maxtemp_c}</p>
    <p>Average: ${currentDay.day.avgtemp_c}</p>
    <p>Low: ${currentDay.day.mintemp_c}</p></div></div>`;
};

