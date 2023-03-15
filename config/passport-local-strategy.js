const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        // find a user and establish the identity
        const user = await User.findOne({ email: email });

        if (!user || user.password != password) {
          console.log("Invalid email/password");
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        console.log("Error in finding user --> Passport");
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  Promise.resolve(user.id)
    .then((id) => done(null, id))
    .catch((err) => done(err));
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);

    return done(null, user);
  } catch (err) {
    console.log("Error in finding user --> Passport");
    return done(err);
  }
});

// check if the user is authenticate or not
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};
module.exports = passport;
