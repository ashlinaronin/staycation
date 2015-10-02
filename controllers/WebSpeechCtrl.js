stayCation.controller('WebSpeechCtrl', function WebSpeechCtrl($scope, ImageFactory) {
// thanks to giftawk and google web speech api demo

  // Connect this WebSpeechCtrl to the ImageFactory
  $scope.items = ImageFactory.items;
  $scope.bg = ImageFactory.bg;
  $scope.ImageFactory = ImageFactory;


  $scope.message = null;
  $scope.interim = null;
  $scope.chunks = [];
  $scope.final = null;
  $scope.recognizing = false;


  $scope.splitChunks = function(transcript) {
    $scope.chunks = transcript.split(/\s/);
    $scope.sentenceLength = $scope.chunks.length;
  }

  $scope.sendQuery = function(chunks) {
    if (chunks[0] == "go" && chunks[1] == "to") {
      console.log('sending to bg');
      $scope.ImageFactory.add(chunks.slice(2), 'bg');
    } else if (chunks) {
      console.log('sending to item');
      $scope.ImageFactory.add($scope.final, 'item');
    }
  }



  if ('webkitSpeechRecognition' in window) {
    var recognition = new webkitSpeechRecognition();

    // We want to see the interim results
    recognition.interimResults = true;

    // Continue speech recognition even if user pauses
    // recognition.continuous = true;

    // Using American English for now
    recognition.lang = 'en-US';

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

        // Get urls for this bg or item
        $scope.sendQuery($scope.chunks);
        console.log("$scope.chunks is " + $scope.chunks);


        // We've got a final result, clear the interim results.
        // $scope.interim = null;

        // We're done, stop the voice recognition.
        if ($scope.recognizing) {
          recognition.stop();
        }

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
