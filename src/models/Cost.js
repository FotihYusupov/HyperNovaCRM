const { Schema, model, Types } = require("mongoose");

const costSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  project: {
    type: Types.ObjectId,
    ref: "projects",
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Number
  }
});

const Cost = model("Cost", costSchema);

module.exports = Cost;
