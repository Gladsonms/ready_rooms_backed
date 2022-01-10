import express from "express";
const router = express.Router();

//controllers

import { userSignup, userLogin } from "../controllers/auth.js";

router.post("/userregister", userSignup);
router.post("/userlogin", userLogin);

export default router;
