var stayCation = angular.module('stayCation', ['ui.router', 'satellizer']);

stayCation.config(function($stateProvider, $urlRouterProvider) {

  //Path for homepage
  $stateProvider.state('home', {
    url:"",
    templateUrl:"partials/home.html"
  });
});

stayCation.config(function($authProvider) {

    $authProvider.facebook({
      clientId: '1462842274024569'
    });

    $authProvider.httpInterceptor = true;
    $authProvider.withCredentials = true;
    $authProvider.tokenRoot = null;
    $authProvider.cordova = false;
    $authProvider.baseUrl = '/';
    $authProvider.loginUrl = '/auth/login';
    $authProvider.signupUrl = '/auth/signup';
    $authProvider.unlinkUrl = '/auth/unlink/';
    $authProvider.tokenName = 'token';
    $authProvider.tokenPrefix = 'satellizer';
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = 'Bearer';
    $authProvider.storageType = 'localStorage';

    $authProvider.facebook({
      url: '/auth/facebook',
      authorizationEndpoint: 'https://www.facebook.com/v2.3/dialog/oauth',
      redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + '/',
      requiredUrlParams: ['display', 'scope'],
      scope: ['email'],
      scopeDelimiter: ',',
      display: 'popup',
      type: '2.0',
      popupOptions: { width: 580, height: 400 }
    });

});


// var ngFacebook = angular.module('stayCation', ['ngFacebook'])
//
//   .config( function( $facebookProvider ) {
//     $facebookProvider.setAppId('1462842274024569');
//   })
//
//   .run( function( $rootScope ) {
//     js.src = "//connect.facebook.net/en_US/sdk.js";n    : 'v2.4'
//   });
//
//
//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "//connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));
//   })
