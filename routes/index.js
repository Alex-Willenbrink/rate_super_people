const mongoose = require("mongoose");
const bluebird = require("bluebird");
mongoose.Promise = bluebird;
const { User } = require("../models");
const router = require("express").Router();

// const loggedInOnly = (req, res, next) => {
//   return req.isAuthenticated() ? next() : res.redirect("/");
// };
//
// const loggedOutOnly = (req, res, next) => {
//   return !req.isAuthenticated() ? next() : res.redirect("/");
// };

router.get("/", (req, res) => {
  // make logic here
  res.redirect("/login");
});

router.get("/login", (req, res) => {
  res.render("login");
});

// router.post("/logout", (req, res) => {
//   res.redirect("/");
// });

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      // insert flash message that email taken
      console.log("user exists already");
      return res.redirect("/register");
    }

    const user = new User({
      email: req.body.email,
      password: req.body.password,
      votes: []
    });

    await user.save();

    console.log(user);
    return res.redirect("/register");
  } catch (err) {
    // insert flash message for other weird errors
    // session.err = err;
    console.log(err);
    return res.redirect("/");
  }
});

module.exports = router;
