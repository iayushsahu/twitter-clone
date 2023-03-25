const User = require("../models/user");

module.exports.profile = async (req, res) => {
  const user = await User.findById(req.params.id).exec();
  const username = user.name;
  return res.render("user_profile", {
    title: `${username} | Profile`,
    profile_user: user,
  });
};

module.exports.update = async (req, res) => {
  try {
    if (req.user.id == req.params.id) {
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      req.flash("success", "Updated!");
      return res.redirect("back");
    } else {
      req.flash("error", "Unauthorized!");
      return res.status(401).send("unauthorized");
    }
  } catch (error) {
    req.flash("error", "facing some error!");
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
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

module.exports.create = async (req, res, next) => {
  try {
    const { email, password, name, confirm_password } = req.body;
    if (password !== confirm_password) {
      req.flash("error", "Passwords do not match");
      return res.redirect("back");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      req.flash("success", "you are already registered, login to continue!");
      return res.redirect("/users/sign-in");
    }

    const newUser = new User({ email, password, name });
    await newUser.save();
    req.flash("success", "You have signed up, login to continue!");
    return res.redirect("/users/sign-in");
  } catch (error) {
    req.flash("error", "facing some error!");
    return next(error);
  }
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};

module.exports.destroySession = (req, res) => {
  req.logout(function (err) {
    if (err) {
      req.flash("error", "facing some error!");
      return next(err);
    }
    req.flash("success", "You have logged out!");
    res.redirect("/");
  });
};
