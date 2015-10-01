var stayCation = angular.module('stayCation', ['ui.router']);

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

});
