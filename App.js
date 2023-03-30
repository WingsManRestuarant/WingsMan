const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const mongoose = require('mongoose');

//* Import routes
const authRoutes = require("./routes/authRoutes");
const shopRoutes = require('./routes/shop');

const db = require('./utils/db');

//*all product
const appetizerProd =require('./models/appetizerProd')
const products1 = require("./data/appetizerProd");
const drinkProd =require('./models/drinkProd')
const products2 = require("./data/drinkProd");
const mainProd =require('./models/mainProd')
const products3 = require("./data/mainProd");



// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Sessions

app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true,

}));


const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

// app.use(shopRoutes); //! some error


app.get("/", function(req, res) {
  res.render("home", {
    title: "Food Order Service"
  });
});

app.get("/category", isLoggedIn,  function(req, res) {
  res.render("category");
});


//
app.get("/category/appetizer", isLoggedIn, function(req, res, next) {
  appetizerProd.find().then(function(docs) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render("appetizer", { title: 'Shopping Cart', productChunks: productChunks });
  }).catch(function(err) {
    return next(err);
  });
});


app.get("/category/main", isLoggedIn, function(req, res, next) {
  mainProd.find().then(function(docs) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render("main", { title: 'Shopping Cart', productChunks: productChunks });
  }).catch(function(err) {
    return next(err);
  });
});


app.get("/category/drink", isLoggedIn, function(req, res, next) {
  drinkProd.find().then(function(docs) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render("drink", { title: 'Shopping Cart', productChunks: productChunks });
  }).catch(function(err) {
    return next(err);
  });
});

  





app.get("/cart",isLoggedIn, function(req, res) {
  res.render("cart");
});

app.get("/progress", isLoggedIn, function(req, res) {
  res.render("progress");
});

app.use("/", authRoutes);


app.listen(3000, function() {
  console.log("Server started on port 3000");
});