const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [{
      type: mongoose.Types.ObjectId,
      ref: "image"
    }],
    views: {
      type: Number,
      default: 1
    },
  },
  { timestamps: true }
);

const Blogs = mongoose.model("blog", blogSchema);

module.exports = Blogs;
