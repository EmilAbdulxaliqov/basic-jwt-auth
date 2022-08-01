const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

router.get("/", (req, res) => {
  Post.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.json(err.message));
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.json(err.message));
});

router.post("/", (req, res) => {
  const { title, description, authorName } = req.body;
  const post = new Post({
    title,
    description,
    authorName,
    user: req.userId,
  });
  post.save();
  res.json(post);
});

router.put("/:id", (req, res) => {
  Post.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    authorName: req.body.authorName,
    user: req.userId,
  })
    .then((product) => res.json(product))
    .catch((err) => res.json(err.message));
});

// router.patch("/:id", (req, res) => {
//   Post.findOneAndReplace();
// });

router.delete("/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.json(err.message));
});

module.exports = router;
