const { Router } = require("express");
const salaryController = require("../controller/salary");
const salaryRoutes = Router();

salaryRoutes.get("/", salaryController.getAll);
salaryRoutes.post("/pay", salaryController.paySalary);

module.exports = salaryRoutes;
