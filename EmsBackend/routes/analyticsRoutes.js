import express from "express";
import { getSalaryAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();
router.get("/salary", getSalaryAnalytics);
export default router;
