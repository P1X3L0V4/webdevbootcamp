var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    LocalStrategy         = require("passport-local");
    passportLocalMongoose = require("passport-local-mongoose");
    
// *********
// Models
// *********
var User = require("./models/user");

// *********
// Settings
// *********

var app = express();
mongoose.connect("mongodb://localhost/auth_demo_app");
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
    // Secret - keywords that will be a base to code the text
    secret: "Pixels are the key to everything",
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

// Method to authenticate user (taken form user.js)
passport.use(new LocalStrategy(User.authenticate()));
// Methods to serialize and deserialize data (taken from user.js)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// *********
// Routes
// *********

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

// AUTH ROUTES

// REGISTER - Show singn up form
app.get("/register", function(req, res){
    res.render("register");
});

// REGISTER - Handling user sign up
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        // Login user in (serialize info ect.); local is the strategry (alt facebook, twitter)
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });
});

// LOGIN - Render login form
app.get("/login", function(req, res){
    res.render("login");
});

// LOGIN - Logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){});

// LOGOUT
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});


// MIDDLEWARE FUNCS
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


// *********
// Listeners
// *********

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running!");
});