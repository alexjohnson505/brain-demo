'use strict';

console.log("App Running");

// Leaflet map reference
var mymap;

// Reference to active layers
var layers = [];

// When form (checkboxes) are updated
function update(form){
  var values = {};

  // Read values from form
  $.each(form.serializeArray(), function(i, field) {
      values[field.name] = field.value;
  });

  // Check which channels we have
  var i = {
    B : values['B'] || "X",
    W : values['W'] || "X",
    G : values['G'] || "X",
    R : values['R'] || "X",
  };

  // Build filename
  var url = i.B + i.W + i.G + i.R;
  var filename = 'images/05_' + url + '.gif';

  // Add image to the map
  addImage(filename);
}

function addImage(filename){

  // Remove previous layers
  $.each(layers, function(i, layer){
    mymap.removeLayer(layer);
  })

  // Clear layers
  layers = [];

  // Console feedback
  console.log("Adding '" + filename + "'' to the document.");

  var imageBounds = [[0, 0], [1, 1]];
  var layer = L.imageOverlay(filename, imageBounds).addTo(mymap);

  layers.push(layer);
}

// Document ready
$(function(){

  // Set height of map
  $('#map').css('height', $(document).height());

  // Initialize new leaflet map
  mymap = L.map('map').setView([0.5, 0.5], 9);

  // Watch for changes on form.
  $( "#form" ).change(function() {
    update($('#form'));
  });

  addImage("images/05_XXXX.gif");
})
