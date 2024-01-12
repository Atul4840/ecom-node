const router = require("express").Router();
const passport = require('passport');
const User = require("../models/User");


router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/register", async(req, res) => {
  let { username, email, gender,role, password } = req.body;
  let user = new User({username, email, gender,role});
  let newUser = await User.register(user,password);
  // console.log(newUser);
  res.redirect('/login');
});


router.post('/login',
  passport.authenticate('local',
  { 
    failureRedirect: '/signup', 
    failureMessage: true 
  }),
  function(req, res) {
    // console.log(req.user , "User");
    req.flash('success' , `Welcome Back ${req.user.username}`)
    res.redirect('/products');
});


router.get("/logout", (req, res) => {
  req.logout(()=>{
    res.redirect("/login");
  }); // Passport function to terminate a login session
  
});

module.exports = router;
