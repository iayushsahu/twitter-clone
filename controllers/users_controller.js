const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
  });
};

// render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Sign In",
  });
};

module.exports.create = (req, res, next) => {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  const { email, password, name } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.redirect("/users/sign-in");
      }

      // Create a new user
      const newUser = new User({ email, password, name });
      return newUser.save();
    })
    .then((newUser) => {
      return res.redirect("/users/sign-in");
    })
    .catch((err) => {
      return next(err);
    });
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.destroySession = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
