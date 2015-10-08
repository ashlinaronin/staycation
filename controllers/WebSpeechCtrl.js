// should add a button for stopping speech recognition...
// but it's difficult to figure out how to access the scope of the
// webkitSpeechRecognition if statement from the controller on the client.


stayCation.controller('WebSpeechCtrl', function WebSpeechCtrl($scope, ImageFactory) {
// thanks to giftawk and google web speech api demo

  // Connect this WebSpeechCtrl to the ImageFactory
  $scope.items = ImageFactory.items;
  $scope.bg = ImageFactory.bg;
  $scope.ImageFactory = ImageFactory;

  // These vars are mostly for debugging porpoises
  $scope.message = null;
  $scope.interim = null;
  $scope.chunks = [];
  $scope.final = null;

  $scope.heardSentences = [];

  $scope.recognizing = false;


  $scope.sendQuery = function(sentence) {
    // Chunk em so we can check for bg/item
    $scope.chunks = sentence.split(/\s/);

    // Keep track of whether or not we've found a background dictation ('go to...')
    var foundBg = false;

    // Loop through chunks and check for first instance of 'go to'
    for (var i = 0; i < $scope.chunks.length; i++) {
      if ($scope.chunks[i] == 'go' && $scope.chunks[i+1] == 'to') {

        // add a space between words
        var destination = $scope.chunks.slice(i+2).join(' ');
        console.log('going to: ' + destination);
        $scope.ImageFactory.add(destination, 'bg');

        // We've found a bg, exit for loop here.
        // No need to keep looking through the rest of the dictation.
        foundBg = true;
        break;
      }
    }

    // if we didnt find a bg but we have chunks, add item here
    if (!foundBg && $scope.chunks) {
     console.log("adding item: " + $scope.final);
     $scope.ImageFactory.add($scope.final, 'item');
   } else {
    $scope.message = 'Empty query!';
   }
  }



  if ('webkitSpeechRecognition' in window) {
    var recognition = new webkitSpeechRecognition();

    // We want to see the interim results
    recognition.interimResults = true;

    // Continue speech recognition even if user pauses
    recognition.continuous = true;

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
      // Get index of this sentence relative to all the sentence events
      // recorded while the user has been on this page
      var sentenceIndex = event.resultIndex;

      // Get sentence from transcript of the most current interim results
      var sentence = event.results[sentenceIndex][0].transcript;

      // Display interim results
      if (!event.results[sentenceIndex].isFinal) {
        $scope.interim = sentence;
        $scope.$apply();
      } else {
        $scope.final = sentence;
        $scope.heardSentences.push(sentence);

        // Get urls for this bg or item
        $scope.sendQuery(sentence);

        // We've got a final result, clear the interim results.
        $scope.interim = null;
        $scope.final = null;

        // Repeat what i just said
        var u = new SpeechSynthesisUtterance();
        u.text = sentence;
        u.lang = 'en-US';
        u.rate = 1.0;
        speechSynthesis.speak(u);

        // We're done, stop the voice recognition.
        // (Now we don't want to stop because it's continuous)
        // we could stop if user presses a button maybe
        // if ($scope.recognizing) {
        //   recognition.stop();
        // }

        // Every custom handler needs to apply its scope
        $scope.$apply();
      }
    };

    recognition.onerror = function(event) {
      if (event.error === "not-allowed") {
        $scope.message = "I'm sorry, what was that?";
        console.log("error not allowed");
      } else {
        $scope.message = "I'm sorry!! Something went wrong.";
        console.log("other error");
      }

      // Every custom event handler needs to apply its scope
      $scope.$apply();
    };

    recognition.onend = function() {
      $scope.recognizing = false;
      console.log("recognition ended");

      // do more in here?
      // here's a hack to re-start recognition after the preset time limit
      recognition.start();

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
