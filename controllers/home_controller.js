const Post = require("../models/post");

module.exports.home = home = async (req, res) => {
  try {
    // const username = req.user.name;
    const username = 'Ayush';
    const post = await Post.find({}).populate("user").exec();

    res.render("home", {
      title: `${username} | Home`,
      posts: post,
    });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};
