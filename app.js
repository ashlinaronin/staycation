var stayCation = angular.module('stayCation', ['ui.router', 'webcam']);

stayCation.config(function($stateProvider, $urlRouterProvider) {

  //Path for homepage
  $stateProvider.state('home', {
    url:"",
    templateUrl:"partials/home.html"
  });
});
