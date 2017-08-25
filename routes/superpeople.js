const mongoose = require("mongoose");
const bluebird = require("bluebird");
mongoose.Promise = bluebird;
const { User, Superperson, Vote } = require("../models");
const router = require("express").Router();

router.get("/:superId", async (req, res) => {
  try {
    let superPerson = await Superperson.findById(req.params.superId);
    res.locals.user = req.user;

    return res.render("superperson", { superPerson });
  } catch (err) {
    return res.send(err);
  }
});

router.post("/:superId", async (req, res) => {
  try {
    let voteTypes = [
      "intelligenceRating",
      "strengthRating",
      "speedRating",
      "durabilityRating",
      "energyProjectionRating",
      "likeabilityRating"
    ];

    let superId = req.params.superId;
    let voteInfo = req.body.rating;
    console.log("voteInfo: ", voteInfo);
    let vote = {};

    let locRating, parseRating;
    voteTypes.forEach(voteType => {
      console.log("voteType: ", voteType);
      locRating = voteInfo[voteType];
      console.log("locRating: ", locRating);

      if (locRating && !isNan(parseInt(locRating))) {
        // parsedRating = parseInt(locRating);
        // if (parsedRating >= 0 && parsedRating <= 10) {
        //   vote[voteType] = parsedRating;
        // }
      }
    });

    console.log("blah blah blah");
    vote.voter = req.user._id;
    vote.superperson = superId;

    // if(Vote.find({
    //   { superperson: id }
    //
    // }))
    await new Vote(vote).save();

    return res.redirect(`/superpeople/${superId}`);
  } catch (err) {
    return res.send(err);
  }
});

module.exports = router;
