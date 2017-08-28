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
        }).save()
      );
    }
  }

  await Promise.all(votes);

  // insert votes into correct users
  for (let user of users) {
    let userVotes = await Votes.find({
      voter: user.id
    }).select("id");

    console.log(userVotes);

    user.votes = userVotes;
    user.save();
  }

  // insert votes into correct super people
  for (let superPerson of superPeople) {
    let superPersonVotes = await Votes.find({
      superperson: superPerson.id
    }).select("id");

    superPerson.votes = superPersonVotes;
    superPerson.save();
  }
};

module.exports = seedVotes;
