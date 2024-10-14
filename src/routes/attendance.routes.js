const { Router } = require("express");
const attendanceController = require("../controller/attendance");
const attendanceRoutes = Router();

attendanceRoutes.get("/", attendanceController.getAll);
attendanceRoutes.post("/income", attendanceController.userIncome);
attendanceRoutes.post("/outcome", attendanceController.userOutcome);
attendanceRoutes.put("/:id", attendanceController.updateAttendance);
attendanceRoutes.delete("/:id", attendanceController.deleteAttendance);

module.exports = attendanceRoutes;
