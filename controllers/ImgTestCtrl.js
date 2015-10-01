stayCation.controller('ImgTestCtrl', function ImgTestCtrl($scope, GoogleImagesFactory, $http) {

    // Connect to GoogleImagesFactory
    $scope.backgroundUrl = GoogleImagesFactory.imageUrl;
    $scope.itemUrl = GoogleImagesFactory.itemUrl;

    $scope.GoogleImagesFactory = GoogleImagesFactory;

    $scope.results = null;
    $scope.status = null;
    $scope.statusText = null;
    $scope.details = null;

    var customsearch = 'https://www.googleapis.com/customsearch/v1?key=';
    var apiKey = 'AIzaSyDB5cOgPfH_VSA7yRcHiF3MGba4Wx_2a7c';
    var cx = '014144397479220879650:sd7rzvq2hog';
    var query = 'dog';
    var fields = 'kind,items(title,characteristics/length)';

    $http.get('https://www.googleapis.com/customsearch/v1?key=' + apiKey +
     '&cx=' + cx + '&q=' + query).then(function successCallback (response) {
      $results = response.data;
      $status = response.status;
      $statusText = response.statusText;
      $scope.details = response;
      console.log("status is " + response.status);
      // $scope.$apply();
    }, function errorCallback (response) {
      alert("error getting google images");
    });

    // $.getJSON(customsearch, {
    //
    // })


}); // end controller
