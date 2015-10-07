stayCation.controller('CanvasCtrl', function CanvasCtrl($scope, ImageFactory, SaveFactory) {
  // Connect this CanvasCtrl to the ImageFactory
  $scope.items = ImageFactory.items;
  $scope.bg = ImageFactory.bg;
  $scope.ImageFactory = ImageFactory;


  $scope.tracker = null;
  $scope.video = null;
  $scope.canvas = null;
  $scope.context = null;

  //Movable "prop" images on canvas.


  // Connect this CanvasCtrl to the SaveFactory
  // $scope.SaveFactory = SaveFactory;
  // $scope.video = SaveFactory.video;
  // $scope.canvas = SaveFactory.canvas;
  // $scope.context = SaveFactory.context;
  // $scope.videoReady = SaveFactory.videoReady;



  angular.element(document).ready(function()
  {
    var errorCallback = function(e)
    {
      console.log('Reeeejected!', e);
    };


    navigator.getUserMedia({video: true, audio: true}, function(localMediaStream)
    {
      $scope.video = document.getElementById('video');
      $scope.canvas = document.getElementById('canvasVid');
      $scope.context = $scope.canvas.getContext('2d');


    navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
      // var video = document.querySelector('video');
      // var canvas = document.getElementById('canvasVid');
      // var context = canvas.getContext('2d');

      SaveFactory.video = document.querySelector('video');
      SaveFactory.canvas = document.getElementById('canvasVid');
      SaveFactory.context = SaveFactory.canvas.getContext('2d');
      // console.log("$scope.context is ");
      // console.dir($scope.video);


      $scope.video.src = window.URL.createObjectURL(localMediaStream);


      //instantiate the constructor which passes the target we want to detect
      $scope.tracker = new tracking.ObjectTracker("face");
      // console.dir(tracker);
      $scope.tracker.setInitialScale(4);
      $scope.tracker.setStepSize(2);
      $scope.tracker.setEdgesDensity(0.1);

      SaveFactory.videoReady = true;

      video.addEventListener('play', function() {
        // Every 33 milliseconds copy the video image to the canvas
        setInterval(function() {
            SaveFactory.context.drawImage(video, 0, 0, 320, 240);
        }, 33);
      }, false);
    }, errorCallback);


      //read the canvas pixels with our tracker, let the camera run
      tracking.track('#video', $scope.tracker, { camera: true });


      //listen for track events
      $scope.tracker.on('track', function(event)
      {
        console.dir(event);
        //clears the tracking rectangle after each event
        $scope.context.clearRect(0, 0, canvas.width, canvas.height);


        //foreach rectnagle event (times that the rect finds a face)
        event.data.forEach(function(rect) {
          // console.dir(context);
          //we're passing in video and giving the coordinates of where we want to draw on the canvas
          $scope.context.drawImage(video, rect.x, rect.y, canvas.width, canvas.height, rect.x, rect.y, rect.width, rect.height);
        });
        // $scope.$apply();
      });

      // video.addEventListener('play', function()
      // {
      //   // Every 33 milliseconds copy the video image to the canvas
      //   setInterval(function()
      //   {
      //       context.drawImage(video, 0, 0, 320, 240);
      //   }, 33);
      // }, false);

  }); // end document ready


    }, errorCallback);


  }); // end document ready

//   window.onload = function()
//   {
//
//
//
//
//
// };

}); // end controller
