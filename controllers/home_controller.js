const Post = require("../models/post");

module.exports.home = home = async (req, res) => {
  try {
    const username = req.user ? req.user.name : "Twitter";
    // const username = "Ayush";
    const post = await Post.find({})
      .populate("user")
      .populate({ path: "comments", populate: { path: "user" } })
      .exec();

    res.render("home", {
      title: `${username} | Home`,
      posts: post,
    });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};
