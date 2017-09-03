const mongoose = require("mongoose");
const bluebird = require("bluebird");
mongoose.Promise = bluebird;
const { User, Superperson, Vote } = require("../models");
const router = require("express").Router();
const { persistUserViewInfo, persistUserVoteInfo } = require("../middleware");
const {
  getSuperPersonRatings,
  createOrUpdateUserVote
} = require("../controllers/superpeople");

router.get(
  "/:superId",
  persistUserViewInfo,
  persistUserVoteInfo,
  async (req, res) => {
    console.log("starting");
    try {
      const superPerson = await Superperson.findById(req.params.superId);
      const ratings = await getSuperPersonRatings(req.params.superId);

      return res.render("superperson", {
        superPerson,
        ratings,
        ratingsJson: encodeURIComponent(JSON.stringify(ratings))
      });
    } catch (err) {
      return res.send(err);
    }
  }
);

router.post("/:superId", async (req, res) => {
  const voterId = req.user.id;
  const superpersonId = req.params.superId;
  const voteRatings = req.body.voteRatings;

  try {
    await createOrUpdateUserVote(voterId, superpersonId, voteRatings);
    return res.redirect(`/superpeople/${superpersonId}`);
  } catch (err) {
    return res.send(err);
  }
});

module.exports = router;
