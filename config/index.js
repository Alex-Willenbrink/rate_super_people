// Set up mongoose here
const { DB_URL } = process.env;
const mongoose = require("mongoose");
const bluebird = require("bluebird");
mongoose.Promise = bluebird;

module.exports = function(DB_URL) {
  mongoose
    .connect(DB_URL, {
      useMongoClient: true
    })
    .then(db => {
      console.log("Super People DB Connection Success");
    })
    .catch(err => console.error(err));
};
