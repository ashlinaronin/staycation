/* This factory manages the connection between items and bg
** and the WebSpeechCtrl. The WebSpeechCtrl manages user voice
** input and adds items or changes the bg through the ImageFactory.
*/

stayCation.factory('ImageFactory', function ImageFactory($http) {
  var factory = {};

  factory.bg = null;
  factory.items = [];

  // Preload some dummy items for now
  // factory.items = [
  //   {
  //     name: 'bubble',
  //     xPosition: 0,
  //     yPosition: 0,
  //     width: 60,
  //     height: 60,
  //     url: 'http://www.i2clipart.com/cliparts/9/2/6/b/clipart-bubble-926b.png'
  //   },
  //   {
  //     name: 'lei',
  //     xPosition: 0,
  //     yPosition: 0,
  //     width: 60,
  //     height: 60,
  //     url: 'http://cfwc21.com/images/Decorations/Lei_Transparent_Flip.gif'
  //   },
  //   {
  //     name: 'surfboard',
  //     xPosition: 0,
  //     yPosition: 0,
  //     width: 60,
  //     height: 60,
  //     url: 'http://icons.iconarchive.com/icons/fasticon/surf/128/surfboard-2-icon.png'
  //   },
  //
  // ];



  factory.removeItem = function(item) {
    var indexToRemove = factory.items.indexOf(item);

    // If we've found this item, remove it from factory.items.
    if (index > -1) {
      factory.items.splice(indexToRemove, 1);
    }
  };

  factory.add = function(query, type) {
    // Set up GET request to Google Custom Search API
    var customsearch = 'https://www.googleapis.com/customsearch/v1?key=';
    var apiKey = 'AIzaSyDB5cOgPfH_VSA7yRcHiF3MGba4Wx_2a7c';
    var cx = '014144397479220879650:sd7rzvq2hog';
    var fields = 'items(link,snippet)';

    // look for all types of images for now
    // var imageType = 'clipart';
    var numResults = 1;
    var imageSize;

    // Set image size of query depending whether we are looking for item or bg
    if (type == 'item') {
      imageSize = 'small';
    } else if (type == 'bg') {
      imageSize = 'large';
    }

    var getReq = customsearch + apiKey + '&cx=' + cx + '&q=' + query +
      '&num=' + numResults + '&fields=' + fields +
      '&searchType=image&fileType=jpg&imgSize=' + imageSize + '&alt=json';

    var returnedUrl = null;

    // Run the API GET request and save the url
    $http.get(getReq).then(function successCallback (response) {
      returnedUrl = response.data.items[0].link;

      if (type == 'item') {
        factory.items.push( { name: query, url: returnedUrl } );
      } else if (type == 'bg') {
        factory.bg = returnedUrl;
      }
    }, function errorCallback (response) {
      alert("Error getting Google images -- " +
        response.data.error.code + ': ' +
        response.data.error.errors[0].message);

    });
  }

  return factory;

});
