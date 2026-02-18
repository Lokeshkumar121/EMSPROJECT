import express from "express";
import { getSalaryAnalytics , getEmployeeSalaryGraph} from "../controllers/analyticsController.js";

const router = express.Router();
router.get("/salary", getSalaryAnalytics);
router.get("/salary/:employeeId", getEmployeeSalaryGraph);

console.log("AnalyticsRoutes file loaded");

export default router;
