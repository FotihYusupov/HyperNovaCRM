const { Router } = require("express");
const bankController = require("../controller/bank");

const bankRoutes = Router();

bankRoutes.get("/", bankController.getAll);

bankRoutes.post("/", bankController.addBank);

bankRoutes.put("/:id", bankController.updateBank);

bankRoutes.delete("/:id", bankController.deleteBank);

module.exports = bankRoutes;
