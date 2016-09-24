'use strict';

console.log("App Running");

$(function(){

  var options = {
    
  }

  wheelzoom(document.querySelector('img.zoom', options));

  $( "#form" ).change(function() {

    var values = {};

    $.each($('#form').serializeArray(), function(i, field) {
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

    $('img#main').attr('src', filename);

  });  
})
