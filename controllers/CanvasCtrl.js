stayCation.controller('CanvasCtrl', function CanvasCtrl($scope, ImageFactory, SaveFactory) {
  // Connect this CanvasCtrl to the ImageFactory
  $scope.items = ImageFactory.items;
  $scope.bg = ImageFactory.bg;
  $scope.ImageFactory = ImageFactory;


  // Connect this CanvasCtrl to the SaveFactory
  $scope.SaveFactory = SaveFactory;
  $scope.video = SaveFactory.video;
  $scope.canvas = SaveFactory.canvas;
  $scope.context = SaveFactory.context;
  $scope.videoReady = SaveFactory.videoReady;


  //Movable "prop" images on canvas.

  angular.element(document).ready(function() {
    var errorCallback = function(e) {
      console.log('Reeeejected!', e);
    };


    navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
      // var video = document.querySelector('video');
      // var canvas = document.getElementById('canvasVid');
      // var context = canvas.getContext('2d');

      SaveFactory.video = document.querySelector('video');
      SaveFactory.canvas = document.getElementById('canvasVid');
      SaveFactory.context = SaveFactory.canvas.getContext('2d');
      // console.log("$scope.context is ");
      // console.dir($scope.context);

      video.src = window.URL.createObjectURL(localMediaStream);

      SaveFactory.videoReady = true;

      video.addEventListener('play', function() {
        // Every 33 milliseconds copy the video image to the canvas
        setInterval(function() {
            SaveFactory.context.drawImage(video, 0, 0, 320, 240);
        }, 33);
      }, false);
    }, errorCallback);





  }); // end document ready



}); // end controller
