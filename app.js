var stayCation = angular.module('stayCation', ['ui.router', 'webcam']);

stayCation.config(function($stateProvider, $urlRouterProvider) {

  //Path for homepage
  $stateProvider.state('home', {
    url:"",
    templateUrl:"partials/home.html"
  });

  $stateProvider.state('video_test', {
    url: "/video_test",
    templateUrl: "partials/video_test.html"
  });

  $stateProvider.state('video_test2', {
    url: "/video_test2",
    templateUrl: "video_test/video_test2.html"
  });

});
