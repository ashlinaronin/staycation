stayCation.controller('CanvasCtrl', function CanvasCtrl($scope, ImageFactory) {
  // Connect this CanvasCtrl to the ImageFactory
  $scope.items = ImageFactory.items;
  $scope.bg = ImageFactory.bg;
  $scope.ImageFactory = ImageFactory;

  // $scope.SaveFactory = SaveFactory;
  $scope.video = null;
  $scope.canvas = null;
  $scope.context = null;

  // These saving-related functions should be accessible from outside the video loop,
  // so we define them at $scope
  $scope.O = function(item) {
    return typeof item == 'object' ? item: document.getElementById(item);
  };

  $scope.S = function(item) {
    return $scope.O(item).style;
  };

  $scope.C = function(item) {
    return document.getELementByClassName(item);
  };

  $scope.saveImage = function() {
    // this should be in the controller but inside of a button handler'
    $scope.S('myimage').border = '1px solid black';
    $scope.O('myimage').src = $scope.canvas.toDataURL();
  }


  //Movable "prop" images on canvas.

  angular.element(document).ready(function() {
    var errorCallback = function(e) {
      console.log('Reeeejected!', e);
    };


    navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
      // var video = document.querySelector('video');
      // var canvas = document.getElementById('canvasVid');
      // var context = canvas.getContext('2d');

      $scope.video = document.querySelector('video');
      $scope.canvas = document.getElementById('canvasVid');
      $scope.context = $scope.canvas.getContext('2d');

      video.src = window.URL.createObjectURL(localMediaStream);

      video.addEventListener('play', function() {
        // Every 33 milliseconds copy the video image to the canvas
        setInterval(function() {
            $scope.context.drawImage(video, 0, 0, 320, 240);
        }, 33);
      }, false);
    }, errorCallback);





  }); // end document ready



}); // end controller
