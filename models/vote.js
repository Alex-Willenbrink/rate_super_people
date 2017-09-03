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
    min: 0,
    max: 10,
    required: true
  },
  strength: {
    type: Number,
    min: 0,
    max: 10,
    required: true
  },
  speed: {
    type: Number,
    required: true
  },
  durability: {
    type: Number,
    required: true
  },
  energyProjections: {
    type: Number,
    required: true
  },
  likeability: {
    type: Number,
    required: true
  }
});

const Vote = mongoose.model("Vote", VoteSchema);

module.exports = Vote;
