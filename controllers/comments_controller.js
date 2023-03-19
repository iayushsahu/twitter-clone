const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req, res) => {
  try {
    const post = await Post.findById(req.body.post);
    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      await post.save();
      return res.redirect("/");
    } else {
      return res.redirect("/");
    }
  } catch (error) {
    console.log(`error in creating a comment ${error}`);
    return res.redirect("/");
  }
};

module.exports.destroy = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).exec();
    if (comment.user == req.user.id) {
      const postId = comment.post;
      await comment.deleteOne();
      await Post.findByIdAndUpdate(postId, {
        $pull: { comment: req.params.id },
      })
        .then(() => {
          res.redirect("back");
        })
        .catch((err) => {
          console.error(err);
          res.redirect("back");
        });
    } else {
      res.redirect("back");
    }
  } catch (err) {
    console.error(err);
    res.redirect("back");
  }
};
