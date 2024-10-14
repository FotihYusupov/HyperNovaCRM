const bcrypt = require("bcrypt");
const moment = require("moment");
const Users = require("../../models/User");
const { pagination, sign } = require("../../utils");
const { addUserSchema, updateUserSchema, userLoginSchema } = require("./schemas");

exports.getAll = async (req, res) => {
  try {
    if(!req.query.filter) req.query.filter = {}
    req.query.filter.deleted = false
    const data = await pagination(Users, req.query, 'users', 'role');
    return res.json(data);
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error!",
      error: err.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const findUser = await Users.findById(req.headers.userId).populate('role');

    if (!findUser) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    delete findUser.password;

    return res.json({
      token: sign(findUser._id.toString()),
      data: findUser,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Interval server error!",
      error: err.message,
    });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { error } = addUserSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { password, login, ...userData } = req.body;

    const existingUser = await Users.findOne({ login });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this login already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      login,
      password: hashedPassword,
      ...userData,
    });

    await newUser.save();
    await newUser.populate('role')

    return res.status(201).json({
      data: newUser,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { error } = userLoginSchema.validate(req.body);

    if(error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { login, password } = req.body;

    const user = await Users.findOne({ login }).populate('role');
    if (!user) {
      return res.status(400).json({ message: "Invalid login or password" });
    }

    if (user.active === 2 || user.deleted) {
      return res.status(400).json({ message: "User Not Found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid login or password" });
    }

    const token = sign(user._id.toString());

    const userResponse = user.toObject();
    delete userResponse.password;

    await userResponse;

    return res.status(200).json({
      token,
      data: userResponse,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { error } = updateUserSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { id } = req.params;
    const { password, ...updateData } = req.body;

    const user = await Users.findById(id).populate('role');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    Object.assign(user, updateData);

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.json({
      message: "User updated successfully",
      data: userResponse,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const findUser = await Users.findById(req.params.id);
    if (!findUser) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    findUser.deleted = true;
    findUser.deletedAt = moment().unix();
    await findUser.save();
    return res.json({
      message: "User deleted!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};
