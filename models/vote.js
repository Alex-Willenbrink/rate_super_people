const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VoteSchema = Schema({
  voter: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  superperson: {
    type: Schema.Types.ObjectId,
    ref: "Superperson",
    require: true
  },
  intelligence: {
    type: Number,
    required: true
  },
  strength: {
    type: Number,
    required: true
  }
  // speedRating: {
  //   type: Number,
  //   required: true
  // },
  // durabilityRating: {
  //   type: Number,
  //   required: true
  // },
  // energyProjectionRating: {
  //   type: Number,
  //   required: true
  // },
  // likeabilityRating: {
  //   type: Number,
  //   required: true
  // }
});

const Vote = mongoose.model("Vote", VoteSchema);

module.exports = Vote;
