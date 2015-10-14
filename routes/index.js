var express = require('express');


var fs = require('fs');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
var request = require('request');

// var cors = require('cors');

var router = express.Router();

// router.use(cors());

// Set up file and download paths for test
var file_url = 'http://www.contactmusic.com/pics/sn/20140531/backstreet_boys_at_chateau_310514_01/backstreet-boys-backstreet-boys-at-chateau_4225143.jpg';
var DOWNLOAD_DIR = './downloads/';

// Set up GET request to Google Custom Search API
var customsearch = 'https://www.googleapis.com/customsearch/v1?key=';
var apiKey = 'AIzaSyDB5cOgPfH_VSA7yRcHiF3MGba4Wx_2a7c';
var cx = '014144397479220879650:sd7rzvq2hog';
var fields = 'items(link,snippet)';

// look for all types of images for now
var imgType = 'clipart';
var numResults = 1;
var imageSize;









// Function to download file using HTTP.get
var download_file_httpget = function(file_url) {
  var options = {
    host: url.parse(file_url).host,
    port: 80,
    path: url.parse(file_url).pathname
  };

  var file_name = url.parse(file_url).pathname.split('/').pop();
  var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);

  http.get(options, function(response) {
    response.on('data', function(data) {
      file.write(data);
    }).on('end', function() {
      file.end();
      console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
    });
  });
};



// Make sure resources served from Express are available via CORS
// However, this doesn't solve our original problem of not knowing
// in advance which images will wreck the canvas...
// Disabled because we're trying the CORS library for Node
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.get('/image-dl-test', function(req,res,next) {

  // Serve this url back with Access-Control-Allow-Origin: * header
  request
    .get(file_url)
    .on('response', function(response) {
      console.log(response.statusCode);
      console.dir(response.headers);
    })
    .on('error', function(error) {
      console.log(error);
    })
    .pipe(res)
});

/* GET /get-image/:type/:query
** Take a query and a type (bg or item) and grab the image from google.
** Return it as an image file with proper CORS headers to avoid canvas issues. */
router.get('/get-image/:type/:query', function(request, response, next) {

    // Set image size of query depending whether we are looking for item or bg
    if (request.params.type == 'item') {
      imageSize = 'small';
    } else if (request.params.type == 'bg') {
      imageSize = 'large';
    }

    // Set up get req URL
    var getReq = customsearch + apiKey + '&cx=' + cx + '&q=' + request.params.query +
      '&num=' + numResults + '&fields=' + fields +
      '&searchType=image&fileType=jpg&imgSize=' + imageSize + '&alt=json' +
      '&imgType=' + imgType;

    var returnedUrl = null;

    // http request node-style
    var callback = function(response) {}




    // Run the API GET request and save the url
    $http.get(getReq).then(function successCallback (response) {
      returnedUrl = response.data.items[0].link;
      console.log('returnedUrl: ' + returnedUrl);

      // if (request.params.type == 'item') {
      //   factory.items.push( { name: query, url: returnedUrl } );
      // } else if (request.params.type == 'bg') {
      //   factory.bg = returnedUrl;
      // }
    }, function errorCallback (response) {
      alert("Error getting Google images -- " +
        response.data.error.code + ': ' +
        response.data.error.errors[0].message);
    });

  response.render('download-test', {
    title: 'dl test',
    type: request.params.type,
    query: request.params.query,
    returnedUrl: returnedUrl
  });


});

module.exports = router;
