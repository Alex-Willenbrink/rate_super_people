# jul-furry-winner

Hackaton End of Week 6. GET CRAZY CODING!

**IMPORTANT: Modify this file to add description to how we will start/use your app.**

Made by Alex Willenbrink

// npm install
// get marvel api
// get mlab up and running


1. Clone from pushed repo
2. from root directory of project, run "npm i"
3. Create a file  of ".env" filetype on the root of the project
4. In the created .env file there should be 3 different variables set up like so:

// .env =>
DB_URL=mongodb://admin:admin@ds157873.mlab.com:57873/super_people
MARVEL_PUBLIC_KEY=da1542dcdf037da3f620cc5922
MARVEL_PRIVATE_KEY=c07b08dc12d66083bbc005abc83b5aa1

5. Use "mlab" for setting up the database. Go to this link: https://mlab.com/signup/

Sign up for an account and login.

From the login page, hit the "+ create new" button. Use the "SANDBOX" plan type with amazon services and continue. Select US East as your region and then hit continue. Call the database: "super_people" and continue.

From here, you need to hit the "Users" option and then hit the "Add a database user". For all the options provided input "admin" for all credentials so easy to remember.

Use the MONGODB URI provided above with the new user credentials you've just entered to create the DB_URL.

So this:
mongodb://<dbuser>:<dbpassword>@ds159033.mlab.com:59033/efefe

Becomes this:
mongodb://admin:admin@ds157873.mlab.com:57873/super_people


Click on your new database and to connect to it, you'll have to copy the

6. Obtain information for the Marvel public and private keys. You'll need to make an account first from this link:
https://secure.marvel.com/user/register

Afterwards, follow the instructions on this link.
https://developer.marvel.com/documentation/getting_started

Instructions aren't that great on the link, but there should be a "Get a Key" option at the top of the page after you register with an account. Just accept the terms and conditions and you should get the keys.
