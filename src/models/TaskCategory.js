const { Schema, model, Types } = require("mongoose");

const TakCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    trim: true,
  },
  project: {
    type: Types.ObjectId,
    ref: "projects",
  },
  user: {
    type: Types.ObjectId,
    ref: "users",
  },
  tasks: [{
    type: Types.ObjectId,
    ref: "tasks",
  }]
});

const TaskCategory = model("TaskCategory", TakCategorySchema);

module.exports = TaskCategory;
