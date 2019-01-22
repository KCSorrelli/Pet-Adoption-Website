var dogMarkers = [];
var catMarkers = [];
var shelterMarkers = [];


//console.log(allDogs[1].latitude)
var markersForDogLayer = new L.MarkerClusterGroup();

// add more markers here...


// Dog, Cat, Shelter marker for-loop

//dog
for (var i = 0; i < allDogs.length; i++) {
 if (i == i)
   dogMarkers.push(
     markersForDogLayer.addLayer(L.marker(L.latLng(
       allDogs[i].latitude,
       allDogs[i].longitude)
   )
   .bindPopup("<h2>" + allDogs[i].dog_name + "<h2><br><h3>" + "<br> Breed: " + allDogs[i].breed + "<br> Age: " + allDogs[i].age + "<br>" + "<a href = " + allDogs[i].website + " target= `_blank`>" + ` Learn more about ${allDogs[i].dog_name} </a>` + "<h3>")
 ));
}

//cat
var markersForCatLayer = new L.MarkerClusterGroup();

for (var i = 0; i < allCats.length; i++) {
  if (i == i)
    catMarkers.push(
      markersForCatLayer.addLayer(L.marker(L.latLng(
        allCats[i].latitude,
        allCats[i].longitude)
    )
    .bindPopup("<h2>" + allCats[i].cat_name + "<h2><br><h3>" + "<br> Breed: " + allCats[i].breed + "<br> Age: " + allCats[i].age + "<br>" + "<a href = " + allCats[i].website + " target= `_blank`>" + ` Learn more about ${allCats[i].cat_name} </a>` + "<h3>")
  ));
 }

 // shelter
 var markersForShelterLayer = new L.MarkerClusterGroup();

 for (var i = 0; i < allShelters.length; i++) {
   if (i == i)
     shelterMarkers.push(
       markersForShelterLayer.addLayer(L.marker(L.latLng(
         allShelters[i].latitude,
         allShelters[i].longitude)
     )
    .bindPopup("<h2>" + allShelters[i].shelter_name + "<h2><br><h3>" + allShelters[i].phone_number + "<br>" + allShelters[i].email + "<h3>")
  ));
}

// Create two separate layer groups: one for cities and one for states
var dogsLayer = L.layerGroup(dogMarkers);
var catsLayer = L.layerGroup(catMarkers);
var sheltersLayer = L.layerGroup(shelterMarkers);






var map = L.map("map", {
  center: [39.5, -98.35],
  zoom: 5,
 // layers: [streetmap, dogs, cats]
  // add shelters back in later
});

var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  minZoom: 3,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);




var geoJson = L.geoJson(statesData, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "blue",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        // fillColor: chooseColor(feature.properties.borough),
        fillOpacity: 0,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.3
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          map.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
     // layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");

    }
  }).addTo(map);




// var legend = L.control({position: 'topright'});
// legend.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend');
//     div.innerHTML = '<select><option>Shelters</option><option>Cats</option><option>Dogs</option></select>';
//     div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
//     return div;
// };
// legend.addTo(map);

var baseMaps = {
  "Street Map": streetmap
};

var overlayMaps = {
  "Shelters": sheltersLayer,
  "Cats": catsLayer,
  "Dogs": dogsLayer
};


L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(map);
