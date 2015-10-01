$(document).ready(function () {
    $('#staycationfacebook').click(function (e) {
        alert('hello9');
        e.preventDefault();
        FB.ui(
            {
                method: 'feed',
                name: 'DebugmodeEventPlans',
                link: 'http://localhost:8000',
                picture: 'http://globe-views.com/dcim/dreams/photo/photo-06.jpg',
                caption: 'testing post',
                description: 'is it working?',
                message: ''
            });
    });
});

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1462842274024569',
    xfbml      : true,
    version    : 'v2.4'
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
