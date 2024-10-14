const { Router } = require("express");
const imageController = require("../controller/image.controller");
const imageRoutes = Router();

imageRoutes.get("/upload", imageController.getAll);
imageRoutes.post("/upload", imageController.uploadImage);

module.exports = imageRoutes;
