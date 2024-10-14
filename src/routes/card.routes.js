const { Router } = require("express");
const cardController = require("../controller/card");

const cardRoutes = Router();

cardRoutes.get("/", cardController.getAll);

cardRoutes.post("/", cardController.addCard);

cardRoutes.put("/:id", cardController.updateCard);

cardRoutes.delete("/:id", cardController.deleteCard);

module.exports = cardRoutes;
