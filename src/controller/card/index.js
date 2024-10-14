const moment = require("moment");
const Card = require("../../models/Card");
const { pagination } = require("../../utils");
const { addCardSchema, updateCardSchema } = require("./schema");

exports.getAll = async (req, res) => {
  try {
    const data = await pagination(Card, req.query, "cards");
    return res.json(data);
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error!",
      error: err.message,
    });
  }
};

exports.addCard = async (req, res) => {
  try {
    const { error } = addCardSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newCard = new Card({
      ...req.body,
    });
    await newCard.save();

    return res.json({
      data: newCard,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error!",
      error: err.message,
    });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const { error } = updateCardSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedCard = await Card.findById(
      req.params.id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedCard) {
      return res.status(404).json({
        message: "Card not found!",
      });
    }

    return res.json({
      data: updatedCard,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error!",
      error: err.message,
    });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
        deletedAt: moment().unix(),
      },
      {
        new: true,
      }
    );
    
    if (!updatedCard) {
      return res.status(404).json({
        message: "Card not found!",
      });
    }

    return res.json({
      data: "Card deleted!",
    });
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error!",
      error: err.message,
    });
  }
};
