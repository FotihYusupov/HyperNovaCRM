const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Images = require("../models/Image");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

exports.getAll = async (req, res) => {
  try {
    const images = await Images.find();
    return res.json({
      data: images,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Internal server error!",
      error: err.message,
    });
  }
};

exports.uploadImage = [
  upload.single("images"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "At least one image is required!",
        });
      }
      const newImage = new Images({
        filename: req.file.filename,
        fileId: uuidv4(),
        fileUrl: `${process.env.SERVER_URL}/uploads/${req.file.filename}`,
      });
      const savedImage = await newImage.save();
      return res.status(201).json({
        message: "File uploaded",
        status: 200,
        data: {
          fileName: req.file.filename,
          fileId: savedImage.fileId,
          fileUrl: `${process.env.SERVER_URL}/uploads/${req.file.filename}`,
        },
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal server error!",
        error: err.message,
      });
    }
  },
];
