import express from "express";
const router = express.Router();

//controllers

import {
  userSignup,
  userLogin,
  ownerSignup,
  ownerLogin,
} from "../controllers/auth.js";

router.post("/userregister", userSignup);
router.post("/userlogin", userLogin);
router.post("/ownersignup", ownerSignup);
router.post("/ownersignin", ownerLogin);

export default router;
