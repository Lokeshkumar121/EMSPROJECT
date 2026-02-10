import express from "express";
import { getSalaryAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();
router.get("/salary", getSalaryAnalytics);

console.log("AnalyticsRoutes file loaded");

export default router;
