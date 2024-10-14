const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      required: [true, "User email required"],
    },
    phoneNumber: {
      type: String,
    },
    passportSeries: {
      type: String,
    },
    cardNumber: {
      type: Number,
    },
    address: {
      type: String,
    },
    login: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      default: 0,
    },
    gender: {
      type: Number,
    },
    dateBirth: {
      type: Number,
    },
    bot: {
      type: Number,
      default: 2,
    },
    username: {
      type: String,
    },
    role: {
      type: Types.ObjectId,
      ref: "role",
      required: true,
    },
    active: {
      type: Number,
      default: 1,
    },
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

const Users = model("User", UserSchema);

module.exports = Users;
