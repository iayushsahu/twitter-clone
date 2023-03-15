const Post = require("../models/post");

module.exports.home = (req, res) => {
  return res.render("home", {
    title: "Home",
  });
};

/* module.exports.createPost = (req, res) => {
  const content = req.body;
  console.log(content);
  return res.render("home", {
    title: "Home",
  });
}; */
