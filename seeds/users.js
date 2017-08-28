const { User } = require("../models");
const usersArray = [];

// Make unique users for voting
module.exports = async function(newUsersLength) {
  for (let i = 0; i < newUsersLength; i++) {
    usersArray.push(
      new User({
        email: `susan${i}@gmail.com`,
        password: "password",
        votes: []
      }).save()
    );
  }

  return await Promise.all(usersArray);
};
