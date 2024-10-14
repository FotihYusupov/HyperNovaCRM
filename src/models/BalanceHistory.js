const { Schema, model, Types } = require("mongoose");

const BalanceHistorySchema = new Schema(
  {
    balance: {
      type: Types.ObjectId,
      refPath: "balanceModel"
    },
    balanceModel: {
      type: String,
      enum: ['cards', 'banks', 'cash']
    },
    balanceType: {
      type: Number,
    },
    amount: {
      type: Number
    },
    commission: {
      type: Number,
    },
    user: {
      type: Types.ObjectId,
      ref: "user"
    },
    comment: {
      type: String,
    },
    UserCreatedDate: {
      type: Number,
    },
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Number,
    }
  },
  { timestamps: true, versionKey: false }
);

const BalanceHistory = model("balanceHistory", BalanceHistorySchema);

module.exports = BalanceHistory;
