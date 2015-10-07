stayCation.controller('FooterCtrl', function FooterCtrl($scope, SaveFactory) {
  // Connect this CanvasCtrl to the SaveFactory
  $scope.SaveFactory = SaveFactory;
  $scope.video = SaveFactory.video;
  $scope.canvas = SaveFactory.canvas;
  $scope.context = SaveFactory.context;
  $scope.videoReady = SaveFactory.videoReady;

  // console.log("$scope.context in FooterCtrl is:");
  // console.log($scope.context);

  console.log(SaveFactory.videoReady);

  

}); // end controller
