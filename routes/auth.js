const express = require("express");
const router = express.Router();

//controllers
const { showMessage } = require("../controllers/auth");
router.get("/:message", showMessage);

module.exports = router;
