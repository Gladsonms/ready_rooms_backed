import User from "../modals/User.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

// @desc   user register
// @route POST /auth/userregister
// @access Private
export const userSignup = asyncHandler(async (req, res) => {
  const { username, email, phone, password } = req.body;

  //valiadtion in backend
  if (!username) {
    res.status(400);
    throw new Error("Name is required");
  }
  if (!password || !password > 6) {
    res.status(400);
    throw new Error("Password is required and must be 6 length");
  }
  if (!phone) {
    res.status(400);
    throw new Error("Phone number is required");
  }
  let userExist = await User.findOne({ email }).exec();
  //if (userExist)  res.status(400).json({ err: "Email is taken" });
  if (userExist) {
    res.status(400);
    throw new Error("Email alredy exist!");
  }

  //register
  const user = await User.create({
    accountType: "customer",
    username,
    email,
    phone,
    password,
  });
});

// @desc   user login
// @route POST /auth/userlogin
// @access Private
export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }
  if (!password) {
    res.status(400);
    throw new Error("Password is required");
  }
  let user = await User.findOne({ email }).exec();
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  if (!(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("Password is incorrect");
  }
  //jwt login
  let token = jwt.sign({ _id: user._id }, process.env.JWT_SECERT, {
    expiresIn: "7d",
  });
  res.json({
    token,
    user: {
      _id: user._id,
      name: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
});

// @desc   owener register
// @route POST /auth/ownersignup
// @access Public

export const ownerSignup = asyncHandler(async (req, res) => {
  const { username, password, confirmPassword, email, phone, place } = req.body;

  if (!username) {
    res.status(400);
    throw new Error("username is required");
  }
  if (!email) {
    res.status(400);
    throw new Error("email is required");
  }
  if (!password || !password > 6) {
    res.status(400);
    throw new Error("password is required and must be 6 length");
  }
  if (!confirmPassword || !confirmPassword > 6) {
    res.status(400);
    throw new Error("confirm password is required and must be 6 length");
  }
  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("password and confirm password must be same");
  }
  if (!phone) {
    res.status(400);
    throw new Error("phone is required");
  }

  if (!place) {
    res.status(400);
    throw new Error("place is required");
  }
  let userExist = await User.findOne({ email }).exec();
  if (userExist) {
    res.status(400);
    throw new Error("Email alredy exist!");
  }
  const user = await User.create({
    accountType: "owner",
    username,
    email,
    password,
    phone,
    place,
  });
});

// @desc   owener login
// @route POST /auth/ownersigin
// @access Public

export const ownerLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("email is required");
  }
  if (!password) {
    res.status(400);
    throw new Error("password is required");
  }
  let user = await User.findOne({ email }).exec();
  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }
  if (!(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("password is incorrect");
  }
  //jwt login
  let token = jwt.sign({ _id: user._id }, process.env.JWT_SECERT, {
    expiresIn: "7d",
  });
  res.json({
    token,

    user: {
      _id: user._id,
      name: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
});
