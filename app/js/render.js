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
    <img src="https://${currentDay.day.condition.icon}" class="weathericon" />
    <p>High: ${currentDay.day.maxtemp_f}</p>
    <p>Low: ${currentDay.day.mintemp_f}</p>`;
};

