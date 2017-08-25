const mongoose = require("mongoose");
const bluebird = require("bluebird");

mongoose.Promise = bluebird;

module.exports = {
  User: require("./user"),
  Vote: require("./vote"),
  Superperson: require("./superperson")
};
