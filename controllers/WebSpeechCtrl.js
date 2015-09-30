stayCation.controller('WebSpeechCtrl', function WebSpeechCtrl($scope) {
// thanks to giftawk and google web speech api demo

  $scope.results = "";
  $scope.transcript = "";
  $scope.message = "";
  $scope.interim = "";
  $scope.chunks = [];
  $scope.sentenceLength = 0;
  $scope.final = "";
  $scope.recognizing = false;

  $scope.splitChunks = function(transcript) {
    $scope.chunks = transcript.split(/\s/);
    $scope.sentenceLength = $scope.chunks.length;
  }




// do stuff here when this partial loads
  angular.element(document).ready(function () {

    if ('webkitSpeechRecognition' in window) {
      var recognition = new webkitSpeechRecognition();
      recognition.interimResults = true;


      // Do these things when speech recognition is enabled
      recognition.onstart = function() {
        console.log("i'm on start");
        $('#talk-now').html('Talk now pls');
        $scope.recognizing = true;
      };

      // Do these things when the user has finished talking
      recognition.onresult = function (event) {
        console.log("i'm on result");

        var sentence = event.results[0][0].transcript;
        var final = event.results[0].isFinal;

        // Display interim results
        if (!final) {
          $scope.interim = sentence;
          console.log(sentence);
        } else {
          $scope.splitChunks(sentence);
          $scope.final = sentence;
          console.log("final is " + sentence);

          // done, stop
          if ($scope.recognizing) {
            recognition.stop();
            console.log("i stopped");
          }
        }
      };

      recognition.onerror = function(event) {
        console.log("i'm on error");
        if (event.error === "not-allowed") {
          $scope.message = "I'm sorry, what was that?";
        } else {
          $scope.message = "I'm sorry!! Something went wrong.";
        }
      };

      recognition.onend = function() {
        $scope.recognizing = false;
        // do more in here
      };

      // Start recognition after defining event handlers
      recognition.start();

    } else {
      console.log("no speech recognition");

      // webkitSpeechRecognition not found
      $scope.message = "Please use the latest version of Google Chrome.";
      window.setTimeout(function() {}, 1000);
    };

  }); // end document ready



}); // end controller
