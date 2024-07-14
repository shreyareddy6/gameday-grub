const ticketmaster = { method: 'GET', headers: { 'User-Agent': 'insomnia/9.3.2' } };
var temp = "dodgers"
fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${temp}%20&apikey=yGPLSRwLKzHAgAdFANWvvUHIwVbZm8o3`, ticketmaster)
    .then(response => response.json())

    .then(response => console.log(response))

    .catch(err => console.error(err))

const url = 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=304554';
const tripadvisor16 = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '610f35df02msh62c05973662210dp1fb3e6jsn1221486feec9',
        'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com'
    }
};

fetch(`https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=304554`, tripadvisor16)
    .then(response => response.json())

    .then(response => console.log(response))

    .catch(err => console.error(err))