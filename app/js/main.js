/* jshint esversion: 6 */

// Foursquare API Info
const clientId = '3TKZDPF5ATNXJ4P142PJI0GINMCCSRMV4SNDK23UOPDNKUBZ';
const clientSecret = 'W4MIYVOYABFIFYTJGH4HZBSQQNLUQXP3OZ0GKSHKSAQ5KZVU';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// APIXU Info
const apiKey = 'a011b012a18849769df144629191601';
const forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// jQuery animations
$('#top-button').on('click', () => {
  window.scrollTo(0, 0);
});

// All CSS styles to be applied when submitted
const submitCSS = () => {
  $container.css("visibility", "visible");
  window.scrollTo(0, 700);
};

// Add AJAX functions here:
const getVenues = async () => {
	const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20190116`;
  console.log(urlToFetch);
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      //converts response into JSON
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      //saves venue data
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      return venues;
    }
  } catch(error) {
    console.log(error);
    console.log('hello');
  }
}

const getForecast = async () => {
	const urlToFetch = `${forecastUrl}${apiKey}&q=${$input.val()}&days=4&hour=11`;
  console.log(`Forecast url to fetch: ${urlToFetch}`);
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      //converts response into json
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      //selects forecast data
      const days = jsonResponse.forecast.forecastday;
      return days;
    }
  } catch(error) {
    console.log(error);
  }
}

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // selects the icon property from the API
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h3>${venues[0].location.city}</h3>`);
}

const renderForecast = (days) => {
  $weatherDivs.forEach(($day, index) => {
		const currentDay = days[index];
    // displays weather data
    let weatherContent = createWeatherHTML(currentDay);
    $day.append(weatherContent);
  });
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  submitCSS();
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch);

// stop the site from running if there is an error https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error