const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  authorName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model("Post", PostSchema);
