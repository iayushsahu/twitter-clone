const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("./assets"));
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "twitterClones",
    // TODO change the secret before deployment in production mode
    secret: "ayush1",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://127.0.0.1/twitterClone",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || `connect-mongodb setup ok!`);
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use("/", require("./routes"));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.on("error", (err) => {
  console.log(`Error in running the server: ${err}`);
});