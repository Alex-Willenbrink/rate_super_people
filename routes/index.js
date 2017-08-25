const mongoose = require("mongoose");
const bluebird = require("bluebird");
// const passport = require("passport");
mongoose.Promise = bluebird;
// const { User } = require("../models");
const router = require("express").Router();
const passport = require("passport");

// passport.use(
//   new LocalStrategy(async function(email, password, done) {
//     try {
//       console.log("fdlkfljsdal;sd;lsdflk;asfdlsd");
//       const user = await User.findOne({ email: email });
//       console.log("trying to authenticate");
//       if (!user)
//         throw new Error("Error: No User by that email in the database");
//
//       if (!user.validatePassword(password))
//         throw new Error("Error: Passwords do not match");
//
//       return done(null, user);
//     } catch (err) {
//       done(err);
//     }
//   })
// );

// const serializeUser = (user, done) => done(err, user.id);
// const deserializeUser = (id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// };
//
// passport.serializeUser(serializeUser);
// passport.deserializeUser(deserializeUser);

const loggedInOnly = (req, res, next) => {
  return req.isAuthenticated() ? next() : res.redirect("/");
};

const loggedOutOnly = (req, res, next) => {
  return !req.isAuthenticated() ? next() : res.redirect("/");
};

router.get("/", (req, res) => {
  // make logic here
  res.render("landing");
});

router.get("/login", loggedOutOnly, (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

// router.post("/logout", (req, res) => {
//   res.redirect("/");
// });

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
