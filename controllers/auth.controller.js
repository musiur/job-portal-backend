const UserModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../configs/configs");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking if user already exists or not
    const existingUser = await UserModel.find({ email });
    if (existingUser.length) {
      return res.status(409).send({
        message: "User exists with this email!",
      });
    }

    // hashing password
    const HashedPassword = await bcrypt.hash(password, 10);

    // creating new user
    const NewUser = await UserModel.create({
      name,
      email,
      password: HashedPassword,
    });

    // sending error message if found error while creating account in DB
    if (!NewUser) {
      return res.status(500).send({
        message: "Internal server error!",
      });
    }
    // // creating token
    const token = JWT.sign({ _id: NewUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    // Response on success
    res
      .status(200)
      .send({
        message: "Registration successful",
        token
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error!",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.find({ email });
    if (!existingUser.length) {
      return res.status(404).send({
        message: "User not found!",
      });
    }

    const SecuredPassword = existingUser[0].password;
    const isPasswordValid = await bcrypt.compare(password, SecuredPassword);

    if (!isPasswordValid) {
      return res.status(401).send({
        message: "Wrong password!",
      });
    }

    // // creating token
    const token = JWT.sign({ _id: existingUser[0]._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .send({
        message: "Login successful",
        token
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error!",
    });
  }
};
