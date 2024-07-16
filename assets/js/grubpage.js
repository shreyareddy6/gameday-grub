// global variables
const modalInputs = JSON.parse(localStorage.getItem("userInputs"));
const teamName = modalInputs.team;
const gameDate = modalInputs.date;
const apiKey = "yGPLSRwLKzHAgAdFANWvvUHIwVbZm8o3";
const eventContainerEL = document.getElementById("event-container");
const proxyUrl = "https://floating-headland-95050.herokuapp.com/";
const url = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}&keyword=${teamName}&localStartDateTime=${gameDate}T00:00:00,${gameDate}T23:59:59&`;
const ticketmasterUrl = proxyUrl + url;

/* TICKETMASTER API BELOW 
 -------------------------- */

// function to fetch the gameday venue data from the api
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

// function to put the selected game info on the page
function renderEventCard(venueData) {
  // pull in desired event and venue data from api
  console.log(venueData);
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
  const imageUrl = venueData._embedded.events[0].images[1].url;
  // create elements to render event info to
  const nameEL = document.createElement("h1");
  const venueEL = document.createElement("h2");
  const dateEL = document.createElement("h3");
  const addressEL = document.createElement("p");
  const imageEL = document.createElement("img");
  console.log(imageUrl);
  //insert event values to elements
  nameEL.textContent = eventName;
  venueEL.textContent = venueName;
  dateEL.textContent = dayjs(eventDate).format("dddd MMMM D, YYYY");
  addressEL.textContent = `${venueAddress}\n
    ${venueCity}, ${venueState}`; // should be a paragraph break after venueAddress
  imageEL.setAttribute("src", imageUrl);

  // Styling to the details
  eventContainerEL.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "bg-gray-200",
    "p-6",
    "m-4",
    "rounded-lg",
    "shadow-lg"
  );
  imageEL.classList.add("h-64", "mb-4", "object-contain", "rounded-md");
  nameEL.classList.add("text-3xl", "font-extrabold", "text-black", "mb-2");
  venueEL.classList.add("text-md", "text-black", "mb-2");
  dateEL.classList.add("text-xl", "text-black", "mb-2");
  addressEL.classList.add("text-sm", "text-black", "mb-4");
  // append elements and info to page
  eventContainerEL.append(imageEL, nameEL, dateEL, venueEL, addressEL);

  storeVenueDetails(venueLocation);
}

// function to store the venue details - Latitude and Longitude
function storeVenueDetails(venue) {
  localStorage.setItem("venue", JSON.stringify(venue));
}

// function to set the webpage title to selected team name
function setPageTitle(venueName) {
  const pageTitle = document.getElementById("team-title");
  pageTitle.textContent = venueName + " Nearby Grub | GameDay Grub";
}

// functions, event listeners, etc. to run on page load
if (gameDate.value !== "" && teamName.value !== "") {
  getVenueApi();
}
