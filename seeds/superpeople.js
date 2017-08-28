const { Superperson } = require("../models");
const request = require("async-request");
const md5 = require("md5");
const mongoose = require("mongoose");

const getMarvelPicture = (picPath, imageType) => {
  return picPath + `/${imageType}.jpg`;
};

const parseMarvelQuery = superData => {
  const superArray = [];

  superData.forEach(superPerson => {
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
  return superArray;
};

module.exports = async function(
  MARVEL_PUBLIC_KEY,
  MARVEL_PRIVATE_KEY,
  queryLimit = Infinity
) {
  const ts = 1;
  const hash = md5(`${ts}${MARVEL_PRIVATE_KEY}${MARVEL_PUBLIC_KEY}`);
  const limit = !isNaN(queryLimit) && queryLimit < 100 ? queryLimit : 100;
  let offset = 0;
  let parsedMarvel;

  try {
    do {
      const query = `http://gateway.marvel.com/v1/public/characters?limit=${limit}&offset=${offset}&ts=${ts}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`;
      const data = await request(query);
      const personArray = await JSON.parse(data.body).data.results;
      parsedMarvel = parseMarvelQuery(personArray);

      for (const superPerson of parsedMarvel) {
        const existingPerson = await Superperson.findOne({
          name: superPerson.name
        });

        if (!existingPerson) {
          await new Superperson(superPerson).save();
        }
      }

      console.log(
        `Added superpeople ${offset} - ${offset +
          parsedMarvel.length} to Database`
      );

      offset += limit;
    } while (parsedMarvel.length >= limit && offset < queryLimit);
  } catch (err) {
    console.error(err);
  }
  console.log("All New Super People Added to Database");
};
