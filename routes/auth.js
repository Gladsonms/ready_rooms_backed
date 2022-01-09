import express from "express";
const router = express.Router();

//controllers

import { userSignup } from "../controllers/auth.js";

router.post("/userregister", userSignup);

export default router;
