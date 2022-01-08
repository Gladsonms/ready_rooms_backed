const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const { schema } = mongoose;
const bycrpt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: "Name is required",
    },
    email: {
      type: String,
      trim: true,
      required: "Email is required",
      unique: true,
    },
    phone: {
      type: String,
      trim: true,
      required: "Phone is required",
      unique: true,
    },
    password: {
      type: String,
      required: "Password is needed",
      min: 6,
      max: 64,
    },

    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
  },
  { timestamp: true }
);
userSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    return bycrpt.hash(user.password, 12, function (err, hash) {
      if (err) {
        console.log("Bycrpt hash error", err);
        return next(err);
      }
      user.password = hash;
      return next();
    });
  } else {
    return next();
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
