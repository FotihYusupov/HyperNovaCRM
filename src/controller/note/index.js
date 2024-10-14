const moment = require("moment");
const Note = require("../../models/Note");
const Client = require("../../models/Client");
const { pagination } = require("../../utils");
const { addNoteSchema, updateNoteSchema } = require("./schema");

exports.getAllNotes = async (req, res) => {
  try {
    const data = await pagination(Note, req.query, "notes", 'client');
    return res.json(data);
  } catch (err) {
    return res.status(400).json({
      message: "Internal server error!",
      error: err.message,
    });
  }
};

exports.addNote = async (req, res) => {
  try {
    const { error } = addNoteSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newNote = new Note({
      ...req.body,
      createdBy: req.headers.userId,
    });

    const findClient = await Client.findByIdAndUpdate(
      req.body.client,
      { $push: { notes: newNote._id } },
      { new: true }
    );
    
    if (!findClient) {
      return res.status(404).json({
        message: "Client not found!",
      });
    }

    await newNote.save();

    return res.json({
      data: newNote,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Internal server error!",
      error: err.message,
    });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { error } = updateNoteSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found!",
      });
    }

    return res.json({
      data: updatedNote,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Internal server error!",
      error: err.message,
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
        deletedAt: moment().unix(),
      },
      {
        new: true,
      }
    );

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found!",
      });
    }

    const findClient = await Client.findByIdAndUpdate(
      deletedNote.client,
      { $pull: { notes: req.params.id } },
      { new: true }
    );

    if (!findClient) {
      return res.status(404).json({
        message: "Client not found!",
      });
    }

    return res.json({
      data: "Note deleted!",
    });
  } catch (err) {
    return res.status(400).json({
      message: "Internal server error!",
      error: err.message,
    });
  }
};
