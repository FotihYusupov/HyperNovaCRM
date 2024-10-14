const { Router } = require("express");
const cashController = require("../controller/cash");

const cashRoutes = Router();

cashRoutes.get("/", cashController.getAll);

cashRoutes.post("/", cashController.addCash);

cashRoutes.put("/:id", cashController.updateCash);

cashRoutes.delete("/:id", cashController.deleteCash);

module.exports = cashRoutes;
