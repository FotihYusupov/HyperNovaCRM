const { Schema, model } = require("mongoose");

const BankSchema = new Schema(
  {
    bankName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: Number,
    },
    balance: {
      type: Number,
      default: 0,
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

const Bank = model("bank", BankSchema);

module.exports = Bank;
