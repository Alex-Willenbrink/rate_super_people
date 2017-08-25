const mongoose = require("mongoose");

const SuperpersonSchema = mongoose.Schema({
  votes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Vote"
    }
  ],
  name: {
    type: String
  },
  smallImageUrl: {
    type: String
  },
  largeImageUrl: {
    type: String
  },
  description: {
    type: String
  }
});

const Superperson = mongoose.model("Superperson", SuperpersonSchema);

module.exports = Superperson;
