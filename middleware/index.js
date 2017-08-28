module.exports = {
  loggedInOnly: (req, res, next) => {
    return req.isAuthenticated() ? next() : res.redirect("/");
  },

  loggedOutOnly: (req, res, next) => {
    return !req.isAuthenticated() ? next() : res.redirect("/");
  },

  persistUserViewInfo: (req, res, next) => {
    if (req.session.user) {
      res.locals.user = req.session.user;
    }
    return next();
  }
};
