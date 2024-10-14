const Role = require("../../models/Role");
const { pagination } = require("../../utils");
const { addRoleSchema, updateRoleSchema } = require("./schemas");

exports.getAll = async (req, res) => {
  try {
    if (!req.query.filter) req.query.filter = {};
    req.query.filter.deleted = false;
    const data = await pagination(Role, req.query, "roles");
    return res.json(data);
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error!",
      error: err.message,
    });
  }
};

exports.addRole = async (req, res) => {
  try {
    const { error } = addRoleSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newRole = await Role.create({
      ...req.body,
    });
    return res.json({
      newRole,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error",
      error: err.message,
    });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { error } = updateRoleSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const findRole = await Role.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );
    if (!findRole) {
      return res.status(404).json({
        message: "Role not found!",
      });
    }
    return res.json({
      data: findRole,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error",
      error: err.message,
    });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const findRole = await Role.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
        deletedAt: moment().unix(),
      },
      {
        new: true,
      }
    );

    if (!findRole) {
      return res.status(404).json({
        message: "Role not found!",
      });
    }
    return res.json({
      message: "Role deleted!",
    });
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error.",
      error: err.message,
    });
  }
};
