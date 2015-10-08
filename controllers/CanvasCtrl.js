stayCation.controller('CanvasCtrl', function CanvasCtrl($scope, ImageFactory, SaveFactory) {
  // Connect this CanvasCtrl to the ImageFactory
  $scope.items = ImageFactory.items;
  $scope.bg = ImageFactory.bg;
  $scope.ImageFactory = ImageFactory;

  $scope.tracker = null;
  $scope.tracking = null;

  angular.element(document).ready(function() {

      SaveFactory.video = document.querySelector('video');
      SaveFactory.canvas = document.getElementById('canvasVid');
      SaveFactory.context = SaveFactory.canvas.getContext('2d');

      //instantiate the constructor which passes the target we want to detect
        $scope.tracker = new tracking.ObjectTracker('face');
        $scope.tracker.setInitialScale(4);
        $scope.tracker.setStepSize(2);
        $scope.tracker.setEdgesDensity(0.1);


        //read the canvas pixels with our tracker, let the camera run
        tracking.track('#video', $scope.tracker, { camera: true });

        //listen for track events
        $scope.tracker.on('track', function(event)
        {
          //clears the tracking rectangle after each event
          //i.e. we don't save rectangles
          SaveFactory.context.clearRect(0, 0, SaveFactory.canvas.width, SaveFactory.canvas.height);

          //foreach rectnagle event (times that the rect finds a face)
          event.data.forEach(function(rect)
          {

            //we're passing in video and giving the coordinates of where we want to draw on the canvas
            SaveFactory.context.drawImage(SaveFactory.video, rect.x, rect.y, SaveFactory.canvas.width, SaveFactory.canvas.height, rect.x, rect.y, rect.width, rect.height);

          });

        });

  }); // end document ready

}); // end controller
