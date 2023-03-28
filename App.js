const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const session = require("express-session");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:admin@cluster0.u8eno7n.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

const ifNotLoggedin = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.render("login");
  }
  next();
};

const ifLoggedin = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.redirect("/category");
  }
  next();
};

app.get("/", function(req, res) {
  res.render("home", {
    title: "Food Order Service"
  });
});

app.get("/category", ifNotLoggedin, function(req, res) {
  res.render("category");
});

app.get("/category/appetizer", ifNotLoggedin, function(req, res) {
  res.render("appetizer");
});

app.get("/category/main", ifNotLoggedin, function(req, res) {
  res.render("main");
});

app.get("/category/drink", ifNotLoggedin, function(req, res) {
  res.render("drink");
});

app.get("/cart", ifNotLoggedin, function(req, res) {
  res.render("cart");
});

app.get("/progress", ifNotLoggedin, function(req, res) {
  res.render("progress");
});

app.get("/login", ifLoggedin, (req, res) => {
  res.render("login");
  
});

app.post(
    "/login",
    ifLoggedin,
    [
      body("email").custom(value => {
        return User.findOne({ email: value }).then(user => {
          if (!user) {
            return Promise.reject("Invalid Email Address!");
          }
          return true;
        });
      }),
      body("password", "Password is empty").trim().not().isEmpty()
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render("login", {
          login_errors: errors.array()
        });
      }
  
      User.findOne({ email: req.body.email }).then(user => {
        console.log("user", user);
        bcrypt.compare(req.body.password, user.password).then(match => {
          console.log("match", match);
          if (match) {
            req.session.isLoggedIn = true;
            req.session.userID = user._id;
            console.log("logged in");
            res.redirect("/category");
          } else {
            return res.render("login", {
              login_errors: [{ msg: "Invalid Password" }]
            });
          }
        });
      }).catch(err => {
        console.log("error", err);
        
        return res.render("login", {
          login_errors: [{ msg: "Something went wrong" }]
        });
      });
    }
    
  );
  

app.listen(3000, function() {
  console.log("Server started on port 3000");
  console.log("Server started on port 3000");
});