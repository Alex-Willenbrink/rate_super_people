const { Superperson } = require("../models");
const request = require("request");
const md5 = require("md5");
const mongoose = require("mongoose");

const getMarvelPicture = (picPath, imageType) => {
  return picPath + `/${imageType}.jpg`;
};

const parseMarvelQuery = async superData => {
  const superArray = [];
  try {
    await superData.forEach(superPerson => {
      superArray.push({
        name: superPerson.name,
        description: superPerson.description,
        smallImageUrl: getMarvelPicture(
          superPerson.thumbnail.path,
          "standard_small"
        ),
        largeImageUrl: getMarvelPicture(
          superPerson.thumbnail.path,
          "portrait_uncanny"
        )
      });
    });
  } catch (err) {
    console.log(err);
  }
  return superArray;
};

module.exports = function(MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY) {
  const ts = 1;
  const hash = md5(`${ts}${MARVEL_PRIVATE_KEY}${MARVEL_PUBLIC_KEY}`);
  const query = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`;

  request(query, async (err, res, body) => {
    try {
      let marvelJson = await JSON.parse(body);
      let parsedMarvel = await parseMarvelQuery(marvelJson.data.results);

      for (const superPerson of parsedMarvel) {
        let existingPerson = await Superperson.findOne({
          name: superPerson.name
        });

        if (!existingPerson) {
          new Superperson(superPerson).save();
        }
      }

      console.log("Super People Added to Database");

      return;
    } catch (err) {
      console.error(err);
    }
  });
};
