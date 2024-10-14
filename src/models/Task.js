const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: Number,
    enum: [1, 2, 3, 4], // 1: To Do, 2: In Progress, 3: Completed, 4: Archived
    default: 1,
  },
  priority: {
    type: Number,
    enum: [1, 2, 3], // 1: High, 2: Medium, 3: Low
    default: 2,
  },
  assignee: {
    type: Types.ObjectId,
    ref: "users", // Reference to the assigned user
  },
  dueDate: {
    type: Number, // Unix timestamp
  },
  project: {
    type: Types.ObjectId,
    ref: "projects",
    required: true,
  },
  createdBy: {
    type: Types.ObjectId,
    ref: "users",
    required: true,
  },
  category: {
    type: Types.ObjectId,
    ref: "TaskCategory",
  },
  subtasks: [
    {
      title: String,
      completed: {
        type: Boolean,
        default: false,
      },
    }
  ],
  comments: [
    {
      author: {
        type: Types.ObjectId,
        ref: "users",
      },
      content: {
        type: String,
        trim: true,
      },
      createdAt: {
        type: Number,
        default: moment().unix(),
      },
    }
  ]
});

const Task = model("Task", taskSchema);

module.exports = Task;
