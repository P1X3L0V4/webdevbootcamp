var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// Settings
app.set("view engine", "ejs");

// Variables
var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

// Routes
app.get("/", function(req, res){
    res.render("home");
});

app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});
});

app.post("/addfriend", function(req, res){
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

// Listeners
app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server started!");
});