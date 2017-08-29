const mongoose = require("mongoose");
const bluebird = require("bluebird");
mongoose.Promise = bluebird;
const { User, Superperson, Vote } = require("../models");
const router = require("express").Router();
const { persistUserViewInfo } = require("../middleware");
const { findSuperPersonRatings } = require("../controllers/superpeople");

router.get("/:superId", persistUserViewInfo, async (req, res) => {
  try {
    const superPerson = await Superperson.findById(req.params.superId);
    const ratings = await findSuperPersonRatings(req.params.superId);
    console.log(ratings);
    // console.log(JSON.stringify(ratings));
    return res.render("superperson", {
      superPerson,
      ratings,
      ratingsJson: encodeURIComponent(JSON.stringify(ratings))
    });
  } catch (err) {
    return res.send(err);
  }
});

router.post("/:superId", async (req, res) => {
  const userId = req.user.id;
  const superId = req.params.superId;
  const voteInfo = req.body.rating;

  try {
    let vote = {
      voter: userId,
      superperson: superId,
      intelligence: parseInt(voteInfo.intelligence),
      strength: parseInt(voteInfo.strength)
    };

    await new Vote(vote).save();

    return res.redirect(`/superpeople/${superId}`);
  } catch (err) {
    return res.send(err);
  }
});

module.exports = router;
