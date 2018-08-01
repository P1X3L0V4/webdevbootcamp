var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    methodOverride   = require("method-override"),
    expressSanitizer = require("express-sanitizer");

// *********
// Settings
// *********
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer()); // Must include after bodyParser

// MONGOOSE SCHEMA/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now()}
});

var Blog = mongoose.model("Blog", blogSchema);

// **************
// RESTful Routes
// **************

app.get("/", function(req, res){
    res.redirect("/blogs");
});

// INDEX
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err) {
            console.log("ERROR");
        }
        else {
            res.render("index", {blogs: blogs});
        }
    });
});

// NEW
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// CREATE
app.post("/blogs", function(req, res){
    // Sanitize blog.body
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // Create blog post
    Blog.create(req.body.blog, function(err, newBlog) {
        if(err) {
            res.render("new");
        }
        else {
            // Redirect to the index
            res.redirect("/blogs");
        }
    });
    
});

// SHOW
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err) {
            res.redirect("/blogs");
        }
        else {
            res.render("show", {blog: foundBlog});
        }
        
    })
});

// EDIT
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err) {
            res.redirect("/blogs");
        }
        else {
            res.render("edit", {blog: foundBlog});
        }
        
    })
});

// UPDATE
app.put("/blogs/:id", function(req, res){
    // Sanitize blog.body
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // Update blog post and redirect
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err) {
            res.redirect("/blogs");
        }
        else {
            res.redirect("/blogs/" + req.params.id);
        }
        
    })
});

// DESTROY
app.delete("/blogs/:id", function(req, res){
    // Destroy blog post and redirect
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/blogs");
        }
        else {
            res.redirect("/blogs");
        }
        
    })
});

// *********
// Listeners
// *********

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("******************");
    console.log("Server is running!");
    console.log("******************");
});