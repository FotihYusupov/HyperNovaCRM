const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  images: {
    type: Array
  }
});

const Images = mongoose.model("image", ImageSchema);

module.exports = Images;