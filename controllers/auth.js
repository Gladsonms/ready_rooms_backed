const User = require("../modals/User");
const userSignup = async (req, res) => {
  const { username, email, phone, password } = req.body;

  //valiadtion in backend
  if (!username) return res.status(400).json({ err: "Name is required" });
  if (!password || !password > 6)
    return res
      .status(400)
      .jsom({ err: "Password is required and must be 6 characters long" });
  if (!phone)
    return res
      .status(400)
      .json({ err: "Phone number is required and must be 10 characters long" });
  let userExist = await User.findOne({ email }).exec();
  if (userExist) return res.status(400).json({ err: "Email is taken" });

  //register
  const user = new User(req.body);
  try {
    await user.save();

    return res.json({ ok: true });
  } catch (error) {
    console.log("User creation failed", error);
    return res.status(400).json({ err: "Some error ocuured ! Try again" });
  }
};

module.exports = { userSignup };
