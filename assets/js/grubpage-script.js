/* GOOGLE MAPS API BELOW
-------------------------- */
const card = document.querySelector("#card");
// var lat = 34.0658;
// var lng = -118.2388;
let map;
let places;
let coordinates;

// Get Latitude and Longitude of venue
async function getVenueCoordinates() {
  const coordinates = JSON.parse(localStorage.getItem("venue"));
  if (coordinates) {
    const { longitude, latitude } = JSON.parse(localStorage.getItem("venue"));
    return { longitude, latitude };
  }
}

//var center = new google.maps.LatLng(-30.2965590, 153.1152650);
async function nearbySearch() {
  const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary(
    "places"
  );
  let coordinates = await getVenueCoordinates();
  if (coordinates) {
    // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    // Restrict within the map viewport.
    let center = new google.maps.LatLng(
      coordinates.latitude,
      coordinates.longitude
    );
    const request = {
      // required parameters
      fields: [
        "displayName",
        "location",
        "photos",
        "formattedAddress",
        "rating",
        "websiteURI",
      ],
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
    return places;
  }
}

async function renderRestaurantCard() {
  let places = await nearbySearch()

  for (let i = 0; i < places.length; i++) {
    const temp = places[i];
    const restaurant = temp.Eg.photos[0].name;
    const test = restaurant.split("photos/")
    const photoURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=200&photo_reference=${test[1]}&key=AIzaSyAmPbsK8vlRNrUfQKgY9QM-yI-WZanhKBY`

    console.log(photoURL);
    console.log(test);

    console.log(temp.Eg.photos[0].name);

    console.log(temp);

    const div1 = document.createElement('div');
    div1.classList.add("max-w-md", "mx-auto", "bg-white", "rounded-xl", "shadow-md", "overflow-hidden", "border-2", "border-orange-400");

    const img = document.createElement('img');
    img.classList.add("w-full", "h-48", "object-cover");
    img.setAttribute('src', photoURL);

    const div2 = document.createElement('div');
    div2.classList.add("p-6");

    const h = document.createElement('h2');
    h.classList.add('text-lg', 'font-bold', 'text-gray-900');
    h.textContent = temp.Eg.displayName;

    const p = document.createElement('p');
    p.classList.add('mt-1', 'text-gray-600')
    p.textContent = temp.Eg.formattedAddress;

    const div3 = document.createElement('div');
    div3.classList.add('mt-4', 'flex', 'items-center');

    const div4 = document.createElement('div');
    div4.classList.add('flex')

    const svg = document.createElement('svg');
    svg.classList.add('w-5', 'h-5', 'text-yellow-500');

    const rating = document.createElement('p');
    rating.classList.add('mt-1', 'text-gray-600');
    rating.textContent = temp.Eg.rating;

    //if (temp.Eg.websiteURI !== null) {
      const a = document.createElement('a');
      a.classList.add('block', 'mt-4', 'text-indigo-500', 'hover:underline');
      a.textContent = temp.Eg.websiteURI;
      a.href = temp.Eg.websiteURI;
    //}

    card.append(div1);
    div1.appendChild(img);
    div1.appendChild(div2);
    div2.appendChild(h);
    div2.appendChild(p);
    div2.appendChild(div3);
    div3.appendChild(div4);
    div3.appendChild(a);
    div4.appendChild(svg);
    div4.appendChild(rating)
  }
}

//remove this later, testing purposes
async function renderRestaurantDetails() {
  let places = await nearbySearch();
  console.log(places);
  renderRestaurantCard();
}
