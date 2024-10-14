const { Router } = require("express");
const roleController = require("../controller/role");
const roleRoutes = Router();

roleRoutes.get("/", roleController.getAll);

roleRoutes.post("/", roleController.addRole);

roleRoutes.put("/:id", roleController.updateRole);

roleRoutes.delete("/:id", roleController.deleteRole);

module.exports = roleRoutes;
