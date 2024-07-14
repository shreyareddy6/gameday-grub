// global variables
const apiKey = 'yGPLSRwLKzHAgAdFANWvvUHIwVbZm8o3'
const teamName = 'Dodgers' // needs to be feed input from modal
const gameDate = '2024-07-19' // needs jquery datepicker input from modal
const eventContainerEL = document.getElementById('event-container');
const ticketmasterUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}&keyword=${teamName}&localStartDateTime=${gameDate}T00:00:00,${gameDate}T23:59:59&`
// const gameDate = document.getElementById('').value;
// const teamName = document.getElementById('').value;


// set the webpage title to selected team name
function setPageTitle (venueName) {
    const pageTitle = document.getElementById('team-title');
    pageTitle.textContent = venueName + ' Nearby Grub | GameDay Grub'
}


// this fetches the gameday venue data from the api
function getVenueApi() {

    fetch(ticketmasterUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            // call render & title functions
            renderEventCard(data);
            setPageTitle(data._embedded.events[0]._embedded.venues[0].name);
            
        })
        .catch(err => console.error(err))
}


// this puts the selected game info on the page
function renderEventCard(venueData) {

    // pull in desired event and venue data from api
    const eventName = venueData._embedded.events[0].name
    const venueName = venueData._embedded.events[0]._embedded.venues[0].name
    const eventDate = venueData._embedded.events[0].dates.start.dateTime
    const venueAddress = venueData._embedded.events[0]._embedded.venues[0].address.line1
    const venueCity = venueData._embedded.events[0]._embedded.venues[0].city.name
    const venueState = venueData._embedded.events[0]._embedded.venues[0].state.stateCode
    const venueLocation = venueData._embedded.events[0]._embedded.venues[0].location // gives long and lat values. needs to be set to localStorage

    // create elements to render event info to
    const nameEL = document.createElement('h1');
    const venueEL = document.createElement('h2');
    const dateEL = document.createElement('h3');
    const addressEL = document.createElement('p');

    //insert event values to elements
    nameEL.textContent = eventName;
    venueEL.textContent = venueName;
    dateEL.textContent = dayjs(eventDate).format('MMMM D, YYYY')
    addressEL.textContent = `${venueAddress}\n
    ${venueCity}, ${venueState}` // should be a paragraph break after venueAddress

    // append elements and info to page
    eventContainerEL.append(nameEL, venueEL, dateEL, addressEL);
    
}

// functions, event listeners, etc. to run on page load
getVenueApi();