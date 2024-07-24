const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const imageController = require("../controller/image.controller");
const uploadMiddleware = require("../middlewares/upload.middleware");

const imageRoutes = Router();

imageRoutes.get("/", authMiddleware, imageController.getAll);
imageRoutes.post("/", authMiddleware, uploadMiddleware, imageController.uploadImage);
imageRoutes.put("/:id", authMiddleware, uploadMiddleware, imageController.editImage);

module.exports = imageRoutes;