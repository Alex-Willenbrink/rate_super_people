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
      })
    );
  }

  for (const user of usersArray) {
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
      await user.save();
    }
  }

  console.log("All Seeded Users Added to Database");

  return await Promise.all(usersArray);
};
