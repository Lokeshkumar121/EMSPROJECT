import express from "express";
import { loginUser } from "../controllers/authController.js";


// POST /api/auth/login

const router = express.Router();

router.post("/login", loginUser);

export default router;
