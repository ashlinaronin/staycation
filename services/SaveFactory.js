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
    console.log(factory.videoReady);

    // var myimg = ('myimage');
    // console.dir('myimage');
    factory.S('myimage').border = '1px solid black';
    var dataURL = factory.canvas.toDataURL();
    factory.O('myimage').src = dataURL;
    // 
    // var dataString = dataURL.split(",")[1];
    // var buffer =
  };



  return factory;

});
