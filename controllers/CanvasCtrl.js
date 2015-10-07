stayCation.controller('CanvasCtrl', function CanvasCtrl($scope, ImageFactory, CanvasFactory) {
  // Connect this CanvasCtrl to the ImageFactory
  $scope.items = ImageFactory.items;
  $scope.bg = ImageFactory.bg;
  $scope.ImageFactory = ImageFactory;

  $scope.CanvasFactory = CanvasFactory;

}); // end controller
