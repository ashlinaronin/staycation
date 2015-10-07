stayCation.factory('SaveFactory', function SaveFactory() {
  var factory = {};

  // var canvas = factory.O('mycanvas');
  // var context = canvas.getContext('2d');

  $scope.SaveFactory.video = null;
  $scope.SaveFactory.canvas = null;
  $scope.SaveFactory.context = null;


  

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
