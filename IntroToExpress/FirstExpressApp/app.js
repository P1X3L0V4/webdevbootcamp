var express = require("express");
var app = express();

// Define routes
app.get("/", function(req, res) {
    res.send("Hi there!");
});

app.get("/bye", function(req, res) {
    res.send("Goodbye!");
});

app.get("/dog", function(req, res) {
    console.log("Request to /dog");
    res.send("MEOW!");
});

app.get("/topics/:subTopic", function(req, res) {
    var subTopic = req.params.subTopic;
    res.send("THIS IS " + subTopic.toUpper() + " TOPIC");
});

app.get("*", function(req, res) {
    res.send("There is no such page.");
});

// Listen for requests
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});