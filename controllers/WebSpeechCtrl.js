stayCation.controller('WebSpeechCtrl', function WebSpeechCtrl($scope) {
// thanks to giftawk and google web speech api demo

  $scope.message = null;
  $scope.interim = null;
  $scope.chunks = [];
  $scope.final = null;
  $scope.recognizing = false;

  // Not using this right now-- for testing which handler we're in
  $scope.handler = null;

  $scope.splitChunks = function(transcript) {
    $scope.chunks = transcript.split(/\s/);
    $scope.sentenceLength = $scope.chunks.length;
  }



  if ('webkitSpeechRecognition' in window) {
    var recognition = new webkitSpeechRecognition();

    // We want to see the interim results
    recognition.interimResults = true;

    // Continue speech recognition even if user pauses
    recognition.continuous = true;

    // Do these things when speech recognition is enabled
    recognition.onstart = function() {

      $('#talk-now').html('Talk now pls');
      $scope.recognizing = true;

      // Every custom event handler needs to apply its scope
      $scope.$apply();
    };

    // Do these things when the user has finished talking
    recognition.onresult = function (event) {
      var sentence = event.results[0][0].transcript;
      var final = event.results[0].isFinal;

      // Display interim results
      if (!final) {
        $scope.interim = sentence;
        $scope.$apply();
      } else {
        $scope.splitChunks(sentence);
        $scope.final = sentence;

        // We've got a final result, clear the interim results.
        $scope.interim = null;

        // We're done, stop the voice recognition.
        // if ($scope.recognizing) {
        //   recognition.stop();
        // }

        // Every custom handler needs to apply its scope
        $scope.$apply();
      }
    };

    recognition.onerror = function(event) {
      console.log("i'm on error");
      if (event.error === "not-allowed") {
        $scope.message = "I'm sorry, what was that?";
      } else {
        $scope.message = "I'm sorry!! Something went wrong.";
      }

      // Every custom event handler needs to apply its scope
      $scope.$apply();
    };

    recognition.onend = function() {
      $scope.recognizing = false;

      // do more in here?

      // Every custom event handler needs to apply its scope
      $scope.$apply();
    };

    // Start recognition after defining event handlers
    recognition.start();

  } else {

    // webkitSpeechRecognition not found
    $scope.message = "Please use the latest version of Google Chrome.";
    window.setTimeout(function() {}, 1000);
  };

}); // end controller
