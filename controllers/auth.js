import User from "../modals/User.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

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
  const user = new User(req.body);
  try {
    await user.save();

    return res.json({ ok: true });
  } catch (error) {
    console.log("User creation failed", error);
    return res.status(400).json({ err: "Some error ocuured ! Try again" });
  }
});

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
