stayCation.factory('UrlsFactory', function UrlsFactory(){
  var factory = {};
  var propUrl = "";
  // var backgroundUrl = "";
  factory.getPropUrl = function(){
    factory.propUrl = propUrl;
  }
  return propUrl;
})
