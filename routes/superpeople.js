const mongoose = require("mongoose");
const bluebird = require("bluebird");
mongoose.Promise = bluebird;
const { User, Superperson } = require("../models");
const router = require("express").Router();

router.get("/:superId", async (req, res) => {
  try {
    let superPerson = await Superperson.findById(req.params.superId);
    // console.log(person);
    // get votes at some point
    return res.render("superperson", { superPerson });
  } catch (err) {
    return res.send(err);
  }
});

module.exports = router;
