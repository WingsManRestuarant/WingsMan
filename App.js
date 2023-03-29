const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const mongoose = require('mongoose');
const Product =require('./models/Product')


const db = require('./utils/db');
const shopRoutes = require('./routes/shop');
const products = require("./data/products");



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

app.use(shopRoutes);


app.get("/", function(req, res) {
  res.render("home", {
    title: "Food Order Service"
  });
});

app.get("/category", isLoggedIn,  function(req, res) {
  res.render("category");
});

app.get("/category/appetizer", isLoggedIn, function(req, res) {
  res.render("appetizer");
});

app.get("/category/main", isLoggedIn, function(req, res) {
  res.render("main");
});

app.get("/category/drink", isLoggedIn, function(req, res , next) {
  Product.find(function(err,docs){
    var productChunks =[];
    var chunkSize = 3;
    for(var i = 0; i< docs.length; i += chunkSize){
      productChunks.push(docs.slice(i,i+chunkSize));
    }
    res.render("drink", {title: 'Shopping Cart', products: products});
  });
  
});

app.get("/cart",isLoggedIn, function(req, res) {
  res.render("cart");
});

app.get("/progress", isLoggedIn, function(req, res) {
  res.render("progress");
});

//Login sec
app.get("/login",  (req, res) => {
  res.render("login");
  
});
app.post("/login", async (request, response) => {
  try {
    //adding
    const email = request.body.email;
    const password = request.body.password;
    const usermail = db
      .collection("users")
      .findOne({ email: email }, (err, res) => {
        if (res == null) {
          // Show the message in a popup window
          return response.send(
            "<script>alert('Invalid account information! To gain access to the application, Please signup first.'); location.href='login'</script>");
        } else if (err) throw err;

        if (res.password === password) {  //* Login success
          request.session.user = email;
          return response.redirect("category");
        } else {
          // Show the message in a popup window
          return response.send(
            "<script>alert('The Email or password you entered is incorrect! Please try again.'); location.href='login';</script>");
        }
      });
  } catch (error) {
    // Show the message in a popup window
    return response.send("<script>alert('Error! Please try again later.');</script>");
  }
});


//Register sec
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (request, response) => {
  const name = request.body.name;
  const email = request.body.email;
  const password = request.body.password;

  const data = {
      "name": name,
      "email" : email,
      "password" : password
  }
  db.collection('users').insertOne(data,(err,collection)=>{
      if(err){
          throw err;
      }
      console.log("Record Inserted Successfully");
  });
  return response.redirect("category")
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});