const { Vote, Superperson, User } = require("../models");

const seedVotes = async function() {
  console.log("starting votes seeding");
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
          strength: Math.floor(Math.random() * 11),
          speed: Math.floor(Math.random() * 11),
          durability: Math.floor(Math.random() * 11),
          energyProjections: Math.floor(Math.random() * 11),
          likeability: Math.floor(Math.random() * 11)
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
      existingVote.intelligence = vote.speed;
      existingVote.strength = vote.durability;
      existingVote.intelligence = vote.energyProjections;
      existingVote.strength = vote.likeability;
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
  console.log("All Votes Added to Database");
};

module.exports = seedVotes;
