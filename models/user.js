const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  votes: {
    type: Schema.Types.ObjectId,
    ref: "Vote"
  }
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 12);
});

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
