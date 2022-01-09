import User from "../modals/User.js";
import asyncHandler from "express-async-handler";

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
