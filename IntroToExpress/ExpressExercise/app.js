var express = require("express");
var app = express();

// Define routes
app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
    var animalSounds = {
        pig: "'Oink'",
        cow: "'Moo'",
        dog: "'Woof Woof!'"
    }
    
    var animal = req.params.animal.toLowerCase();
    res.send("The " + animal + " says " + animalSounds[animal]);

    
});

app.get("/repeat/:text/:times", function(req, res) {
    var word = req.params.text;
    var times = req.params.times;
    var text = "";
    
    for(var i = 0; i < times; i++) {
        text += word + " ";
    }
    
    res.send(text);
    
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found...What are you doing with your life?");
});

// Listen for requests
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});