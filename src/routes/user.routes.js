const { Router } = require("express");
const userController = require("../controller/user");
const userRoutes = Router();

userRoutes.get("/", userController.getAll);
userRoutes.get("/get-me", userController.getMe);

userRoutes.post("/", userController.addUser);
userRoutes.post("/login", userController.login);

userRoutes.put("/:id", userController.updateUser);

userRoutes.delete("/:id", userController.deleteUser);

module.exports = userRoutes;