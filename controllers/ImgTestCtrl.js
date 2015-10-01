stayCation.controller('ImgTestCtrl', function ImgTestCtrl($scope, ImageFactory, $http) {

    // Connect to ImageFactory
    $scope.backgroundUrl = ImageFactory.imageUrl;
    $scope.itemUrl = ImageFactory.itemUrl;

    $scope.ImageFactory = ImageFactory;

    $scope.results = null;
    $scope.status = null;
    $scope.statusText = null;
    $scope.details = null;

    $scope.imageLink = null;
    $scope.imageSnippet = null;




    // Set up GET request to Google Custom Search API
    var customsearch = 'https://www.googleapis.com/customsearch/v1?key=';
    var apiKey = 'AIzaSyDB5cOgPfH_VSA7yRcHiF3MGba4Wx_2a7c';
    var cx = '014144397479220879650:sd7rzvq2hog';
    var query = 'dog';
    var fields = 'items(link,snippet)';
    var imageType = 'clipart';
    var numResults = 1;
    var getReq = customsearch + apiKey + '&cx=' + cx + '&q=' + query +
      '&imageType=' + imageType + '&num=' + numResults + '&fields=' + fields +
      '&searchType=image&fileType=jpg&imgSize=small&alt=json';

    $http.get(getReq).then(function successCallback (response) {
      $scope.details = response;
      console.log("status is " + response.status);

      $scope.imageLink = response.data.items[0].link;
      $scope.imageSnippet = response.data.items[0].snippet;
      // $scope.$apply();
    }, function errorCallback (response) {
      alert("error getting google images");
    });



}); // end controller
