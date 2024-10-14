const { Router } = require("express");

const userRoutes = require("./user.routes");
const roleRoutes = require("./role.routes");
const bankRoutes = require("./bank.routes");
const cardRoutes = require("./card.routes");
const noteRoutes = require("./note.routes");
const imageRoutes = require("./image.routes");
const clientRoutes = require("./client.routes")
const salaryRoutes = require("./salary.routes");
const attendanceRoutes = require("./attendance.routes");
const translationRoutes = require("./translation.routes");

const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.use("/images", imageRoutes);
router.use("/translations", translationRoutes);
router.use("/roles", authMiddleware, roleRoutes);
router.use("/users", authMiddleware, userRoutes);
router.use("/banks", authMiddleware, bankRoutes);
router.use("/cards", authMiddleware, cardRoutes);
router.use("/notes", authMiddleware, noteRoutes);
router.use("/salary", authMiddleware, salaryRoutes);
router.use("/clients", authMiddleware, clientRoutes)
router.use("/attendance", authMiddleware, attendanceRoutes);

module.exports = router;
