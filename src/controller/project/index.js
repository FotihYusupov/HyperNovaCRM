const moment = require("moment");
const Project = require("../../models/Project");
const { pagination } = require("../../utils");
const { addProjectSchema, updateProjectSchema } = require("./schema");

exports.getAllProjects = async (req, res) => {
  try {
    const data = await pagination(Project, req.query, "projects", "members", "tasks", "createdBy", "costs", "client");
    return res.json(data);
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      error: err.message,
    });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("members", "tasks", "createdBy", "costs", "client");

    if (!project || project.deleted === true) {
      return res.status(404).json({
        message: "Project not found!",
      });
    }

    return res.json({
      data: project,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      error: err.message,
    });
  }
};

exports.addProject = async (req, res) => {
  try {
    const { error } = addProjectSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newProject = new Project({
      ...req.body,
    });
    await newProject.save();

    

    return res.json({
      message: "Project created successfully!",
      data: newProject,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      error: err.message,
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { error } = updateProjectSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedProject) {
      return res.status(404).json({
        message: "Project not found!",
      });
    }

    return res.json({
      message: "Project updated successfully!",
      data: updatedProject,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      error: err.message,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
        deletedAt: moment().unix(),
      },
      {
        new: true,
      }
    );

    if (!deletedProject) {
      return res.status(404).json({
        message: "Project not found!",
      });
    }

    return res.json({
      message: "Project deleted successfully!",
      data: deletedProject,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      error: err.message,
    });
  }
};
