const mongoose = require("mongoose");

const VoteSchema = mongoose.Schema({
  voter: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  superperson: {
    type: Schema.Types.ObjectId,
    ref: "Superperson"
  },
  intelligenceRating: {
    type: Number,
    required: true
  },
  strengthRating: {
    type: Number,
    required: true
  },
  speedRating: {
    type: Number,
    required: true
  },
  durabilityRating: {
    type: Number,
    required: true
  },
  energyProjectionRating: {
    type: Number,
    required: true
  },
  likeabilityRating: {
    type: Number,
    required: true
  }
});

const Vote = mongoose.model("Vote", VoteSchema);

module.exports = Vote;
