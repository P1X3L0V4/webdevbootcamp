var express = require("express");
var app = express();
var request = require('request');
app.set("view engine", "ejs");

// *********
// Routes
// *********
app.get("/", function(req, res){
    res.render("search");
});


app.get("/results", function(req, res){
    var query = req.query.search;
    
    request('http://www.omdbapi.com/?s=' + query + '&apikey=thewdb', function (error, response, body) {
        if(!error && response.statusCode === 200) {
            var movieData = JSON.parse(body); // parse JSON string to object
            res.render("results", {movieData: movieData});
        }
        else {
             // Print the error if one occurred
            console.log('error:', error);
            // Print the response status code
            console.log('statusCode:', response && response.statusCode);
        }
    });
});


// *********
// Listeners
// *********

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie app has strated!");
});