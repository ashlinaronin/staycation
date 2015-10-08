stayCation.controller('FooterCtrl', function FooterCtrl($scope, SaveFactory) {
  // Connect this CanvasCtrl to the SaveFactory
  $scope.SaveFactory = SaveFactory;
  $scope.video = SaveFactory.video;
  $scope.canvas = SaveFactory.canvas;
  $scope.context = SaveFactory.context;
  $scope.videoReady = SaveFactory.videoReady;

  // console.log("$scope.context in FooterCtrl is:");
  // console.log($scope.context);

  console.log(SaveFactory.videoReady);

  // Facebook
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
               description: 'My staycation',
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




}); // end controller
