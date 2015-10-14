var express = require('express');
var fs = require('fs');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
var request = require('request');

var router = express.Router();
router.use(express.static('public'));

// Set up file and download paths for test
var file_url = 'http://www.contactmusic.com/pics/sn/20140531/backstreet_boys_at_chateau_310514_01/backstreet-boys-backstreet-boys-at-chateau_4225143.jpg';
var DOWNLOAD_DIR = './public/downloads/';

// Set up GET request to Google Custom Search API
var customsearch = 'https://www.googleapis.com/customsearch/v1?key=';
var apiKey = 'AIzaSyDB5cOgPfH_VSA7yRcHiF3MGba4Wx_2a7c';
var cx = '014144397479220879650:sd7rzvq2hog';
var fields = 'items(link,snippet)';

// look for all types of images for now
var imgType = 'clipart';
var numResults = 1;
var imageSize;


// Helper function to download file using HTTP.get
var download_file_httpget = function(file_url) {
  var options = {
    host: url.parse(file_url).host,
    port: 80,
    path: url.parse(file_url).pathname
  };

  // Tried appending the current milliseconds to the filename to avoid overwriting dupes
  // e.g. a lot of clipart is just photo.jpg
  // add it to the beginning of the name bc it involves less string parsing
  // turns out it's pretty complicated to get that new filename back to the response
  // I'm sure it's possible but not tonight
  // involves using callbacks to an extent i'm not yet comfortable with
  // var safeMillis = new Date().getMilliseconds();
  var file_name = url.parse(file_url).pathname.split('/').pop();
  var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);

  http.get(options, function(response) {
    response.on('data', function(data) {
      file.write(data);
    }).on('end', function() {
      file.end();
    });
  });
};

// Wrapper download file function. This one calls the httpget function to Actually
// download the file.
var download_file = function(file_url) {
  // Make a new directory for dl if it doesn't already exist
  var mkdir = 'mkdir -p ' + DOWNLOAD_DIR;
  var child = exec(mkdir, function(err, stdout, stderr) {
    if (err) {
      throw err;
    } else {
      download_file_httpget(file_url);
    }
  });
  // // Split off filename here so we can return it
  var file_name = url.parse(file_url).pathname.split('/').pop();
  return file_name;
};


// Make sure resources served from Express are available via CORS
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET /get-image/:type/:query
** Take a query and a type (bg or item) and grab the image from google.
** Save the image as a file and return the local path to it so we can
** serve it later as an image file with proper CORS headers to avoid canvas issues. */
router.get('/get-image/:type/:query', function(req, res, next) {
    var returnedUrl = null;

    // Set image size of query depending whether we are looking for item or bg
    if (req.params.type == 'item') {
      imageSize = 'small';
    } else if (req.params.type == 'bg') {
      imageSize = 'large';
    }

    // Set up Google Custom Search API GET request
    var getReqUrl = customsearch + apiKey + '&cx=' + cx + '&q=' + req.params.query +
      '&num=' + numResults + '&fields=' + fields +
      '&searchType=image&fileType=jpg&imgSize=' + imageSize + '&alt=json' +
      '&imgType=' + imgType;


    // Run the GET request to Google Custom Search API,
    // save the resulting image to downloads and return its filepath as json
    // so we can serve it up later.
    request(getReqUrl, function (googError, googResponse, googBody) {
      if (!googError && googResponse.statusCode == 200 && googBody.items) {
        returnedUrl = JSON.parse(googBody).items[0].link;

        // Actually download the file and return the local path
        // var queryName = req.params.query;
        var filename = download_file(returnedUrl);

        // Send path as a JSON object with one key/value pair
        res.json({ localUrl: 'downloads/' + filename});
      } else {
        console.log(googError);
        res.json({error: googError});
      }
    });
});








/* Serve this url back with Access-Control-Allow-Origin: * header
** Cool but not exactly what we need because canvas won't be able to access
** clean image files from here */
router.get('/image-pipe-test/:fileUrl', function(req, res, next) {
  request
    .get(req.params.fileUrl)
    .on('response', function(response) {
      console.log(response.statusCode);
      console.dir(response.headers);
    })
    .on('error', function(error) {
      console.log(error);
    })
    .pipe(res)
});

module.exports = router;
