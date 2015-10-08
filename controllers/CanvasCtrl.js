stayCation.controller('CanvasCtrl', function CanvasCtrl($scope, ImageFactory, SaveFactory) {
  // Connect this CanvasCtrl to the ImageFactory
  $scope.items = ImageFactory.items;
  $scope.bg = ImageFactory.bg;
  $scope.ImageFactory = ImageFactory;


  // $scope.tracker = null;
  // $scope.video = null;
  // $scope.canvas = null;
  // $scope.context = null;

  SaveFactory.tracker = null;
  SaveFactory.video = null;
  SaveFactory.canvas = null;
  SaveFactory.context = null;

  //Movable "prop" images on canvas.


  // Connect this CanvasCtrl to the SaveFactory
  // $scope.SaveFactory = SaveFactory;
  // $scope.video = SaveFactory.video;
  // $scope.canvas = SaveFactory.canvas;
  // $scope.context = SaveFactory.context;
  // $scope.videoReady = SaveFactory.videoReady;










  // //Generate random coordinates for images:
  // function randomX(){
  //   var randX = Math.floor((Math.random() * 220) + 1);
  //   return randX;
  // }
  //
  // function randomY(){
  //   var randY = Math.floor((Math.random() * 160) + 1);
  //   return randY;
  // }

  angular.element(document).ready(function()
  {


    var errorCallback = function(e)
    {

      console.log('Reeeejected!', e);
    };



    navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
      SaveFactory.video = document.querySelector('video');
      SaveFactory.canvas = document.getElementById('canvasVid');
      SaveFactory.context = SaveFactory.canvas.getContext('2d');
      // console.dir(SaveFactory.context);

      SaveFactory.video.src = window.URL.createObjectURL(localMediaStream);

      var canvState = new CanvasState(document.getElementById('canvasVid'));
      var canvState = new CanvasState(SaveFactory.canvas);

      //instantiate the constructor which passes the target we want to detect
      // SaveFactory.tracker = new tracking.ObjectTracker("face");
      // SaveFactory.tracker.setInitialScale(4);
      // SaveFactory.tracker.setStepSize(2);
      // SaveFactory.tracker.setEdgesDensity(0.1);

      SaveFactory.videoReady = true;

      SaveFactory.video.addEventListener('play', function() {
        // Every 33 milliseconds copy the video image to the canvas

        // add initial items
        var numItems = $scope.items.length;
        for (var i = 0; i < $scope.items.length; i++) {
          canvState.addShape(new Shape(($scope.items[i].name), randomX(), randomY(), 60, 60, ($scope.items[i].url)));
        }

        setInterval(function() {

          // maybe draw bg here
          // console.dir(SaveFactory.context);
          var backgroundImg = new Image();
          backgroundImg.src = $scope.bg;

          // Check for new items and add them to the canvas state here before all items are drawn
          // There may be a more efficient way to do this
          // Right now we check for new items every time the frame is drawn
          if ($scope.items.length > numItems) {
            for (var i = numItems; i < $scope.items.length; i++) {
              canvState.addShape(new Shape(($scope.items[i].name), randomX(), randomY(), 60, 60, ($scope.items[i].url)));
            }

            // Make sure to update the number of items!
            numItems = $scope.items.length;
          }

          SaveFactory.context.drawImage(SaveFactory.video, 0, 0, 320, 240);

          //Draw images that have been added here.
          // Disabled clearing in canvas state draw loop because the video is re-writing every time anyway


          canvState.draw();

          // function init() {
          //   init();

          // }

        }, 1000 / 24);
            // loop through shapes from factory here
            console.log(canvState.valid);

      }, false);
    }, errorCallback);
      //read the canvas pixels with our tracker, let the camera run
      // tracking.track('#video', SaveFactory.tracker, { camera: true });


      //listen for track events
      // SaveFactory.tracker.on('track', function(event)
      // {
      //   console.dir(event);
      //   //clears the tracking rectangle after each event
      //   SaveFactory.context.clearRect(0, 0, canvas.width, canvas.height);
      //
      //
      //   //foreach rectnagle event (times that the rect finds a face)
      //   event.data.forEach(function(rect) {
      //     // console.dir(context);
      //     //we're passing in video and giving the coordinates of where we want to draw on the canvas
      //     SaveFactory.context.drawImage(video, rect.x, rect.y, canvas.width, canvas.height, rect.x, rect.y, rect.width, rect.height);
      //   });
      //   // $scope.$apply();
      // });

      // video.addEventListener('play', function()
      // {
      //   // Every 33 milliseconds copy the video image to the canvas
      //   setInterval(function()
      //   {
      //       context.drawImage(video, 0, 0, 320, 240);
      //   }, 33);
      // }, false);

  }); // end document ready



}); // end controller
