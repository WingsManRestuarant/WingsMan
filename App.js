const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser")

//* -----------------------------------------Import routes-----------------------------------------
const authRoutes = require("./routes/authRoutes");
const drinkRoute = require("./routes/drink");
const appetizerRoute = require("./routes/appetizer");
const mainRoute = require("./routes/main");
const addToCartRoute = require("./routes/addToCart");
//* -------------------------------------------------------------------------------------------------


const db = require('./utils/db');


//* ---------------------------Product----------------------------------------------------------------
const appetizerProd =require('./models/appetizerProd')
const drinkProd =require('./models/drinkProd')
const mainProd =require('./models/mainProd')

//* --------------------------------------------------------------------------------------------------


// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};
app.use(cookieParser());

//* ///////////////////////////////////////////Sessions/////////////////////////////////////////////////////
app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 180 * 60 * 1000 }
}));
//* ////////////////////////////////////////////////////////////////////////////////////////////////////////


app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

app.get("/", function(req, res) {
  res.render("home", {
    title: "Food Order Service"
  });
});

app.get("/category", isLoggedIn,  function(req, res) {
  res.render("category");
});


//* Outputting data
app.use("/category/appetizer",isLoggedIn, appetizerRoute(appetizerProd));
app.use("/category/main",isLoggedIn, mainRoute(mainProd));
app.use("/category/drink",isLoggedIn, drinkRoute(drinkProd));

app.use("/", authRoutes);
  
app.use(addToCartRoute);



app.get("/cart",isLoggedIn, function(req, res) {
  res.render("cart");
});

app.get("/progress", isLoggedIn, function(req, res) {
  res.render("progress");
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});