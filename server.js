const express = require("express");
const app = express();
const mongoose = require("mongoose");
const seedDB = require("./seed");
const path = require("path");
var methodOverride = require("method-override");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");

let configSession = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.use(cookieParser());
app.use(session(configSession));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// for static files
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

mongoose
  .connect("mongodb://127.0.0.1:27017/ecomcb") //returns a promise
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("this is the error :", err);
  });

// seedDB();
const productRoutes = require("./routes/product");
const reviewRoutes = require("./routes/review");
const authRoutes = require("./routes/auth");

app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);

// (req,res,next)=>{

// }

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
