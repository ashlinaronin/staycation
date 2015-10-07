stayCation.factory('WebcamFactory', function WebcamFactory() {

  var errorCallback = function(e) {
    console.log('Reeeejected!', e);
  };

  navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
    var video = document.querySelector('video');
    video.src = window.URL.createObjectURL(localMediaStream);

    video.onloadedmetadata = function(e) {
    };
  }, errorCallback);

  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  context.drawImage(video, canvas.x, canvas.y, canvas.width, canvas.height);
  
});
