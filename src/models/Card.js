const { Schema, model } = require("mongoose");

const CardSchema = new Schema(
  {
    cardName: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: Number,
    },
    balance: {
      type: Number,
      default: 0,
    },
    expiryDate: {
      type: Number,
      required: true
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

const Card = model("card", CardSchema);

module.exports = Card;
