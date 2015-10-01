var stayCation = angular.module('stayCation', ['ui.router', 'webcam']);

stayCation.config(function($stateProvider, $urlRouterProvider) {

  //Path for homepage
  $stateProvider.state('home', {
    url:"",
    templateUrl:"partials/home.html"
  });


  //Path for movable items test page:
  $stateProvider.state('movable-test', {
    url:"/movable-test",
    templateUrl:"partials/movable-test.html",
    controller:"MovablesCtrl"
  });

  // Ashlin's web speech test
  $stateProvider.state('webspeechtest', {
    url: "/webspeechtest",
    templateUrl: "partials/webspeechtest.html",
    controller: "WebSpeechCtrl"
  });

  // Ashlin's google image test
  $stateProvider.state('googleimagestest', {
    url: "/googleimagestest",
    templateUrl: "partials/googleimagestest.html",
    controller: "ImgTestCtrl"

  });

});
