var dns = require('dns');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/mx/:domain', function(request, response) {

  console.log("domain: " + request.params.domain);

  dns.resolveMx(request.params.domain, function onLookup(err, addresses, family) {
    console.log('mx:', addresses);

    var google_detected = false;

    for(var i = 0; i < addresses.length; i++){
      mx = addresses[i].exchange.toLowerCase();
      if(mx.indexOf("google.com") > -1 || mx.indexOf("googlemail.com") > -1){
        google_detected = true;
      }
    }

    response.json(google_detected);
  });
});

app.listen(app.get('port'), function() {
  console.log('Google Apps Lookup is running on port', app.get('port'));
});


