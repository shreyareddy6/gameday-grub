const apiKey = 'yGPLSRwLKzHAgAdFANWvvUHIwVbZm8o3'
// user input values for ticketmaster api query to get venue data
const teamName = 'dodgers'
const gameDate = '2024-07-19'
// const gameDate = document.getElementById('').value;
// const teamName = document.getElementById('').value;

// a function to fetch the gameday venue data from the api
function getVenueApi() {
    const ticketmasterUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}&keyword=${teamName}&localStartEndDateTime=${gameDate}T00:00:00,${gameDate}T23:59:59`

    fetch(ticketmasterUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            console.log(data._embedded.events[0]._embedded.venues[0].name)
            console.log(data._embedded.events[0]._embedded.venues[0].address)
            console.log(data._embedded.events[0]._embedded.venues[0].city)
            console.log(data._embedded.events[0]._embedded.venues[0].state)
            console.log(data._embedded.events[0]._embedded.venues[0].location)
        })
        .catch(err => console.error(err))
}


getVenueApi();