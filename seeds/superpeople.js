require("dotenv").config();
const { MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY } = process.env;

const { Superperson } = require("../models");
const request = require("request");
const md5 = require("md5");
const mongoose = require("mongoose");

// const MARVEL_PUBLIC_KEY = "da1542dcdf037da3f620cc5922965cf1";
// const MARVEL_PRIVATE_KEY = "c07b08dc12d66083bbc005abc83b5aa17cdd15ab";

// seed the database with super people

module.exports = function() {
  const ts = 1;
  const hash = md5(`${ts}${MARVEL_PRIVATE_KEY}${MARVEL_PUBLIC_KEY}`);
  const query = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`;

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

  request(query, async (err, res, body) => {
    try {
      let marvelJson = await JSON.parse(body);
      let parsedMarvel = await parseMarvelQuery(marvelJson.data.results);
      parsedMarvel.forEach(superPerson => {
        new Superperson(superPerson).save();
      });

      return;
    } catch (err) {
      console.error(err);
    }
  });
};

// save marvel super people in database
