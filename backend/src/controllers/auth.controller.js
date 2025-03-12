import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
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
        message: "User created successfully",
        status: true,
      });
    } else {
      return res.status(400).json({ error: "User not created", status: false });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({
      error: error.message,
      status: false,
      message: "Internal Server Error",
    });
  }
};
// login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid credentials", status: false });
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "Invalid credentials", status: false });
    }

    // generate a token
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      message: "User logged in",
      status: true,
    });
  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({
      error: error.message,
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "User logged out", status: true });
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({
      error: error.message,
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { avatar } = req.body;
    const userId = req.user._id;
    if (!avatar) {
      return res.status(400).json({ error: "Avatar is required" });
    }
    const response = await cloudinary.uploader.upload(avatar);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: response.secure_url },
      { new: true }
    );
    res.status(200).json({
      updatedUser,
      message: "User profile updated",
      status: true,
    });
  } catch (error) {
    console.log("error in updateProfile controller", error.message);
    res.status(500).json({
      error: error.message,
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("error in checkAuth controller", error.message);
    res.status(500).json({
      error: error.message,
      status: false,
      message: "Internal Server Error",
    });
  }
}