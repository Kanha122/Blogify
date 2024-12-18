const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/islogin");
const postModel = require("../models/postModel");
const { uploads } = require("../config/multer-config");
const commentModel = require("../models/commentModel");

router.get("/addblog", isLoggedIn, function (req, res) {
  res.render("addblog", { user: req.user });
});

router.get("/myblogs", isLoggedIn, async function (req, res) {
  let posts = await postModel.find({ createdById: req.user._id });
  res.render("myblogs", { user: req.user, posts });
});

router.post(
  "/createPost",
  uploads.single("postImage"),
  isLoggedIn,
  async function (req, res) {
    let { title, description, meaning } = req.body;
    let post = await postModel.create({
      title,
      description,
      meaning,
      createdById: req.user._id,
      postImage: `/uploads/${req.file.filename}`,
    });

    return res.redirect(`/post/${post._id}`);
  }
);

router.get("/:id", isLoggedIn, async function (req, res) {
  const blog = await postModel
    .findOne({ _id: req.params.id })
    .populate("createdById");
  const comments = await commentModel
    .find({ postId: req.params.id })
    .populate("createdById");
  return res.render("blog", { user: req.user, blog, comments });
});

router.get("/delete/:id", isLoggedIn, async function (req, res) {
  const user = await commentModel.findOneAndDelete({ _id: req.params.id });
  res.redirect(`/post/${user.postId}`);
});

router.post("/comment/:id", isLoggedIn, async function (req, res) {
  let { comment } = req.body;

  const comments = await commentModel.create({
    comment,
    createdById: req.user._id,
    postId: req.params.id,
  });

  res.status(200).redirect(`/post/${req.params.id}`);
});

router.get("/deletePost/:id", async function (req, res) {
  const post = await postModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/post/myblogs");
});

router.get("/edit/:id", isLoggedIn, async function (req, res) {
  const post = await postModel.findOne({ _id: req.params.id });
  res.render("editblog", { user: req.user, post });
});

router.post(
  "/update/:id",
  uploads.single("postImage"),
  async function (req, res) {
    let { title, meaning, description } = req.body;
    const postImage = '/uploads/'+ req.file.filename;

    let updatedPost = await postModel.findOneAndUpdate(
      { _id: req.params.id },
      { title, meaning, description, postImage },
      { new: true, runValidators: true }
    );
    res.redirect(`/post/${req.params.id}`);
  }
);

module.exports = router;
