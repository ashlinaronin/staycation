stayCation.controller('ImgTestCtrl', function ImgTestCtrl($scope, GoogleImagesFactory, $http) {

    // Connect to GoogleImagesFactory
    $scope.backgroundUrl = GoogleImagesFactory.imageUrl;
    $scope.itemUrl = GoogleImagesFactory.itemUrl;

    $scope.GoogleImagesFactory = GoogleImagesFactory;

    $results = null;

    $http.get('url').then(function successCallback (response) {
      $results = response.body;
    }, function errorCallback (response) {
      alert("error getting google images");
    });


}); // end controller
