var request = require('request');
request('https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function (error, response, body) {
    if(!error && response.statusCode === 200) {
        var parsedData = JSON.parse(body); // parse JSON string to object 
        console.log(parsedData["query"]["data"]); // get data form object
    }
    else {
         // Print the error if one occurred
        console.log('error:', error);
        // Print the response status code
        console.log('statusCode:', response && response.statusCode);
    }
  
  
});