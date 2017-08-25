// Set up process variables
require("dotenv").config();
const { DB_URL } = process.env;

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

// Set up mongoose here
const mongoose = require("mongoose");
const bluebird = require("bluebird");
mongoose.Promise = bluebird;

const beginConnection = mongoose.connect(DB_URL, {
  useMongoClient: true
});

beginConnection
  .then(db => {
    console.log("Super People DB Connection Success");
  })
  .catch(err => console.error(error));

// seed database with superpeople

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

// Start ze server
const port = 3000;

app.listen(port, () => {
  console.log("Listening for Superpeople");
});
