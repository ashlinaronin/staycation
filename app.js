var stayCation = angular.module('stayCation', ['ui.router', 'webcam']);

stayCation.config(function($stateProvider, $urlRouterProvider) {

  // new home page that includes multiple controllers
  // change controller for canvas to be whatever you're actually using
  $stateProvider.state('home', {
    url: '',
    views: {
      'header': {
        templateUrl: 'partials/header.html' },
      'canvas': {
        templateUrl: 'partials/canvas.html',
        controller: 'CanvasCtrl' },
      'webspeech': {
        templateUrl: 'partials/webspeech.html',
        controller: 'WebSpeechCtrl' },
      'footer': {
        templateUrl: 'partials/footer.html'
      }
    }
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
