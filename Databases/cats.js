var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

// Schema
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

// Model
var Cat = mongoose.model("Cat", catSchema);

// Adding cat to the database
// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// })

// george.save(function(err, cat){
//     if(err) {
//         console.log("ERROR");
//     }
//     else {
//         console.log("New cat added to the DB");
//         console.log(cat);
//     }
// });


Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
});

// Retrive all cats for the DB and console.log each one

Cat.find({}, function(err, cats){
    if(err) {
        console.log("ERROR");
    }
    else {
        console.log("SEARCH RESULTS:");
        console.log(cats);
    }
});