stayCation.factory('SaveFactory', function SaveFactory() {
  var factory = {};

  factory.videoReady = false;



  // var canvas = factory.O('mycanvas');
  // var context = canvas.getContext('2d');

  factory.video = null;
  factory.canvas = null;
  factory.context = null;

  factory.O = function(item) {
    return typeof item == 'object' ? item: document.getElementById(item);
  };

  factory.S = function(item) {
    return factory.O(item).style;
  };

  factory.C = function(item) {
    return document.getELementByClassName(item);
  };

  factory.saveImage = function() {
    // this should be in the controller but inside of a button handler'
    // console.dir(factory.canvas);
    // console.log(factory.videoReady);

    var canvas = document.createElement("canvas");
    var dataURL = factory.canvas.toDataURL( "image/png" );
    var data = atob( dataURL.substring( "data:image/png;base64,".length)),
      asArray = new Uint8Array(data.length);

    for(var i = 0, len = data.length; i < len; ++i) {
      asArray[i] = data.charCodeAt(i);
    }

    var blob = new Blob( [ asArray.buffer ], {type: "image/png"});

    factory.S('myimage').border = '1px solid black';

    factory.O('myimage').src = dataURL;

    factory.imageUrl = dataURL;

  };



  return factory;

});
