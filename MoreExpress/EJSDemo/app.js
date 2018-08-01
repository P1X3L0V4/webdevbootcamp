var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
app.get("/", function(req, res){
    res.render("home");
});

app.get("/fallinlovewith/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res){
    var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "Post 2", author: "Tom"},
        {title: "Post 3", author: "John"}
    ];
    res.render("posts", {posts: posts});
});

// Listeners
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening!");
});