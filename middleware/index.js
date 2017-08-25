module.exports = {
  loggedInOnly: (req, res, next) => {
    return req.isAuthenticated() ? next() : res.redirect("/");
  },

  loggedOutOnly: (req, res, next) => {
    return !req.isAuthenticated() ? next() : res.redirect("/");
  }
};
