const { Vote, Superperson, User } = require("../models");

const seedVotes = async function() {
  const superPeople = await Superperson.find();
  const users = await User.find();
  const votes = [];

  // set up all votes
  for (let user of users) {
    for (let superPerson of superPeople) {
      votes.push(
        new Vote({
          voter: user.id,
          superperson: superPerson.id,
          intelligence: Math.floor(Math.random() * 11),
          strength: Math.floor(Math.random() * 11)
        })
      );
    }
  }

  for (let vote of votes) {
    let existingVote = await Vote.findOne({
      superperson: vote.superperson,
      voter: vote.voter
    });

    if (existingVote) {
      existingVote.intelligence = vote.intelligence;
      existingVote.strength = vote.strength;
      vote = existingVote;
    }
    vote.save();
  }

  await Promise.all(votes);

  // insert votes into correct users
  for (let user of users) {
    let userVotes = await Vote.find({
      voter: user.id
    }).select("id");

    user.votes = userVotes;
    user.save();
  }

  // insert votes into correct super people
  for (let superPerson of superPeople) {
    let superPersonVotes = await Vote.find({
      superperson: superPerson.id
    }).select("id");

    superPerson.votes = superPersonVotes;
    superPerson.save();
  }
  console.log("Votes Added to Database");
};

module.exports = seedVotes;
