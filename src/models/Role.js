const { Schema, model } = require("mongoose");

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    access: {
      type: Array,
      required: true
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

const Roles = model("role", RoleSchema);

module.exports = Roles;
