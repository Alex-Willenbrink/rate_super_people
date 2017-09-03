const { getUserVote } = require("../controllers/superpeople");

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
  },

  persistUserVoteInfo: async (req, res, next) => {
    try {
      if (res.locals.user) {
        res.locals.user.vote = await getUserVote(
          res.locals.user._id,
          req.params.superId
        );
      }
    } catch (e) {
      throw e;
    }
    return next();
  }
};
