// Set up process variables
require("dotenv").config();
const { DB_URL, MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY } = process.env;

// Set up express
const express = require("express");
const app = express();

// Set up cookieParser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Set up bodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Set up express session
const expressSession = require("express-session");
app.use(
  expressSession({
    secret: "keyboard cat",
    saveUninitialized: false,
    resave: false
  })
);

// Set up flash messages
// const flash = require("express-flash");
// app.use(flash());

// Set up express handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "application" }));
app.set("view engine", "handlebars");

// Set up public folder for styling and front end javascript
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// set up database with mlab (mongoose as the ORM)
require("./config")(DB_URL);

// seed database with super people
require("./seeds/superpeople")(MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY, 10);

// const seedUsers = require("./seeds/users");
// seedUsers(10).then(users => {
//   console.log(users);
// });

const seedVotes = require("./seeds/votes");
seedVotes();

// set up passport and local strategy
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

const { local, serializeUser, deserializeUser } = require("./strategies");

passport.use(local);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// Routes
const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

const superpeopleRoutes = require("./routes/superpeople");
app.use("/superpeople", superpeopleRoutes);

// Start ze server
const port = 3000;

app.listen(port, () => {
  console.log("Listening for Superpeople");
});
