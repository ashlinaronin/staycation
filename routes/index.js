var express = require('express');

var cors = require('cors');
var fs = require('fs');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;

var router = express.Router();

// Set up file and download paths for test
var file_url = 'http://www.contactmusic.com/pics/sn/20140531/backstreet_boys_at_chateau_310514_01/backstreet-boys-backstreet-boys-at-chateau_4225143.jpg';
var DOWNLOAD_DIR = './downloads/';



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
  // Make a new directory for dl if it doesn't already exist
  var mkdir = 'mkdir -p ' + DOWNLOAD_DIR;
  var child = exec(mkdir, function(err, stdout, stderr) {
    if (err) throw err;
    else download_file_httpget(file_url);
  });

  var file_name = url.parse(file_url).pathname.split('/').pop();

  console.log('serving: ' + DOWNLOAD_DIR + file_name);

  var thing = res.sendFile(DOWNLOAD_DIR + file_name);
});

/* GET /get-image/:type/:query
** Take a query and a type (bg or item) and grab the image from google.
** Return it as an image file with proper CORS headers to avoid canvas issues. */
router.get('/get-image/:type/:query', function(request, response, next) {

  response.render('download-test', {
    title: 'dl test',
    type: request.params.type,
    query: request.params.query
  });
});

module.exports = router;
