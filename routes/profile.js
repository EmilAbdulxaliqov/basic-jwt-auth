const express = require("express");
const User = require("../models/User");
const Post = require("../models/Post");
const router = express.Router();

router.get("/", (req, res) => {
  User.findById(req.userId).then((user) => {
    console.log(user);
    res.send(`Welcome ${user.email}`);
  });
});

router.get("/posts", (req, res) => {
  Post.find({ user: req.userId }).then((posts) => {
    console.log(posts);
    res.send(`Profile: ${posts}`);
  });
});

router.put("/change", (req, res) => {
  res.send("Change page");
});

module.exports = router;
