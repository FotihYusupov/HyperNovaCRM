const { Schema, model, Types } = require("mongoose");

const AttendanceSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "user",
    },
    date: {
      type: Number,
      required: true,
    },
    clockIn: {
      type: String,
    },
    clockOut: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Number,
    },
  },
  { timestamps: true, versionKey: false }
);

const Attendance = model("attendance", AttendanceSchema);

module.exports = Attendance;
