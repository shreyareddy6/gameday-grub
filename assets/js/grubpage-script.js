/* GOOGLE MAPS API BELOW
-------------------------- */

// var lat = 34.0658;
// var lng = -118.2388;
let map;
let places;

// Get Latitude and Longitude of venue
function getVenueCoordinates() {
  const { longitude, latitude } = JSON.parse(localStorage.getItem("venue"));
  return { longitude, latitude };
}

//var center = new google.maps.LatLng(-30.2965590, 153.1152650);
async function nearbySearch() {
  const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary(
    "places"
  );
  let coordinates = getVenueCoordinates();
  // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  // Restrict within the map viewport.
  let center = new google.maps.LatLng(
    coordinates.latitude,
    coordinates.longitude
  );
    const request = {
        // required parameters
        fields: ["displayName", "location", "photos", "formattedAddress", "rating", "websiteURI"],
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
    console.log(places);
    return (places);
}

function renderRestaurantCard(){

}

//remove this later, testing purposes
async function temp(){
    let places = await nearbySearch();
    console.log(places);
}
temp();
