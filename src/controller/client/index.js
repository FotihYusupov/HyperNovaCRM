const moment = require("moment");
const Client = require("../../models/Client");
const { pagination } = require("../../utils");
const { addClientSchema, updateClientSchema } = require("./schema");

exports.getAllClients = async (req, res) => {
  try {
    const data = await pagination(Client, req.query, "clients", "notes", "projects");
    return res.json(data);
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      error: err.message,
    });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate("notes", "projects");

    if (!client || client.deleted === true) {
      return res.status(404).json({
        message: "Client not found!",
      });
    }

    return res.json({
      data: client
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      error: err.message,
    });
  }
};

exports.addClient = async (req, res) => {
  try {
    const { error } = addClientSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newClient = new Client({
      ...req.body,
    });
    await newClient.save();

    return res.status(201).json({
      message: "Client created successfully!",
      data: newClient,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      error: err.message,
    });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { error } = updateClientSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedClient) {
      return res.status(404).json({
        message: "Client not found!",
      });
    }

    return res.json({
      message: "Client updated successfully!",
      data: updatedClient,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      error: err.message,
    });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
        deletedAt: moment().unix(),
      },
      {
        new: true,
      }
    );

    if (!deletedClient) {
      return res.status(404).json({
        message: "Client not found!",
      });
    }

    return res.json({
      message: "Client deleted successfully!",
      data: deletedClient,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      error: err.message,
    });
  }
};
