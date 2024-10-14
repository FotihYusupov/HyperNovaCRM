const moment = require("moment");
const Attendance = require("../../models/Attendance");
const { pagination } = require("../../utils");
const { addAttendanceSchema, updateAttendanceSchema } = require("./schemas");

exports.getAll = async (req, res) => {
  try {
    const data = await pagination(Attendance, req.query, "attendance", "user");
    return res.json(data);
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error!",
      error: err.message,
    });
  }
};

exports.userIncome = async (req, res) => {
  try {
    const { error } = addAttendanceSchema.validate(req.body);

    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const newAttendance = await Attendance.create({
      user: req.body.user,
      date: req.body.date || Math.floor(moment().startOf("date").valueOf() / 1000),
      clockIn: req.body.time,
    });
    return res.json({
      data: newAttendance,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error!",
      error: err.message,
    });
  }
};

exports.userOutcome = async (req, res) => {
  try {
    const { error } = addAttendanceSchema.validate(req.body);

    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const currentDate = req.body.date || Math.floor(moment().startOf("date").valueOf() / 1000);

    const findAttendance = await Attendance.findOne({ date: currentDate });
    if (!findAttendance) {
      const newAttendance = await Attendance.create({
        user: req.body.user,
        date: currentDate,
        clockOut: req.body.time,
      });
      return res.json({
        data: newAttendance,
      });
    }

    findAttendance.clockOut = req.body.time;
    await findAttendance.save();

    return res.json({
      data: findAttendance,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error!",
      error: err.message,
    });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const { error } = updateAttendanceSchema.validate(req.body);

    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const findAttendance = await Attendance.findById(req.params.id);

    if (!findAttendance) {
      return res.status(404).json({
        message: "Attendance not found!",
      });
    }

    Object.assign(findAttendance, req.body);
    await findAttendance.save();

    return res.json({
      data: findAttendance,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error!",
      error: err.message,
    });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const findAttendance = await Attendance.findById(req.params.id);

    if (!findAttendance) {
      return res.status(404).json({
        message: "Attendance not found!",
      });
    }

    findAttendance.deleted = true;
    findAttendance.deletedAt = moment().unix();
    await findAttendance.save();

    return res.json({
      message: "Attendance deleted!",
    });
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error",
      error: err.message,
    });
  }
};
