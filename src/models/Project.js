const { Schema, model, Types } = require("mongoose");

const projectSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  client: {
    type: Types.ObjectId,
    ref: "clients",
  },
  status: {
    type: Number,
    enum : [1, 2, 3, 4],
    default: 1,
  },
  priority: {
    type: Number,
    enum : [1, 2, 3],
    default: 2,
  },
  startDate: {
    type: Number,
  },
  endDate: {
    type: Number,
  },
  workDays: {
    type: Number,
  },
  price: {
    type: Number,
    min: 0,
    default: 0,
  },
  paid: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: Types.ObjectId,
    ref: "users",
  },
  members: [
    {
      type: Types.ObjectId,
      ref: "users",
    },
  ],
  tasks: [
    {
      type: Types.ObjectId,
      ref: "tasks",
    },
  ],
  links: [
    {
      name: String,
      link: String,
    }
  ],
  costs: [
    {
      type: Types.ObjectId,
      ref: "costs",
    }
  ]
});

const Project = model("Project", projectSchema);

module.exports = Project;
