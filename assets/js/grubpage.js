const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/9.3.2' } };
var temp = "dodgers"
fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${temp}%20&apikey=yGPLSRwLKzHAgAdFANWvvUHIwVbZm8o3`, options)
    .then(response => response.json())

    .then(response => console.log(response))

    .catch(err => console.error(err))


var lat = 34.0658;
var lng = -118.2388;
let map;

async function initMap() {
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    //let center = new google.map.LatLng(lat, lng);

    map = new Map(document.getElementById('map'), {
        zoom: 5,
        center: {"lat":lat,"lng":lng},
        mapTypeId: 'roadmap',
    });
    nearbySearch()

}

//var center = new google.maps.LatLng(-30.2965590, 153.1152650);
async function nearbySearch() {
    const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary(
        "places",
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
    