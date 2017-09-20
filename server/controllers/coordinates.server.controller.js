var config = require('../config/config'), 
    request = require('request');

module.exports = function(req, res, next) {
  if(req.body.address) {
    var options = {
      key: config.googleMaps.key, 
      address: req.body.address
    }
    request({
      url: 'https://maps.googleapis.com/maps/api/geocode/json', 
      qs: options
      }, function(error, response, body) {
        if(error) {
          res.status(400).send(err);
        } 

        var data = JSON.parse(body);
        req.results = data.results[0].geometry.location;
        /*if (data.results.length > 0)
         {
 +          var coordinates = data.results[0].geometry.location;
 +          req.results = { latitude: coordinates.lat, longitude: coordinates.lng};
 +       }
         else if (data.status == 'REQUEST_DENIED')
         {
 +          var debug_message  =
            [
 +            "You need a Google Geocoding API key for this Assignment",
 +            "Get a key at: https://developers.google.com/maps/documentation/geocoding/get-api-key",
 +            "You'd also need a Google Cloud Platform project, with the 'Google Geocoding API' enabled"
 +          ];
 +          console.log(debug_message.join("\n"));
 +        }
          else
         {
 +          req.results = undefined
 +          console.log(data);
 +       }*/
        next();
    });
  } else {
    next();
  }
};  