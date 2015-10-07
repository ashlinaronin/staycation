stayCation.factory('CanvasFactory', function CanvasFactory() {
  var factory = {};

  var canvas = factory.O('mycanvas');
  var context = canvas.getContext('2d');
  context.fillstyle = 'red';
  factory.S(canvas).border = '1px solid black';

  context.beginPath();
  context.moveTo(160,120);
  context.arc(160, 120, 70, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();

  factory.S('myimage').border = '1px solid black';
  factory.O('myimage').src = canvas.toDataURL();

  factory.O = function(item) {
    return typeof item == 'object' ? item: document.getElementById(item);
  };

  factory.S = function(item) {
    return factory.O(item).style;
  };

  factory.C = function(item) {
    return document.getELementByClassName(item);
  };

  return factory;

});
