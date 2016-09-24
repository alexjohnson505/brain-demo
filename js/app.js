'use strict';

console.log("App Running");

function update(form){
  var values = {};

  $.each(form.serializeArray(), function(i, field) {
      values[field.name] = field.value;
  });

  var i = {
    B : values['B'] || "X",
    W : values['W'] || "X",
    G : values['G'] || "X",
    R : values['R'] || "X",
  };

  var url = i.B + i.W + i.G + i.R;
  var filename = '/images/05_' + url + '.gif';

  // $('img#main').attr('src', filename);
  addImage(filename)
}


function addImage(filename){
  console.log(filename);


}

$(function(){

  $('#map').css('height', $(document).height());

  var mymap = L.map('map').setView([0.5, 0.5], 9);

  L.marker([0, 0]).addTo(mymap).bindPopup("[0,0]").openPopup();
  L.marker([1, 1]).addTo(mymap).bindPopup("[1,1]").openPopup();

  var imageUrl = 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg';
  var imageBounds = [[0, 0], [1, 1]];

  L.imageOverlay(imageUrl, imageBounds).addTo(mymap);

  $( "#form" ).change(function() {
    update($('#form'));
  });


})
