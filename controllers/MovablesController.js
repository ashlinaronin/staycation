stayCation.controller('MovablesCtrl', function MovablesCtrl($scope, $stateParams) {

    var canvas = document.getElementById("test-canvas");
    var context = canvas.getContext('2d');
    var backgroundImg = new Image();
    backgroundImg.onload = function() {
      context.drawImage(backgroundImg, 10, 10);
    };

    backgroundImg.src = "https://cdn2.iconfinder.com/data/icons/bright-food-products/512/lobster-128.png";


})
