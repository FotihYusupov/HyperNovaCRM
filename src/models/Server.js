const { Schema, model } = require("mongoose");

const serverSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  expireDate: {
    type: Number
  }
});

const Server = model("Servers", serverSchema);

module.exports = Server;
