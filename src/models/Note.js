const moment = require("moment")
const { Schema, model, Types } = require("mongoose");

const NoteSchema = new Schema(
  {
    client: {
      type: Types.ObjectId,
      ref: "clients",
    },
    content: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "users",
    },
    important: {
      type: Boolean,
      default: false,
    },
    deadline: {
      type: Number,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Note = model("note", NoteSchema);

module.exports = Note;
