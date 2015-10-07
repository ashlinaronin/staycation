stayCation.controller('CanvasCtrl', function CanvasCtrl($scope, ImageFactory) {
  // Connect this CanvasCtrl to the ImageFactory
  $scope.items = ImageFactory.items;
  $scope.bg = ImageFactory.bg;
  $scope.ImageFactory = ImageFactory;

  //Movable "prop" images on canvas.

}); // end controller
