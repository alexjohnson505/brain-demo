console.log("App Running");

// Leaflet map reference
var map;

// Reference to active layers
var layers = [];

// When form (checkboxes) are updated
function update(form){

  if (!form) return;

  var values = {};

  // Read values from form
  $.each(form.serializeArray(), function(i, field) {
      values[field.name] = field.value;
  });

  // Check which channels we have
  var i = {
    B : values.B || "X",
    W : values.W || "X",
    G : values.G || "X",
    R : values.R || "X",
  };

  // Build filename
  var url = i.B + i.W + i.G + i.R;
  var filename = 'images/05_' + url + '.gif';

  // Add image to the map
  addImage(filename);
}

function addImage(filename){

  if (!filename) return;

  // Remove previous layers
  $.each(layers, function(i, layer){
    map.removeLayer(layer);
  });

  // Clear layers
  layers = [];

  // Console feedback
  console.log("Adding '" + filename + "' to the document.");

  var imageBounds = [[0, 0], [1, 1]];
  var layer = L.imageOverlay(filename, imageBounds).addTo(map);

  layers.push(layer);
}

function changeBrain(id){
  // find image set
  // pre-load
}

function loading(boolean){
  if (boolean) {
    $('.loading').css('opacity', 1);
    $('.loading').css('z-index', 999);
  } else {
      setTimeout(function() {
        $('.loading').css('opacity', 0);
      }, 500);

      setTimeout(function() {
        $('.loading').css('z-index', -1);
      }, 1000);
  }
}

// Document ready
$(function(){

  // Set Leaflet map to height of document
  $('#map').css('height', $(document).height());

  var options = {
    minZoom: 10,
    maxZoom: 13,
    zoomControl: false,
  };

  // Initialize new leaflet map
  map = L.map('map', options).setView([0.5, 0.5], 10);

  //add zoom control with your options
  L.control.zoom({
      position:'topright'
  }).addTo(map);

  // Watch for changes on form.
  $( "#form" ).change(function() {
    update($('#form'));
  });

  addImage("images/05_XXXX.gif");

  // Parse local CSV file
  Papa.parse('data/images.csv', {
    download: true,
    complete: function(results) {

      // Parsing error
      if (results.errors && results.errors.length > 0) {
        alert("Error loading data. Check Javascript console for more details");
        console.error(results.errors);
        return;
      }

      results = results.data;

      var keys = results[0];

      var values = results.splice(1, results.length);

      var acc = [];

      $.each(values, function(index, row){
        
        var obj = {};

        $.each(keys, function(i, value){
          obj[value] = row[i];
        });

        acc.push(obj);

      });

      console.log("CSV Finished:", acc);

      loading(false);
    }
});

});
