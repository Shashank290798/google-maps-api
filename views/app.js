// Variables for form elements
const form = document.getElementById("map-form");
const startInput = document.getElementById("start");
const endInput = document.getElementById("end");
const modeSelector = document.getElementById("mode-selector");
const submitBtn = document.getElementById("submit");

// Initialize the Google Maps API
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: 41.85, lng: -87.65 }
  });

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    map: map
  });

  // Autocomplete functionality for start and end inputs
  const startAutocomplete = new google.maps.places.Autocomplete(startInput);
  const endAutocomplete = new google.maps.places.Autocomplete(endInput);

  // Submit form event listener
  submitBtn.addEventListener("click", function() {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  });
}

// Function to calculate and display the route on the map
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService.route(
    {
      origin: startInput.value,
      destination: endInput.value,
      travelMode: google.maps.TravelMode[modeSelector.value]
    },
    function(response, status) {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}
