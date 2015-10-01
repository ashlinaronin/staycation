/* This factory manages the connection between items and bg
** and the WebSpeechCtrl. The WebSpeechCtrl manages user voice
** input and adds items or changes the bg through the ImageFactory.
*/

stayCation.factory('ImageFactory', function ImageFactory() {
  var factory = {};

  factory.bg = "http://guardianlv.com/wp-content/uploads/2014/02/indonesia-volcano-culture-1-650x433.jpg";
  // factory.items = [];

  // Preload some dummy items for now
  factory.items = [
    {
      name: 'bubble',
      xPosition: 0,
      yPosition: 0,
      width: 60,
      height: 60,
      url: 'http://www.i2clipart.com/cliparts/9/2/6/b/clipart-bubble-926b.png'
    },
    {
      name: 'lei',
      xPosition: 0,
      yPosition: 0,
      width: 60,
      height: 60,
      url: 'http://cfwc21.com/images/Decorations/Lei_Transparent_Flip.gif'
    },
    {
      name: 'surfboard',
      xPosition: 0,
      yPosition: 0,
      width: 60,
      height: 60,
      url: 'http://icons.iconarchive.com/icons/fasticon/surf/128/surfboard-2-icon.png'
    },

  ];


  factory.changeBg = function(query) {
    factory.bg = query;
  }


  factory.addItem = function(query) {
    factory.items.push(
      {
        name: query,
        xPosition: 0,
        yPosition: 0,
        width: 60,
        height: 60,
        url: factory.getUrl(query),
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

  factory.getUrl = function(query) {
    // for now just return a static url
    // eventually we will do google image search query here and get a url
    return "http://www.i2clipart.com/cliparts/9/2/6/b/clipart-bubble-926b.png";
  }


  // do stuff to get image urls here

  return factory;

});
