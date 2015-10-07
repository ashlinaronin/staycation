stayCation.controller('CanvasCtrl', function CanvasCtrl($scope, ImageFactory, CanvasFactory) {
  // Connect this CanvasCtrl to the ImageFactory
  $scope.items = ImageFactory.items;
  $scope.bg = ImageFactory.bg;
  $scope.ImageFactory = ImageFactory;

  $scope.CanvasFactory = CanvasFactory;

  //Movable "prop" images on canvas.

  angular.element(document).ready(function() {
    var errorCallback = function(e) {
      console.log('Reeeejected!', e);
    };

    navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
      var video = document.querySelector('video');
      var canvas = document.getElementById('canvasVid');
      var context = canvas.getContext('2d');

      video.src = window.URL.createObjectURL(localMediaStream);

      video.addEventListener('play', function() {
        // Every 33 milliseconds copy the video image to the canvas
        setInterval(function() {
            context.drawImage(video, 0, 0, 320, 240);
        }, 33);
      }, false);
    }, errorCallback);


  }); // end document ready



}); // end controller
