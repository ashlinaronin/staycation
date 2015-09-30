var stayCation = angular.module('stayCation', ['ui.router']);

stayCation.config(function($stateProvider, $urlRouterProvider) {

  //Path for homepage
  $stateProvider.state('home', {
    url:"",
    templateUrl:"partials/home.html"
  });

  // Ashlin's web speech test
  $stateProvider.state('webspeechtest', {
    url: "/webspeechtest",
    templateUrl: "partials/webspeechtest.html",
    controller: "WebSpeechCtrl"
  });

});
