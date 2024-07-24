const Images = require("../models/Image");

exports.getAll = async (req, res) => {
  try {
    const images = await Images.find();
    return res.json({
      data: images,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error!",
      error: err.message,
    });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const images = req.images;
    if (images.length == 0) {
      return res.status(400).json({
        message: "Eng kamida 1 ta surat bo'lishi kerak!",
      });
    }
    const newImage = new Images({
      images: req.images,
    });
    await newImage.save();
    return res.json({
      id: newImage._doc._id
    })
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error!",
      error: err.message,
    });
  }
};

exports.editImage = async (req, res) => {
  try {
    const images = req.images;
    if (images.length == 0) {
      return res.status(400).json({
        message: "Eng kamida 1 ta surat bo'lishi kerak!",
      });
    }
    const findImage = await Images.findById(req.params.id);
    if (!findImage) {
      return res.status(404).json({
        message: "Image Not Found!",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error!",
      error: err.message,
    });
  }
};
