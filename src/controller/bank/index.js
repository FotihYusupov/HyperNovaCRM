const moment = require("moment");
const Bank = require("../../models/Bank");
const { pagination } = require("../../utils");
const { addBankSchema, updateBankSchema } = require("./schema");

exports.getAll = async (req, res) => {
  try {
    const data = await pagination(Bank, req.query, "banks");
    return res.json(data);
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error!",
      error: err.message,
    });
  }
};

exports.addBank = async (req, res) => {
  try {
    const { error } = addBankSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newBank = new Bank({
      ...req.body,
    });

    await newBank.save();

    return res.json({
      data: newBank,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error!",
      error: err.message,
    });
  }
};

exports.updateBank = async (req, res) => {
  try {
    const { error } = updateBankSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedBank = await Bank.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedBank) {
      return res.status(404).json({
        message: "Bank not found!",
      });
    }
    return res.json({
      data: updatedBank,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error!",
      error: err.message,
    });
  }
};

exports.deleteBank = async (req, res) => {
  try {
    const updatedBank = await Bank.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
        deletedAt: moment().unix(),
      },
      {
        new: true,
      }
    );

    if (!updatedBank) {
      return res.status(404).json({
        message: "Bank not found!",
      });
    }

    return res.json({
      message: "Bank deleted!"
    })
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error!",
      error: err.message,
    });
  }
};
