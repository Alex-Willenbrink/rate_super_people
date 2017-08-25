// require("dotenv").config();
// console.log(process.env);
// const { MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY } = process.env;

const request = require("request");
const md5 = require("md5");

const MARVEL_PUBLIC_KEY = "da1542dcdf037da3f620cc5922965cf1";
const MARVEL_PRIVATE_KEY = "c07b08dc12d66083bbc005abc83b5aa17cdd15ab";

// main page: http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784/portrait_uncanny.jpg
//
// http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784/standard_small.jpg
//
// data.results.
// -- name
// -- description
// -- smallImageUrl
// -- largeImageUrl

// seed the database with super people
const ts = 1;
const hash = md5(`${ts}${MARVEL_PRIVATE_KEY}${MARVEL_PUBLIC_KEY}`);
const query = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`;

// console.log("query: ", query);
// request(query, (err, res, body) => {
//   console.log("body: ", JSON.parse(body).data.results[0]);
// });

request(query, async (err, res, body) => {
  try {
    let marvelJson = await JSON.parse(body);
    // console.log(parseMarvelQuery(marvelJson.data.results));

    // console.log(marvelJson);
    let parsedMarvel = await parseMarvelQuery(marvelJson.data.results);
    // console.log("fjfjf");
    console.log(parsedMarvel);
  } catch (err) {
    console.error(err);
  }
});

const getMarvelPicture = (picPath, imageType) => {
  return picPath + `/${imageType}.jpg`;
};

// marvel image options: https://developer.marvel.com/documentation/images

const parseMarvelQuery = async superData => {
  const superArray = [];
  try {
    await superData.forEach(superPerson => {
      console.log(superPerson.thumbnail.path);
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

// save marvel super people in database
