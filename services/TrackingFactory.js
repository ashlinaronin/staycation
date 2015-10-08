stayCation.factory('TrackingFactory', function TrackingFactory() {
  var factory = {};

  //This should probably be in the controller
  //leaving the code here for reference 
  factory.track = function() {

    //instantiate the constructor which passes the target we want to detect
      var tracker = new tracking.ObjectTracker('face');
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);

      //read the canvas pixels with our tracker, let the camera run
      tracking.track('#video', tracker, { camera: true });

      //listen for track events
      tracker.on('track', function(event) {

        //clears the tracking rectangle after each event
        //i.e. we don't save rectangles
        context.clearRect(0, 0, canvas.width, canvas.height);


        //foreach rectnagle event (times that the rect finds a face)
        event.data.forEach(function(rect) {

          //we're passing in video and giving the coordinates of where we want to draw on the canvas
          context2.drawImage(video, rect.x, rect.y, canvas.width, canvas.height, rect.x, rect.y, rect.width, rect.height);

        });

      });

      //GUI for manipulating tracker parameters
      // var gui = new dat.GUI();
      // gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
      // gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
      // gui.add(tracker, 'stepSize', 1, 5).step(0.1);
  }

  return factory;

});
