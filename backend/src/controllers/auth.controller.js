import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import { generateToken } from "../lib/utils.js";
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "All fields are required", status: false });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ error: "User already exists", status: false });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ name, email, password: hashPassword });

    if (newUser) {
      // generate a token
      generateToken(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        message: "User created",
        status: true,
      });
    } else {
      return res.status(400).json({ error: "User not created", status: false });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res
      .status(500)
      .json({
        error: error.message,
        status: false,
        message: "Internal Server Error",
      });
  }
};
export const login = (req, res) => {
  res.send("signup");
};
export const logout = (req, res) => {
  res.send("signup");
};
