const { Schema, model } = require("mongoose");

const ImageSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    fileId: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Images = model("images", ImageSchema);

module.exports = Images;
