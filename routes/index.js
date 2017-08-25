const mongoose = require("mongoose");
const bluebird = require("bluebird");
mongoose.Promise = bluebird;
const { User, Superperson } = require("../models");
const router = require("express").Router();
const passport = require("passport");
const { loggedInOnly, loggedOutOnly } = require("../middleware");

router.get("/", (req, res) => {
  console.log("session: ", req.session.user);
  console.log("req.user: ", req.user);
  // make logic here
  res.render("landing", { user: req.user });
});

router.post("/", async (req, res) => {
  let superName = req.body.search;
  console.log(superName);
  if (!superName) return redirect("/");

  try {
    let people = await Superperson.find({
      name: new RegExp(`${superName}`, "i")
    });

    return res.render("landing", { people, user: req.user });
  } catch (err) {
    console.log("error with superpeople");
    return res.send(err);
  }
});

router.get("/login", loggedOutOnly, (req, res) => {
  res.render("login");
});

router.get("/logout", loggedInOnly, (req, res) => {
  req.session.user = null;
  req.logout();
  res.redirect("/");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

router.post("/logout", (req, res) => {
  res.redirect("/");
});

router.get("/register", loggedOutOnly, (req, res) => {
  res.render("register");
});

router.post("/register", loggedOutOnly, async (req, res) => {
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
      email: email,
      password: password,
      votes: []
    });
    await user.save();

    return res.redirect("/login");
  } catch (err) {
    // insert flash message for other weird errors
    // session.err = err;
    console.log(err);
    return res.redirect("/");
  }
});

module.exports = router;
