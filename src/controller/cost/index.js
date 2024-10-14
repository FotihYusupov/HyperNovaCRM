const Cost = require('../../models/Cost');
const { addCostSchema, updateCostSchema } = require('./schema');
const { pagination } = require('../../utils');
const moment = require('moment');

exports.getAllCosts = async (req, res) => {
  try {
      const data = await pagination(Cost, req.query, "costs", "project");
      return res.json(data);
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      error: err.message,
    });
  }
};

exports.addCost = async (req, res) => {
  try {
    const { error } = addCostSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newCost = new Cost({
      ...req.body,
    });

    await newCost.save();

    return res.status(201).json({
      message: "Cost added successfully!",
      data: newCost,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      error: err.message,
    });
  }
};

exports.updateCost = async (req, res) => {
  try {
    const { error } = updateCostSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedCost = await Cost.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedCost) {
      return res.status(404).json({
        message: "Cost not found!",
      });
    }

    return res.json({
      message: "Cost updated successfully!",
      data: updatedCost,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      error: err.message,
    });
  }
};

exports.deleteCost = async (req, res) => {
  try {
    const deletedCost = await Cost.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
        deletedAt: moment().unix(),
      },
      {
        new: true,
      }
    );

    if (!deletedCost) {
      return res.status(404).json({
        message: "Cost not found!",
      });
    }

    return res.json({
      message: "Cost deleted successfully!",
      data: deletedCost,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      error: err.message,
    });
  }
};
