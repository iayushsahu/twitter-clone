const Post = require("../models/post");
const Comment = require("../models/comment");

// module.exports.create = (req, res) => {
//   Post.findById(req.body.post, (err, post) => {
//     if (post) {
//       Comment.create(
//         {
//           content: req.body.content,
//           post: req.body.post,
//           user: req.user._id,
//         },
//         (err, comment) => {
//           if (err) {
//             console.log(`error in creating a comment ${err}`);
//             return;
//           }
//           post.comments.push(comment);
//           post.save();

//           res.redirect("/");
//         }
//       );
//     }
//   });
// };

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
