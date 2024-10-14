const { Schema, model, Types } = require("mongoose");

const SalarySchema = new Schema(
  {
    month: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true
    },
    paid: {
      type: Boolean,
      default: false,
    },
    paidDate: {
      type: Number,
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
    }
  },
  { timestamps: true, versionKey: false }
);

const Salary = model("salary", SalarySchema);

module.exports = Salary;
