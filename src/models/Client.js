const { Schema, model, Types } = require("mongoose");

const ClientSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    balance: {
      type: Number,
      default: 0
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      required: [true, "Client email required"],
    },
    address: {
      type: String,
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    inn: {
      type: String,
      trim: true,
    },
    bankAccount: {
      type: Number,
      trim: true,
    },
    status: {
      type: Number,
      default: 1
    },
    notes: [
      {
        type: Types.ObjectId,
        ref: "note"
      },
    ],
    projects: [
      {
        type: Types.ObjectId,
        ref: "projects"
      }
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Clients = model("clients", ClientSchema);

module.exports = Clients;
