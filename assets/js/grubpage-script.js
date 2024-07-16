/* GOOGLE MAPS API BELOW
-------------------------- */
const card = document.querySelector('#card')
// var lat = 34.0658;
// var lng = -118.2388;
let map;
let places;
let coordinates;

// Get Latitude and Longitude of venue
async function getVenueCoordinates() {
  const { longitude, latitude } = JSON.parse(localStorage.getItem("venue"));
  return { longitude, latitude };
}

//var center = new google.maps.LatLng(-30.2965590, 153.1152650);
async function nearbySearch() {
  const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary(
    "places"
  );
  let coordinates = await getVenueCoordinates();
  // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  // Restrict within the map viewport.
  let center = new google.maps.LatLng(
    coordinates.latitude,
    coordinates.longitude
  );
  const request = {
    // required parameters
    fields: ["displayName", "location", "photos", "formattedAddress", "rating", "websiteURI", ],
    locationRestriction: {
      center: center,
      radius: 500,
    },
    // optional parameters
    includedPrimaryTypes: ["restaurant"],
    maxResultCount: 6,
    rankPreference: SearchNearbyRankPreference.POPULARITY,
    language: "en-US",
    region: "us",
  };

  const { places } = await Place.searchNearby(request);
  //console.log(places);
  return (places);
}

async function renderRestaurantCard() {
  let places = await nearbySearch()
  for (let i = 0; i < places.length; i++) {
    const temp = places[i];
    console.log(temp);
    

    const div1 = document.createElement('div')
    div1.classList.add('bg-gradient-to-r', 'from-indigo-500', 'rounded', 'shadow-lg', 'transition', 'ease-in-out', 'delay-150', 'bg-blue-500', 'hover:-translate-y-1', 'hover:scale-110', 'hover:bg-indigo-500', 'duration-30');
    
    const div2 = document.createElement('div')
    div2.classList.add('m-4');


    const title = document.createElement('span');
    //title.classList.add('');
    title.textcontent = temp.Eg.displayName;
    console.log(title)

    card.append(div1);
    div1.appendChild(div2);
    
    div2.appendChild(title);

  }
}

//remove this later, testing purposes
async function temp() {
  let places = await nearbySearch();
  console.log(places);
  renderRestaurantCard();
}
temp();
