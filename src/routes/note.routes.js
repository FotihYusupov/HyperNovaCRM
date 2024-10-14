const { Router } = require("express");
const noteController = require("../controller/note");

const noteRoutes = Router();

noteRoutes.get("/", noteController.getAllNotes);

noteRoutes.post("/", noteController.addNote);

noteRoutes.put("/:id", noteController.updateNote);

noteRoutes.delete("/:id", noteController.deleteNote);

module.exports = noteRoutes;
