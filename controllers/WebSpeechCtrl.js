stayCation.controller('WebSpeechCtrl', function WebSpeechCtrl($scope) {
// thanks to giftawk and google web speech api demo

  $scope.results = "";
  $scope.transcript = "";
  $scope.message = "";
  $scope.interim = "";
  $scope.chunks = [];
  $scope.sentenceLength = 0;

  $scope.displayTranscript = function (transcript) {
    $scope.transcript = transcript;
  };

  $scope.renderInterimResults = function(sentence) {
    $scope.interim = sentence;
  }

  $scope.msgToPage = function(msg) {
    $scope.message = msg;
  }

  $scope.renderPage = function() {
    $scope.interim = "";
  }

  $scope.splitChunks = function(transcript) {
    $scope.chunks = transcript.split(/\s/);
    $scope.sentenceLength = words.length;
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
        ga('send', 'event', 'userAction', 'gaveMicAccess');
      };

      // Do these things when the user has finished talking
      recognition.onresult = function (event) {
        console.log("i'm on result");

        var sentence = event.results[0][0].transcript;
        var final = event.results[0].isFinal;

        if (!final) {
          renderInterimResults(sentence);
          ga('send', 'event', 'userAction', 'StartedTalking');
        } else {
          splitChunks(sentence);
          ga('send', 'event', 'result', sentence);
          ga('send', 'event', 'userAction', 'finishedTalking');
        }
      };

      recognition.onerror = function(event) {
        console.log("i'm on error");
        if (event.error === "not-allowed") {
          msgToPage("I'm sorry, what was that?");
          ga('send', 'event', 'userAction', 'deniedAccess');
        } else {
          msgToPage("I'm sorry!! Something went wrong.");
          ga('send', 'event', 'userAction', 'error');
          Rollbar.error('Recognition_Error', event);
        }
      };

      // Start recognition after defining event handlers
      recognition.start();

    } else {
      console.log("no speech recognition");

      // webkitSpeechRecognition not found
      msgToPage("Please use the latest version of Google Chrome.");
      window.setTimeout(function() {
        ga('send', 'event', 'userAction', 'unsupported_browser');
      }, 1000);
    };

  }); // end document ready



}); // end controller
