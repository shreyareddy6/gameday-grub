const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/9.3.2' } };
var temp = "dodgers"
fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${temp}i%20&apikey=yGPLSRwLKzHAgAdFANWvvUHIwVbZm8o3`, options)
    .then(response => response.json())

    .then(response => console.log(response))

    .catch (err => console.error(err)) 