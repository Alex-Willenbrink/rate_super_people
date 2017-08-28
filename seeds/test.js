const MARVEL_PUBLIC_KEY = "da1542dcdf037da3f620cc5922965cf1";
const MARVEL_PRIVATE_KEY = "c07b08dc12d66083bbc005abc83b5aa17cdd15ab";
const md5 = require("md5");
const request = require("async-request");
// const fetch = require("node-fetch");

async function query() {
  const ts = 1;
  const hash = md5(`${ts}${MARVEL_PRIVATE_KEY}${MARVEL_PUBLIC_KEY}`);
  const limit = 100;
  let offset = 0;
  let query = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`;
  console.log(query.body);

  // let data = await request(query);
  let data = await request(query);
  console.log(data);
  console.log(3);
  return data;
}

query();
