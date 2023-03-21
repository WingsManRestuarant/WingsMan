const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

// set the serving static files in the express in a directory named public
app.use(express.static("public"));

// use bodyParser for URL encoding
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.render("home", {
        title: "Food Order Service"
    });
});

app.get("/category", function (req, res) {
    res.render("category",)
});
app.get("/category/appetizer", function (req, res) {
    res.render("appetizer",)
});
app.get("/category/main", function (req, res) {
    res.render("main",)
});
app.get("/category/drink", function (req, res) {
    res.render("drink",)
});

app.get("/cart", function(req, res){
    res.render("cart")
})
app.get("/progress", function(req, res){
    res.render("progress")
})
app.get("/login", function(req, res){
    res.render("login")
})
app.listen(3000, function () {
    console.log("Server started on port 3000");
});