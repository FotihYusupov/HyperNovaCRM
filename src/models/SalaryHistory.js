const { Schema, model, Types } = require("mongoose");

const SalaryHistorySchema = new Schema(
  {
    amount: {
      type: Number,
      required: true
    },
    paidDate: {
      type: Number,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
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

const SalaryHistory = model("salaryHistory", SalaryHistorySchema);

module.exports = SalaryHistory;
