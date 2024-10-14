const { Router } = require("express");
const clientController = require("../controller/client");

const clientRoutes = Router();

clientRoutes.get("/", clientController.getAllClients);
clientRoutes.get("/:id", clientController.getClientById);

clientRoutes.post("/", clientController.addClient);

clientRoutes.put("/:id", clientController.updateClient);

clientRoutes.delete("/:id", clientController.deleteClient);

module.exports = clientRoutes;
