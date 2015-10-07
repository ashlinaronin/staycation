stayCation.controller('CanvasCtrl', function CanvasCtrl($scope, ImageFactory, SaveFactory) {
  // Connect this CanvasCtrl to the ImageFactory
  $scope.items = ImageFactory.items;
  $scope.bg = ImageFactory.bg;
  $scope.ImageFactory = ImageFactory;


  // Connect this CanvasCtrl to the SaveFactory
  // $scope.SaveFactory = SaveFactory;
  // $scope.video = SaveFactory.video;
  // $scope.canvas = SaveFactory.canvas;
  // $scope.context = SaveFactory.context;
  // $scope.videoReady = SaveFactory.videoReady;


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
      // console.dir($scope.video);

      video.src = window.URL.createObjectURL(localMediaStream);

      SaveFactory.videoReady = true;

      video.addEventListener('play', function() {
        // Every 33 milliseconds copy the video image to the canvas
        setInterval(function() {
            SaveFactory.context.drawImage(video, 0, 0, 320, 240);
        }, 33);
      }, false);
    }, errorCallback);

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1462842274024569',
        xfbml      : true,
        version    : 'v2.4'
      });
    };

    $(document).ready(function () {
      $('#shareonfacebook').click(function (e) {
          e.preventDefault();
          FB.ui(
            {
               method: 'feed',
               name: 'My Staycation',
               picture: 'http://slummysinglemummy.com/wp-content/uploads/2015/01/awesomely-cute-kitten-1500.jpg',
               description: 'it is working!',
            });
        });
    });

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));






  }); // end document ready



}); // end controller
