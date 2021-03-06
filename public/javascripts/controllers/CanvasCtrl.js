stayCation.controller('CanvasCtrl', function CanvasCtrl($scope, ImageFactory, SaveFactory) {
  // Connect this CanvasCtrl to the ImageFactory
  $scope.items = ImageFactory.items;
  $scope.bg = ImageFactory.bg;
  $scope.ImageFactory = ImageFactory;
  $scope.tracker = null;
  $scope.tracking = null;

  $scope.backgroundImg = null;
  $scope.lastRect = null;

  // check if a context is tainted
  $scope.isTainted = function(ctx) {
    try {
        var pixel = ctx.getImageData(0, 0, 1, 1);
        return false;
    } catch(err) {
        return (err.code === 18);
    }
  }


  angular.element(document).ready(function()
  {
    SaveFactory.video = document.querySelector('video');
    SaveFactory.canvas = document.getElementById('canvasVid');
    SaveFactory.context = SaveFactory.canvas.getContext('2d');


    //instantiate the constructor which passes the target we want to detect
    $scope.tracker = new tracking.ObjectTracker('face');
    $scope.tracker.setInitialScale(4);
    $scope.tracker.setStepSize(1.6);
    $scope.tracker.setEdgesDensity(0.1);

    var errorCallback = function(error) {
      console.log(error);
    }


    var canvState = new CanvasState(document.getElementById('canvasVid'));
    var canvState = new CanvasState(SaveFactory.canvas);

      //read the canvas pixels with our tracker, let the camera run
    tracking.track('#video', $scope.tracker, { camera: true });


    // Add initial items
    var numItems = $scope.items.length;
    for (var i = 0; i < $scope.items.length; i++) {
      canvState.addShape(new Shape(($scope.items[i].name), randomX(), randomY(), 60, 60, ($scope.items[i].url)));
    }

    // Set up the background image
    // will not change to update background here, will need to move it inside a loop
    // somewhere and check for new bg
    $scope.backgroundImg = new Image();
    $scope.backgroundImg.src = $scope.bg;


    //listen for track events
    $scope.tracker.on('track', function(event)
    {
      // for now, update the background image every frame
      // eventually we want to check if it's changed in angular somehow
      $scope.backgroundImg.src = ImageFactory.bg;

      // then draw the background before anything else
      SaveFactory.context.drawImage($scope.backgroundImg, 0, 0);

      if ($scope.lastRect) {
        SaveFactory.context.drawImage(SaveFactory.video, $scope.lastRect.x, $scope.lastRect.y, SaveFactory.canvas.width, SaveFactory.canvas.height, $scope.lastRect.x, $scope.lastRect.y, $scope.lastRect.width, $scope.lastRect.height);
      }


      // video rects are 2nd thing drawn
      //foreach rectnagle event (times that the rect finds a face) draw the video at that spot
      event.data.forEach(function(rect)
      {
        //we're passing in video and giving the coordinates of where we want to draw on the canvas
        SaveFactory.context.drawImage(SaveFactory.video, rect.x, rect.y, SaveFactory.canvas.width, SaveFactory.canvas.height, rect.x, rect.y, rect.width, rect.height);
        $scope.lastRect = rect;
      });


      // Check for new items and add them to the canvas state here before all items are drawn
      // There may be a more efficient way to do this
      // Right now we check for new items every time the frame is drawn
      if ($scope.items.length > numItems) {
        for (var i = numItems; i < $scope.items.length; i++) {
          canvState.addShape(new Shape(($scope.items[i].name), randomX(), randomY(), 60, 60, ($scope.items[i].url)));
          console.log("tainted? " + $scope.isTainted());
        }

        // Make sure to update the number of items!
        numItems = $scope.items.length;
      }

      // Draw background and all items
      // Right now the background is on top of the video, need to figure out which
      // loop to put it in
      canvState.draw();


      // after every drawingness, is it clean?
      // console.dir(SaveFactory.context);

      //clears the tracking rectangle after each event
      //i.e. we don't save rectangles
      // SaveFactory.context.clearRect(0, 0, SaveFactory.canvas.width, SaveFactory.canvas.height);


    }); // end on track

  }); // end document ready

}); // end controller
