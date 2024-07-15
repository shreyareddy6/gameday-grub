// global variables
const apiKey = "yGPLSRwLKzHAgAdFANWvvUHIwVbZm8o3";
const teamName = "Dodgers"; // needs to be feed input from modal
const gameDate = "2024-07-19"; // needs jquery datepicker input from modal
const eventContainerEL = document.getElementById("event-container");
const proxyUrl = "https://floating-headland-95050.herokuapp.com/";
const url = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}&keyword=${teamName}&localStartDateTime=${gameDate}T00:00:00,${gameDate}T23:59:59&`;
const ticketmasterUrl = proxyUrl + url;

// --------store venue details-----------------
// const gameDate = document.getElementById('').value;
// const teamName = document.getElementById('').value;

/* TICKETMASTER API BELOW 
 -------------------------- */

// this fetches the gameday venue data from the api
function getVenueApi() {
  fetch(ticketmasterUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // call render & title functions
      renderEventCard(data);
      setPageTitle(data._embedded.events[0]._embedded.venues[0].name);
    })
    .catch((err) => console.error(err));
}

// this puts the selected game info on the page
function renderEventCard(venueData) {
  // pull in desired event and venue data from api
  const eventName = venueData._embedded.events[0].name;
  const venueName = venueData._embedded.events[0]._embedded.venues[0].name;
  const eventDate = venueData._embedded.events[0].dates.start.dateTime;
  const venueAddress =
    venueData._embedded.events[0]._embedded.venues[0].address.line1;
  const venueCity = venueData._embedded.events[0]._embedded.venues[0].city.name;
  const venueState =
    venueData._embedded.events[0]._embedded.venues[0].state.stateCode;
  const venueLocation =
    venueData._embedded.events[0]._embedded.venues[0].location; // gives long and lat values. needs to be set to localStorage

  // create elements to render event info to
  const nameEL = document.createElement("h1");
  const venueEL = document.createElement("h2");
  const dateEL = document.createElement("h3");
  const addressEL = document.createElement("p");

  //insert event values to elements
  nameEL.textContent = eventName;
  venueEL.textContent = venueName;
  dateEL.textContent = dayjs(eventDate).format("MMMM D, YYYY");
  addressEL.textContent = `${venueAddress}\n
    ${venueCity}, ${venueState}`; // should be a paragraph break after venueAddress

  // append elements and info to page
  eventContainerEL.append(nameEL, venueEL, dateEL, addressEL);

  storeVenueDetails(venueLocation);
}

// set the webpage title to selected team name
function setPageTitle(venueName) {
  const pageTitle = document.getElementById("team-title");
  pageTitle.textContent = venueName + " Nearby Grub | GameDay Grub";
}

// Store the venue details - Latitude and Longitude
function storeVenueDetails(venue) {
  localStorage.setItem("venue", JSON.stringify(venue));
}

// Get Latitude and Longitude of venue
function getVenueCoordinates() {
  console.log("inside");
  const { longitude, latitude } = JSON.parse(localStorage.getItem("venue"));
  return { longitude, latitude };
}
// functions, event listeners, etc. to run on page load
getVenueApi();

/* GOOGLE MAPS API BELOW
-------------------------- */

// var lat = 34.0658;
// var lng = -118.2388;
let map;

async function initMap() {
  console.log("init");
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  var coordinates = getVenueCoordinates();
  const longitude = coordinates.longitude;
  const latitude = coordinates.latitude;

  //let center = new google.map.LatLng(lat, lng);

  map = new Map(document.getElementById("map"), {
    zoom: 5,
    center: { lat: latitude, lng: longitude },
    mapTypeId: "roadmap",
  });
  nearbySearch();
}

//var center = new google.maps.LatLng(-30.2965590, 153.1152650);
async function nearbySearch() {
  const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary(
    "places"
  );
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  // Restrict within the map viewport.
  let center = new google.maps.LatLng(lat, lng);
  const request = {
    // required parameters
    fields: ["displayName", "location", "businessStatus"],
    locationRestriction: {
      center: center,
      radius: 500,
    },
    // optional parameters
    includedPrimaryTypes: ["restaurant"],
    maxResultCount: 5,
    rankPreference: SearchNearbyRankPreference.POPULARITY,
    language: "en-US",
    region: "us",
  };
  //@ts-ignore
  const { places } = await Place.searchNearby(request);

  if (places.length) {
    console.log(places);

    const { LatLngBounds } = await google.maps.importLibrary("core");
    const bounds = new LatLngBounds();

    // Loop through and get all the results.
    places.forEach((place) => {
      const markerView = new AdvancedMarkerElement({
        map,
        position: place.location,
        title: place.displayName,
      });

      bounds.extend(place.location);
      console.log(place);
    });
    map.fitBounds(bounds);
  } else {
    console.log("No results");
  }
}

initMap();
