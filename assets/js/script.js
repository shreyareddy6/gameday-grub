function openModal(modalId, sportName) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
    document.getElementById("modalTitle").textContent = sportName;
    modal.classList.remove("hidden");
    console.log(modal);
    displayEventsOnModal(sportName);
  }
}

function closeModal(modalId) {
  console.log("inside 1");
  const modal = document.getElementById(modalId);
  console.log(modal);
  modal.classList.add("hidden");
  modal.style.display = "none";
}

function displayEventsOnModal(sportName) {
  const apiKey = "yGPLSRwLKzHAgAdFANWvvUHIwVbZm8o3";
  const keyword = sportName.toLowerCase();
  console.log("keyword " + keyword);
  const today = new Date();
  const startDateTime =
    new Date(today.setHours(0, 0, 0, 0)).toISOString().split(".")[0] + "Z"; // Start of today
  const proxyUrl = "https://floating-headland-95050.herokuapp.com/";
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=${apiKey}&keyword=${keyword}&startDateTime=${startDateTime}`;

  const apiUrl = proxyUrl + url;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //   console.log(data._embedded.events[0]._embedded.venues[0].city.name);
      const eventsContainer = document.getElementById("events");
      eventsContainer.textContent = "";
      if (data._embedded && data._embedded.events) {
        console.log(data._embedded.events.length);
        data._embedded.events.forEach((event) => {
          const eventElement = document.createElement("div");
          eventElement.classList =
            "event-data py-2 px-4 border-black rounded shadow-lg";
          eventElement.innerHTML = `
                        <h2>${event.name}</h2>
                        <img src='${event.images[1].url}'></img>
                        <p>Date: ${dayjs(event.dates.start.dateTime).format(
                          "ddd, MMM DD h:mm a"
                        )}</p>
                        <p>City: ${event._embedded.venues[0].city.name}</p>
                    `;
          eventsContainer.appendChild(eventElement);
        });
      } else {
        eventsContainer.innerHTML = "<p>No past events found.</p>";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function searchByTeam() {
  const userInput = document.getElementById("search-input").value;
  console.log("button clicked");
  console.log(document.getElementById("search-input").value);
  if (userInput) {
    displayEventsOnModal(userInput);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("closeButton").addEventListener("click", function () {
    closeModal("formModal");
  });
  document
    .getElementById("search-button")
    .addEventListener("click", function () {
      searchByTeam();
    });
});
