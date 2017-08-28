const LocalStrategy = require("passport-local");
const { User } = require("../models");

module.exports = {
  local: new LocalStrategy(async function(email, password, done) {
    try {
      const user = await User.findOne({ email: email });
      if (!user)
        throw new Error("Error: No User by that email in the database");

      if (!user.validatePassword(password))
        throw new Error("Error: Passwords do not match");

      return done(null, user);
    } catch (err) {
      done(err);
    }
  }),

  serializeUser: (user, done) => done(null, user.id),
  deserializeUser: (id, done) => {
    User.findById(id, (err, user) => {
      done(null, user);
    });
  }
};
