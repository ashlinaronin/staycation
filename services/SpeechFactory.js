/* This factory manages the connection between items and bg
** and the WebSpeechCtrl. The WebSpeechCtrl manages user voice
** input and adds items or changes the bg through the Speech Factory.
*/

stayCation.factory('SpeechFactory', function SpeechFactory() {
  var factory = {};

  factory.bg = null;
  factory.items = [];

  factory.changeBg = function(query) {
    factory.bg = query;
  }


  factory.addItem = function(query) {
    factory.items.push(
      {
        name: query,
        url: null,
        xPosition: 0,
        yPosition: 0,
        width: 100,
        height: 100
      }
    );
  };

  factory.removeItem = function(item) {
    var indexToRemove = factory.items.indexOf(item);

    // If we've found this item, remove it from factory.items.
    if (index > -1) {
      factory.items.splice(indexToRemove, 1);
    }
  };

  return factory;

});
