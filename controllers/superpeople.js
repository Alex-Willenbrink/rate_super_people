const mongoose = require("mongoose");
const bluebird = require("bluebird");
mongoose.Promise = bluebird;
const { User, Superperson, Vote } = require("../models");

function findVoteTypes(ratings) {
  const voteTypes = [];
  ratings.forEach(rating => {
    voteTypes.push(rating.type);
  });
  return voteTypes;
}

const findSuperPersonRatings = async function(superId) {
  const allVotes = await Vote.find({
    superperson: superId
  });

  // rating: array of votes, average
  const ratings = [
    {
      type: "intelligence",
      avg: null,
      values: []
    },
    {
      type: "strength",
      avg: null,
      values: []
    }
  ];

  const voteTypes = findVoteTypes(ratings);

  allVotes.forEach(vote => {
    voteTypes.forEach((voteType, index) => {
      ratings[index].values.push(vote[voteType]);
    });
  });

  ratings.forEach((rating, index) => {
    let voteValues = ratings[index].values;
    ratings[index].avg =
      voteValues.reduce((sum, value) => sum + value, 0) / voteValues.length;
  });

  return ratings;
};

module.exports = {
  findSuperPersonRatings
};
