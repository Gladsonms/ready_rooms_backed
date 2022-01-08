const express = require("express");
const router = express.Router();

//controllers
const { userSignup } = require("../controllers/auth");

router.post("/userregister", userSignup);

module.exports = router;
