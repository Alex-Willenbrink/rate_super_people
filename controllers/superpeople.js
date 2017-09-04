const mongoose = require("mongoose");
const bluebird = require("bluebird");
mongoose.Promise = bluebird;
const { User, Superperson, Vote } = require("../models");

const voteTypes = [
  "intelligence",
  "strength",
  "speed",
  "durability",
  "energyProjections",
  "likeability"
];

const getSuperPersonRatings = async function(superId) {
  const allVotes = await Vote.find({
    superperson: superId
  });

  const ratings = [];
  voteTypes.forEach(type => {
    ratings.push({
      type,
      avg: null,
      values: []
    });
  });

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

const getUserVote = async (voterId, superpersonId) => {
  let userVote, userVoteArray;
  try {
    userVote = await Vote.findOne({
      voter: voterId,
      superperson: superpersonId
    });

    if (userVote) {
      userVoteArray = voteTypes.map(type => {
        return { type, rating: userVote[type] };
      });
    } else {
      userVoteArray = voteTypes.map(type => {
        return { type, rating: 5 };
      });
    }
  } catch (e) {
    throw e;
  }
  return userVoteArray;
};

const createOrUpdateUserVote = async (voterId, superpersonId, voteRatings) => {
  let vote = {
    voter: voterId,
    superperson: superpersonId
  };

  voteTypes.forEach(type => {
    vote[type] = voteRatings[type];
  });

  try {
    const existingVote = await Vote.findOne({
      voter: voterId,
      superperson: superpersonId
    });

    if (existingVote) {
      vote = await Vote.findOneAndUpdate(
        {
          voter: voterId,
          superperson: superpersonId
        },
        vote
      );
    } else {
      vote = await new Vote(vote).save();
    }
  } catch (e) {
    throw e;
  }

  return await vote;
};

module.exports = {
  getSuperPersonRatings,
  getUserVote,
  createOrUpdateUserVote
};
