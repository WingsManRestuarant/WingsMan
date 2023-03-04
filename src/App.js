const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

// set the serving static files in the express in a directory named public
app.use(express.static(__dirname + "/../public"));

// use bodyParser for URL encoding
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.render("home", {
        title: "Food Order Service"
    });
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});