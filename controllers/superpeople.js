const mongoose = require("mongoose");
const bluebird = require("bluebird");
mongoose.Promise = bluebird;
const { User, Superperson, Vote } = require("../models");

const findSuperPersonRatings = async function(superId) {
  const voteTypes = ["intelligence", "strength"];

  const allVotes = await Vote.find({
    superperson: superId
  });

  const ratings = {};

  voteTypes.forEach(voteType => {
    allVotes.forEach(vote => {
      ratings[voteType].sum += vote[voteType];
      ratings[voteType].length++;
    });
  });

  return ratings;
};

module.exports = {
  findSuperPersonRatings
};
