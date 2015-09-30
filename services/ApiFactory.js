stayCation.factory('ApiFactory', function ApiFactory() {
  var factory = {};

  // load the latest SKD file
  js.src = "//connect.facebook.net/en_US/sdk.js";

  // Initialize facebook API
  $window.fbAsyncInit = function() {
    FB.init({
      appId: 'e86a706dcf6cb19',
      status: true,
      cookie: true,
      xfbml: true,
      version: 'v2.4'
    });
  };
});
